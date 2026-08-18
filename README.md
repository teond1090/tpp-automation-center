# TPP Automation Center — Coverage Reports & Collections

**Live app: <https://teond1090.github.io/tpp-automation-center/>**

Automated system for Tenant Property Protection that manages two workflows end to end:

1. **Missing Coverage Report Collection** — identify customers who haven't submitted their
   monthly coverage report, contact them automatically, guide them to submission options
   (email to reports@tenantpropertyprotection.com or automated delivery from their property
   management software), and follow up until the report is received.
2. **Past Due Account Collections** — identify customers with outstanding balances, send
   reminders, notices and escalations automatically, and track responses and payment status.

## Running it

Use the live link above (deployed automatically from `main` by GitHub Actions), or open
`index.html` directly in a browser — it is fully self-contained. All data stays in the
browser (localStorage); nothing is sent anywhere.

Quick tour:

1. **Accounts** tab → *Load sample data* (or upload/paste your own CSV/Excel list).
2. Press **⚙ Run automation** — flagged accounts get personalized outreach drafted.
3. **Outbox** → send the drafts; use **+1 day** to watch the Day 3 / 7 / 14 / 21
   follow-up sequence and Day-21 escalations play out.
4. **Inbox** → simulate customer replies; the AI classifier updates statuses, creates
   dispute tickets and internal tasks automatically.
5. **Dashboard**, **AI Insights** and **Audit Log** show metrics, recommendations,
   compliance scores and the full activity trail.

## Features

- CSV / Excel / pasted-list import with tolerant column matching
- Automatic classification: Missing Coverage Report, Past Due, Priority Follow-Up Queue
- Personalized outreach emails from editable templates
- Day 3 / 7 / 14 / 21 automated follow-up sequence with internal escalation tasks
- AI reply classification (report submitted, payment sent, dispute, wrong contact,
  out-of-office, assistance, general) driving automatic status transitions
- Simulated monitoring of reports@ / collections@ mailboxes with attachment matching
- SiteLink / storEDGE / Cubby / generic PMS onboarding guides with one-click guide emails
- Dashboard: coverage, collections aging, outreach and automation metric groups
- AI recommendations and a 0–100 Customer Compliance Score
- Role-based permissions (Admin / Customer Success / Accounting / Operations / Viewer)
- Configurable rules, cadence and templates; audit log with CSV export; workspace
  export/import

## Production build

The page doubles as a working spec. [`ARCHITECTURE.md`](ARCHITECTURE.md) documents the
event-driven production architecture it mirrors: ingestion API with inbound-email
webhooks, event bus, durable follow-up sequencer, AI reply/insight services, task
service, analytics and append-only audit logging.
