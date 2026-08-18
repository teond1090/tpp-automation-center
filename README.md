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

## Search → draft → review

The whole workflow is four steps on one screen:

1. **Search** a facility name or corporate account name.
2. The **Facility Manager and Invoice/Billing Contact** are pulled from the master list and
   shown side by side — name, email and phone each — with location, storage software,
   account status and reporting method.
3. Press **✉ Draft coverage report request** and the email is generated addressed to both
   contacts (or pick billing-only / manager-only).
4. The draft opens in the **review queue**. Read it, edit the wording if you like, then
   approve — approving opens it in your own email program so you press Send yourself.

Nothing is ever sent without approval. Facilities that already report by API or automated
email are flagged, since they normally need no chasing at all. You can also just copy an
address, or add a contact to the chase list for the recurring late-report sequence.
Facilities that already report by API or automated email are flagged as such, since they
normally need no chasing at all.

The same lookup runs inside **Add customer**, so typing a name there fills in the contact,
email, phone, property and software for you.

## Company directory (auto-fill contacts)

Under **Settings → Company directory**, load the master client list (`.xlsx`, `.csv`, or a
`directory.json`) once — that is what powers the lookup above.

Two things worth knowing:

- **The directory never leaves the browser.** It is stored in local storage on the machine
  that loaded it — it is not uploaded, and it is deliberately **not** part of this public
  site. Each person loads their own copy; re-load the file whenever the master list changes.
- **Logins are ignored on purpose.** Any sheet containing username/password columns is
  skipped during import, so software credentials in the master workbook never enter the app.

`.gitignore` blocks client lists and `directory.json` from being committed, so customer
contact data cannot be published by accident. If you ever want the directory to load
automatically with no manual step, that requires hosting the site privately — ask before
placing a `directory.json` next to `index.html`, because anything in this repo is public.

The Excel reader (SheetJS) is vendored in `vendor/` rather than loaded from a CDN, so
imports keep working offline and behind restrictive networks.
