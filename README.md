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

The same lookup runs inside **Add customer**, so typing a name there fills in the contact,
email, phone, property and software for you.

## Working from Accounting's list (10+ at a time)

Accounting sends the list of locations that owe a coverage report. Paste it into
**📋 Paste the list from Accounting** — one location per line, or a column pasted straight
out of Excel (a header row like "Facility Name" is ignored). Every name is matched against
the directory and you get a summary: matched, needs-a-quick-check (with a dropdown to pick
the right one), and not-found. Then **Draft all** writes every email in one go, each
addressed to the facility manager and the billing contact.

To get them into Outlook, press **📥 Save all to Outlook** in the review list. That
downloads `outlook-drafts.zip` containing one `.eml` per location. Unzip it and either:

- **drag the files into your Outlook Drafts folder** — they appear as drafts, ready to send; or
- **double-click any file** — it opens as a composed message with a Send button.

The files carry the `X-Unsent` header, which is what makes Outlook treat them as unsent
drafts rather than received mail. Set **Your email address** in Settings → *How often to
chase* so the From line matches the account you send from. Individual drafts also have
their own **📥 Outlook draft** button.

This never sends anything — it hands Outlook a stack of prepared messages and you press
Send on each.

## Company directory (auto-fill contacts)

The client list ships with the app as **`directory.enc.json`**, encrypted with AES-256-GCM
(PBKDF2-SHA256, 310k iterations). On first visit the app asks for the passphrase once per
browser, decrypts locally and caches the result — after that, searching just works with no
upload step. The encrypted file is downloadable by anyone, but is unreadable without the
passphrase, so no contact data is exposed by publishing it.

**Updating it when you get new customers:**

1. Load the new or updated list in the app (Settings → Company directory → *Load / update
   master list…*). Updates are **additive** — new facilities are added, changed details are
   refreshed, and everything else is kept, so a file with only the new customers is enough.
2. Click **Publish encrypted copy…**, choose the passphrase, and save the file.
3. Upload the resulting `directory.enc.json` to the repository (drag it onto the file list
   on GitHub and commit).

Everyone else's browser notices the new version on their next visit and offers to update.
Choosing a new passphrase at step 2 rotates it for everyone.

Offline alternative: `node tools/encrypt-directory.js <directory.json> <passphrase>` does the
same thing from the command line, so the plaintext list never has to leave your machine.

You can also still load a plain `.xlsx`/`.csv` by hand at any time — useful for a one-off
or for working without the published file.

Two things worth knowing:

- **Decryption happens in the browser.** The list is decrypted locally and cached in local
  storage on that machine; the plaintext is never uploaded anywhere. Only the encrypted
  file is published.
- **Logins are ignored on purpose.** Any sheet containing username/password columns is
  skipped during import, so software credentials in the master workbook never enter the app.

`.gitignore` blocks plaintext client lists and `directory.json` from being committed, so
customer contact data cannot be published unencrypted by accident. Only the encrypted
`directory.enc.json` belongs in this repo. Treat the passphrase as a shared secret: the
encrypted file is public, so anyone who learns the passphrase can read that snapshot, and
rotating it does not un-publish copies already downloaded.

The Excel reader (SheetJS) is vendored in `vendor/` rather than loaded from a CDN, so
imports keep working offline and behind restrictive networks.
