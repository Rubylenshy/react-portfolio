# wp_ajax vs wp_ajax_nopriv: Who Gets In, and What Can Go Wrong

> The hook prefix decides who can reach your code. Only your own checks decide who can use it.

Every classic WordPress AJAX handler is registered under one of two prefixes, and most plugin vulnerabilities in this area come from misreading what those prefixes actually mean. This post walks through how `admin-ajax.php` picks your handler, how the two hooks relate, and the security model each one demands.

---

## How admin-ajax.php picks your handler

Every classic WordPress AJAX request goes to one URL, `/wp-admin/admin-ajax.php`, and carries an `action` parameter. WordPress turns that action into a hook name and fires it. Your callback is whatever you attached to that hook.

The flow for a request with `action=linksy_save`:

1. The browser sends a POST (or GET) to `admin-ajax.php` with `action=linksy_save`.
2. WordPress loads, then checks whether the visitor has a valid login cookie.
3. Logged in: it fires `wp_ajax_linksy_save`. Logged out: it fires `wp_ajax_nopriv_linksy_save`. Exactly one of the two, never both.
4. If nothing is hooked to the fired name, it stops with a response of `0` and HTTP 400.

Step 3 is the whole story of this post. **The prefix is not a permission level.** It is a branch on a single question: does this request have a session?

One trap before we start: `is_admin()` returns `true` inside every admin-ajax request, even for anonymous visitors, because the file lives in `wp-admin`. It tells you nothing about the user.

---

## The two hooks side by side

```php
add_action( 'wp_ajax_linksy_save', 'linksy_save' );        // logged-in visitors
add_action( 'wp_ajax_nopriv_linksy_save', 'linksy_save' ); // logged-out visitors
```

The part after the prefix must match the `action` value the browser sends, character for character.

| | `wp_ajax_{action}` | `wp_ajax_nopriv_{action}` |
|---|---|---|
| **Fires for** | Any logged-in user, any role | Visitors with no valid session |
| **Includes subscribers and customers** | Yes | No |
| **Typical use** | Dashboard tools, saving settings, editor actions | Contact forms, public search, "load more" posts |
| **`get_current_user_id()`** | The user's id | `0` |
| **Who can reach it** | Anyone who can register or log in | Anyone on the internet, including bots |

The row to remember is the first one. `wp_ajax_` means "logged in", not "admin". On a site with open registration or WooCommerce, that includes every customer account.

---

## Does one breathe without the other?

Yes. The two hooks are fully independent. Neither falls back to the other, and registering one never registers the other.

| You registered | Logged-in visitor gets | Logged-out visitor gets |
|---|---|---|
| `wp_ajax_` only | Your handler | `0`, HTTP 400 |
| `wp_ajax_nopriv_` only | `0`, HTTP 400 | Your handler |
| Both, same callback | Your handler | Your handler |
| Both, different callbacks | Logged-in callback | Logged-out callback |

The second row is the classic bug. You build a public newsletter form, register only `nopriv`, then test it while logged in as admin. It returns `0`. Your site visitors would have been fine; you weren't, because a logged-in request never fires a `nopriv` hook.

So the rule is:

- **Admin-only or member-only feature:** register `wp_ajax_` only. Leaving `nopriv` off is your first line of defence, not an oversight.
- **Public feature:** register both, pointing at the same callback, so it works whether or not the visitor is logged in.
- **Different behaviour by login state:** register both with separate callbacks, for example saving a draft to user meta versus to a cookie.

---

## Security of wp_ajax_: logged in is not authorised

The biggest risk with `wp_ajax_` is false confidence. Because the hook needs a login, developers assume only admins can reach it. Any subscriber can, by opening the browser console and posting to `admin-ajax.php` with your action name. Action names are easy to find: they sit in your enqueued JS.

This pattern has caused a long line of real plugin vulnerabilities, where a subscriber could change site options, create admin users or delete content:

```php
// Vulnerable: any logged-in user can rewrite any option
add_action( 'wp_ajax_linksy_update_option', function () {
    update_option( $_POST['key'], $_POST['value'] );
    wp_send_json_success();
} );
```

A `wp_ajax_` handler needs two separate checks:

- **Capability check:** `current_user_can( 'manage_options' )`. This answers "is this user allowed to do this?" It is the authorisation step. Pick the capability that matches the action: `manage_options` for settings, `edit_post` with a post id for editing a specific post.
- **Nonce check:** `check_ajax_referer( 'linksy_save', 'nonce' )`. This answers "did this request come from our own page, on purpose?" It blocks CSRF, where an attacker's site tricks a logged-in admin's browser into sending the request.

They are not interchangeable. A nonce does not prove permission: a subscriber who can load a page carrying the nonce can use it. A capability check does not stop CSRF: the forged request arrives with the admin's real cookies. **You need both.**

---

## Security of nopriv: assume the whole internet is calling

A `nopriv` handler has no user to check. There is no capability to test, because `current_user_can()` is always `false` for user 0. So the security model flips: instead of asking "who is this?", you limit what the handler can possibly do.

Three facts shape that:

- **Logged-out nonces are weak.** Every anonymous visitor gets the same nonce for a given action, and it is printed in the public page. A bot can fetch the page and read it. It still helps against CSRF and casual abuse, but it is not a lock.
- **Page caching can break them.** A cached page may serve a nonce that has expired (they last 12–24 hours), so legitimate requests start failing. Refresh the nonce via a small uncached request, or rely on other protections.
- **Bots will find it.** Public endpoints get scanned and hammered. A handler that sends email or writes to the database is a spam and denial-of-service target.

### What a nopriv handler must never do

Change settings, read or return private data (emails, orders, other users' meta), trust ids from the request to touch someone's content, or run unprepared SQL.

### What it should do

Validate and sanitise every field (`sanitize_text_field()`, `absint()`, `is_email()`), use `$wpdb->prepare()`, escape output, return only public data, and rate-limit anything expensive, for example with a transient keyed by IP.

---

## A secure handler, and a review checklist

An admin-only handler, with every check in order:

```php
add_action( 'wp_ajax_linksy_save', 'linksy_save' ); // no nopriv: admins only

function linksy_save() {
    check_ajax_referer( 'linksy_save', 'nonce' );           // 1. intent (CSRF)

    if ( ! current_user_can( 'manage_options' ) ) {         // 2. permission
        wp_send_json_error( array( 'message' => 'Forbidden' ), 403 );
    }

    $limit = isset( $_POST['limit'] ) ? absint( $_POST['limit'] ) : 0; // 3. input
    update_option( 'linksy_link_limit', $limit );           // 4. fixed option name

    wp_send_json_success( array( 'limit' => $limit ) );     // 5. JSON + exit
}
```

Pass the nonce to the page with `wp_create_nonce( 'linksy_save' )`, attached to your script via `wp_add_inline_script()` or `wp_localize_script()`. The action string in `wp_create_nonce()` and `check_ajax_referer()` must match.

Before you ship any AJAX handler, check:

- [ ] Is `nopriv` registered only where anonymous visitors truly need it?
- [ ] Does every `wp_ajax_` handler call `current_user_can()` with the right capability?
- [ ] Does every handler verify a nonce with `check_ajax_referer()`?
- [ ] Is every input sanitised, and every query prepared?
- [ ] Are option names, table names and file paths fixed in code, never taken from the request?
- [ ] Does the handler end with `wp_send_json_*()` or `wp_die()`, so a stray `0` is never appended?

---

## Takeaway

`wp_ajax_` means "has a session", not "is an admin", and `nopriv` means "the whole internet". The hook prefix decides who can reach your code. Only your own checks — capability, nonce, sanitisation — decide who can use it. For new endpoints, the REST API makes this explicit with a required `permission_callback`, which is worth a post of its own.

---

*Shipping a WordPress plugin and want a second pair of eyes on its AJAX handlers? [Start a project](/start-a-project) and let's talk.*
