# 🇩🇪 × 🇮🇳 LoanSplit — DE × IN Repayment Tracker

A private, real-time loan repayment dashboard for tracking a joint €20,000 loan between Germany and India. Single HTML file, no backend, no login — payment data syncs live between both users via Firebase Realtime Database.

---

## 🔗 Live Dashboard

> **`https://thelivinsine.github.io/r5loan/`**

Open directly in any browser. No installation needed.

---

## 📋 What It Does

- Tracks **95 monthly EMI payments** from Feb 2026 → Dec 2033
- Friend's share: **€110.93/month** (41.25% of €268.91 total EMI)
- Displays all amounts in **₹ primary, € secondary** — INR is the headline figure
- Converts using **verified mid-market EUR→INR rates on the 10th of each month** — no live API
- Logs multiple partial payments per month with timestamps and exchange rates
- **Real-time sync** — when your friend logs a payment in India, your dashboard updates live
- Exports a clean **PDF snapshot** via the browser print dialog

---

## ✨ Features

| Feature | Details |
|---|---|
| **KPI Dashboard** | Bento-grid layout — Outstanding and Total Received are larger cards for quick scanning |
| **Per-month cards** | Due (₹ + €), Paid, Net Remaining, Total Remaining — with per-card payment progress bar |
| **Payment logging** | Log multiple partial payments per month; each entry stores ₹ amount, € equivalent, rate used, and timestamp |
| **Payment history** | Scrollable timeline inside each month's drawer — delete individual entries |
| **Filter tabs** | All · Paid · Partial · Unpaid · Upcoming |
| **Year separators** | Month list grouped by year with chip dividers |
| **Sticky summary bar** | Fixed bottom ribbon showing Total Due · Received · Outstanding · Months Left as you scroll |
| **Export PDF** | One-tap export via browser print — masthead, rate panel, all cards, print-optimised layout |
| **Dark mode** | Moon/sun toggle in masthead — remembers preference, respects OS theme automatically |
| **Real-time sync** | Firebase Realtime Database — both users see live updates without refreshing |
| **Sync indicator** | Animated dot shows Firebase connection status (connecting / synced / error) |
| **Mobile-first** | Individual rounded cards on mobile (≤860px), grouped table layout on desktop |
| **Accessibility** | WCAG 2.1: skip link, ARIA labels, focus rings, role="list/listitem", reduced motion support |

---

## 💱 Exchange Rates

Rates are **hardcoded** — verified mid-market EUR→INR on the **10th of each month** from Xe.com or poundsterlinglive.com. No live fetching — values are stable and fully auditable.

| Month | Rate (₹/€) | Source |
|---|---|---|
| Feb 2026 | 107.9160 | poundsterlinglive.com |
| Mar 2026 | 106.8030 | Xe.com |
| Apr 2026 onwards | TBD | Add each month |

### Adding a new month's rate

1. On or after the **10th of the month**, look up the EUR→INR mid-market rate on [Xe.com](https://xe.com)
2. Open `index.html`, find the `RATES` object in the `<script>` block
3. Replace `null` with the rate:
```js
"2026-4": { rate: 107.1234, src: "Xe.com" },
```
4. Commit and push — the dashboard updates automatically for both users

---

## 🔥 Firebase Setup

Payment data is stored in **Firebase Realtime Database** and syncs live between both devices.

### Database Rules
The `firebase-rules.json` file contains the database rules. Apply them in the [Firebase Console](https://console.firebase.google.com) → Realtime Database → Rules:
```json
{
  "rules": {
    "loandata": {
      ".read": true,
      ".write": true
    }
  }
}
```

### Data Schema
```
loandata/
  payStatus/
    "2026-2": true               ← month marked fully paid
  payments/
    "2026-2"/
      inr: 11971                 ← running total INR paid
      eur: 110.93                ← running total EUR paid
      history: [
        { inr, eur, rate, ts }   ← individual payment entries with timestamp
      ]
```

---

## 📅 Monthly Workflow

Each month, on or after the **10th**:

1. **Look up the rate** — go to [Xe.com](https://xe.com), note the EUR→INR mid-market rate
2. **Add it to the file** — update `RATES["YYYY-M"]` in `index.html`
3. **Commit and push** — GitHub Pages auto-deploys in ~30 seconds
4. **Friend logs the payment** — they open the URL, tap "log ₹ payment" on the current month, enter amount, tap Save
5. **You see it instantly** — the sync dot flashes green "Updated ✓"

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **App** | Vanilla HTML + CSS + JavaScript — no framework, no build step |
| **Fonts** | Sora (numbers) · Plus Jakarta Sans (headings/UI) · IBM Plex Sans (body) via Google Fonts |
| **Database** | Firebase Realtime Database v9 (compat SDK) |
| **Hosting** | GitHub Pages |
| **PDF export** | Browser native print API with dedicated print stylesheet |

---

## 📁 Repository Structure

```
/
├── index.html              # The entire app — all HTML, CSS, and JS in one file
├── firebase-rules.json     # Firebase Realtime Database security rules
├── README.md               # This file
├── .gitignore              # Ignores OS junk files
└── LICENSE                 # MIT
```

---

## ⚠️ Security Note

The Firebase database rules currently allow **any browser to read and write** `loandata`. This is fine as long as the GitHub Pages URL remains private. If the URL is ever publicly shared, anyone who has it could overwrite payment data.

The `apiKey` in the Firebase config is **safe to keep public** — it's a project identifier, not a secret key. Security is enforced entirely by the database rules.

---

## 📄 License

MIT — use freely, no warranty.
