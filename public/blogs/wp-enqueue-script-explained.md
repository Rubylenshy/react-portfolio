# wp_enqueue_script, Explained: Every Parameter, and Why Your Footer Script Breaks the Page

> `in_footer` answers "where". Only `$deps` answers "after what".

Most enqueue bugs come from one thing: telling WordPress *where* a script goes without telling it *what it depends on*. This post walks through every parameter of `wp_enqueue_script()`, then a real example of that mistake — an axios interceptor that silently breaks every request on a plugin page.

---

## Why enqueue at all

In WordPress you don't drop `<script>` tags into templates. You hand the script to WordPress with `wp_enqueue_script()`, and WordPress decides when, where and in what order to print it.

That sounds like bureaucracy until you remember that a single page might load scripts from core, your theme and ten plugins. Enqueueing gives WordPress a dependency graph. It prints each script once, prints dependencies before the scripts that need them, and lets other code dequeue or replace yours.

---

## The hooks: where you call it from

`wp_enqueue_script()` is a function, not a hook. You call it inside a hook, and the hook decides which screen it applies to.

| Hook | Fires on | Notes |
|---|---|---|
| `wp_enqueue_scripts` | Front end (public site) | Plural "scripts". The most common typo is writing `wp_enqueue_script` here, which never fires. |
| `admin_enqueue_scripts` | Every wp-admin screen | Passes `$hook_suffix`, so you can load only on your own page. |
| `login_enqueue_scripts` | `wp-login.php` | For login screen customisation. |
| `enqueue_block_editor_assets` | Block editor | For Gutenberg sidebars, blocks and panels. |

For a plugin settings page, scope by the hook suffix. `add_menu_page()` returns it, so store it and compare:

```php
add_action( 'admin_menu', function () {
    $GLOBALS['linksy_hook'] = add_menu_page(
        'Linksy', 'Linksy', 'manage_options', 'linksy', 'linksy_render_page'
    );
} );

add_action( 'admin_enqueue_scripts', function ( $hook_suffix ) {
    if ( $hook_suffix !== $GLOBALS['linksy_hook'] ) {
        return; // not our page: load nothing
    }
    // enqueue here
} );
```

Why it matters: loading your bundle on every admin screen slows the dashboard and can collide with other plugins that also ship axios, React or jQuery UI.

---

## Every parameter, one at a time

The signature has five parameters. Only the first is required.

```php
wp_enqueue_script(
    string $handle,
    string $src = '',
    string[] $deps = array(),
    string|bool|null $ver = false,
    array|bool $args = array()
);
```

### $handle

The script's unique name in WordPress's registry, for example `linksy-admin`. Everything else refers to the script by this name: dependencies, `wp_add_inline_script()`, `wp_localize_script()`, `wp_dequeue_script()`. Prefix it with your plugin slug. A generic handle like `axios` can clash with another plugin that registered its own `axios`, and WordPress keeps whichever registered first.

### $src

The URL of the file. In a plugin, build it with `plugins_url( 'build/admin.js', __FILE__ )` or `plugin_dir_url( __FILE__ ) . 'build/admin.js'`. Never hardcode a domain. An empty `$src` is allowed: it creates an "alias" handle that only bundles dependencies together.

### $deps

An array of handles that must load before this one, such as `array( 'wp-api-fetch', 'linksy-http' )`. **This is the most important parameter in this post.** WordPress uses it to order output, and it will even move a dependency from the footer into the head if a head script needs it. Leave it empty and WordPress assumes there is no relationship.

### $ver

The cache-busting version appended as `?ver=`. It has three modes:

- **`false` (default):** appends the current WordPress version. Your file stays cached across your own releases, which is why users see stale JS after updates.
- **A string** such as `'1.4.2'` or `filemtime( $path )`: appends that value. Use your plugin version in production, file modification time in development.
- **`null`:** appends nothing.

### $args

Controls placement and loading. Before WordPress 6.3 it was a boolean called `$in_footer`. Since 6.3 it is an array:

- **`'in_footer' => true`** prints the tag just before `</body>` (via `wp_footer` or `admin_footer`). `false`, the default, prints it in `<head>`.
- **`'strategy' => 'defer'` or `'async'`** adds that attribute. WordPress checks the dependency tree and drops the strategy if it would break ordering, for example an `async` script that something depends on.

Passing a plain `true` still works and means "in footer".

### Register vs enqueue

`wp_register_script()` takes the same parameters but only adds the script to the registry. `wp_enqueue_script()` registers if needed and marks it for output. Register shared libraries once on `init`, then enqueue them by handle wherever needed.

---

## The footer trap: when axios always errors

Here is the setup. You have a small file, `http.js`, that configures axios for the WordPress REST API: base URL, and an interceptor that attaches the `X-WP-Nonce` header to every request. You enqueue it in the footer because "footer is better for performance".

```php
// http.js: axios + interceptor, sent to the footer
wp_enqueue_script( 'linksy-http', $url . 'http.js', array( 'axios' ), '1.0', true );

// admin.js: the page app, in the head, no dependency declared
wp_enqueue_script( 'linksy-admin', $url . 'admin.js', array(), '1.0' );
```

```javascript
// admin.js runs as soon as it is parsed
axios.get( '/wp-json/linksy/v1/links' ).then( render );
```

The plugin page loads and every `axios.get`, `axios.post` and so on fails. Depending on what is in scope at that moment, you see one of these:

1. **`ReferenceError: axios is not defined`.** axios itself sits in the footer, and `admin.js` in the head runs before it exists.
2. **401 or 403 with `rest_cookie_invalid_nonce` or `rest_forbidden`.** axios is available (perhaps another plugin loaded it early), but your interceptor has not run yet. The request leaves without `X-WP-Nonce`, so WordPress treats it as logged out.
3. **Wrong base URL, 404s.** The instance config from `http.js` was never applied.

The browser executes scripts top to bottom. The head is parsed first, then the page body, then the footer. Anything that runs early cannot use something defined later, no matter how "global" it is.

### The variant that bites even with footer-only scripts

You move everything to the footer, but the page still breaks. Check your page callback. Admin page HTML from `add_menu_page()`'s callback prints inside the body, *before* `admin_footer`. An inline script there runs before every footer script:

```php
function linksy_render_page() {
    echo '<div id="linksy-root"></div>';
    echo '<script>axios.get("/wp-json/linksy/v1/links")</script>'; // runs too early
}
```

### Why it feels random

It often works on your machine. Another plugin may load axios in the head on your site, or caching may change load order. On a clean install, the hidden dependency is exposed. That is the signature of an undeclared dependency: it works by accident.

---

## The fix: declare the dependency

The one-line fix is to list the interceptor's handle in the app's `$deps`. WordPress then guarantees `linksy-http` prints before `linksy-admin`. If the app is in the head and the interceptor is marked for the footer, WordPress pulls the interceptor up into the head to keep the order.

```php
add_action( 'admin_enqueue_scripts', function ( $hook_suffix ) {
    if ( $hook_suffix !== $GLOBALS['linksy_hook'] ) {
        return;
    }
    $url = plugin_dir_url( __FILE__ ) . 'build/';

    wp_register_script( 'linksy-axios', $url . 'axios.min.js', array(), '1.7.7', array( 'in_footer' => true ) );

    wp_enqueue_script( 'linksy-http', $url . 'http.js',
        array( 'linksy-axios' ), LINKSY_VERSION, array( 'in_footer' => true ) );

    wp_enqueue_script( 'linksy-admin', $url . 'admin.js',
        array( 'linksy-http' ), LINKSY_VERSION, array( 'in_footer' => true ) );

    // Data the interceptor needs, printed right before http.js runs
    wp_add_inline_script( 'linksy-http', 'window.linksyConfig = ' . wp_json_encode( array(
        'root'  => esc_url_raw( rest_url( 'linksy/v1/' ) ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ) ) . ';', 'before' );
} );
```

Four habits make this robust:

- **Chain with `$deps`, not with placement.** `in_footer` answers "where". Only `$deps` answers "after what". Set both and keep the chain explicit: library, then config, then app.
- **Keep a chain in one place.** Put all three in the footer, or all in the head. Mixed placement works with `$deps` but is harder to reason about.
- **Pass server data with `wp_add_inline_script( $handle, $js, 'before' )`.** It is tied to the handle, so it moves wherever the script moves. `wp_localize_script()` also works but was designed for translation strings.
- **Wait for the DOM, not for a footer.** If code must touch markup, wrap it in `DOMContentLoaded`, or use `'strategy' => 'defer'`. Deferred scripts run in order after parsing, and WordPress downgrades the strategy if a dependency would break.

And move inline `<script>` tags out of the page callback. Render only the mount point there, and let the enqueued app pick it up:

```php
function linksy_render_page() {
    echo '<div id="linksy-root"></div>'; // markup only; admin.js does the rest
}
```

---

## Takeaway

Placement is a performance hint; dependencies are a contract. If one script needs another, say so in `$deps` and let WordPress work out the order — then scope everything to your own screen with `$hook_suffix`, version it properly, and keep inline logic out of your page callbacks. Do that and "works on my machine" stops being a load-order coincidence.

---

*Fighting a WordPress plugin that only breaks on clean installs? [Start a project](/start-a-project) and let's untangle it.*
