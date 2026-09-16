/* ── Daily remark ──────────────────────────────────────────────────
   A one-line banner that reads the board and says something relevant:
   a "beginning of day" nudge based on what's queued/in progress before
   5pm, and an "end of day" wrap-up based on what actually got done
   after 5pm. */

const END_OF_DAY_HOUR = 17

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

export const getDailyRemark = (cards, now = new Date()) => {
  const todayISO = now.toISOString().slice(0, 10)
  const counts = { backlog: 0, queue: 0, inprogress: 0, done: 0 }
  let doneToday = 0

  cards.forEach((card) => {
    if (counts[card.status] !== undefined) counts[card.status] += 1
    if (card.status === 'done' && card.doneAt?.slice(0, 10) === todayISO) doneToday += 1
  })

  const isEndOfDay = now.getHours() >= END_OF_DAY_HOUR

  if (!isEndOfDay) {
    if (counts.inprogress > 0) {
      return {
        period: 'start',
        label: 'Already moving',
        message: `${plural(counts.inprogress, 'item')} in progress — keep the momentum going.`,
      }
    }
    if (counts.queue > 0) {
      return {
        period: 'start',
        label: 'Ready to start',
        message: `${plural(counts.queue, 'item')} queued and ready. Pick one and get moving.`,
      }
    }
    if (counts.backlog > 0) {
      return {
        period: 'start',
        label: 'Backlog waiting',
        message: `${plural(counts.backlog, 'idea')} sitting in the backlog. Promote one into today's queue.`,
      }
    }
    return {
      period: 'start',
      label: 'Clean board',
      message: 'Nothing on the board yet. Add what matters today.',
    }
  }

  if (doneToday >= 3) {
    return {
      period: 'end',
      label: 'Strong close',
      message: `${plural(doneToday, 'item')} shipped today. Good work — call it there.`,
    }
  }
  if (doneToday > 0) {
    return {
      period: 'end',
      label: 'Progress made',
      message: `${plural(doneToday, 'item')} done today. Every bit counts.`,
    }
  }
  if (counts.inprogress > 0) {
    return {
      period: 'end',
      label: 'Still open',
      message: `Nothing closed yet, but ${plural(counts.inprogress, 'item')} still in motion. Wrap one up before logging off.`,
    }
  }
  return {
    period: 'end',
    label: 'Quiet day',
    message: 'Nothing moved on the board today. Tomorrow is a clean slate.',
  }
}
