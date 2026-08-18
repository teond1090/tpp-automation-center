# Coverage Report Chaser — Tenant Property Protection

**Live app: <https://teond1090.github.io/tpp-automation-center/>**

A simple tool for chasing the handful of customers who are late with their monthly
coverage report. Track them, let the app write the request emails, and approve each one
before it goes anywhere.

**Nothing is ever sent automatically.** Every email waits for an explicit approval, and
approving opens the message in your own email program so you press Send yourself.

## How it works

1. **Add your customers** — type in the few who are usually late, or import a CSV/Excel
   list you already have (drag and drop; your column names just need a name and an email).
2. **Press "Check who's late"** — the app finds anyone past the threshold (35 days by
   default) and writes a personalized request email for each.
3. **Review and approve** — read each draft, edit the wording if you like, then approve.
   Approving opens it in your email program; mark it sent when you've sent it.
4. **Mark "Got their report"** when it arrives, and that customer goes quiet until next
   month.

Follow-ups use different wording than the first request, and the app waits a configurable
number of days (7 by default) before drafting another one for the same customer.

## Other things it does

- Editable email wording with `{{Name}}`, `{{Property}}` and `{{Amount}}` placeholders
- Adjustable "late after N days" and "wait N days between follow-ups" settings
- Step-by-step guides for having SiteLink, storEDGE, Cubby, Easy Storage Solutions,
  Storage Commander or any other software email reports automatically each month — the
  permanent fix for a chronic late reporter
- Backup / restore, so you can move your list to another computer

## Your data

Everything is stored in your own browser (localStorage) — nothing is uploaded anywhere,
and each person who opens the link has their own separate list. Use **Download backup**
in Settings to save or transfer it.

## Advanced version

The full automation platform — collections and past-due workflows, aging reports, AI reply
classification, dispute tickets, compliance scores, role-based permissions and an audit log
— is still here at [`advanced.html`](advanced.html), linked from the bottom of the simple
app. [`ARCHITECTURE.md`](ARCHITECTURE.md) documents the event-driven production design that
version mirrors.
