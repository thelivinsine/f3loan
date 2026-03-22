# 🇩🇪 × 🇮🇳 LoanSplit — DE × IN Repayment Tracker

A private, single-file loan repayment dashboard for tracking a joint €20,000 loan between Germany and India. No backend, no login, no server — everything runs in the browser and saves to `localStorage`.

---

## 🔗 Live Dashboard

Open `loan-dashboard.html` directly in any browser, or host it via GitHub Pages:

> **GitHub Pages URL:** `https://<your-username>.github.io/<repo-name>/loan-dashboard.html`

---

## 📋 What It Does

- Tracks **95 monthly EMI payments** from Feb 2026 → Dec 2033
- Friend's share: **€110.93/month** (41.25% of €268.91 total EMI)
- Converts all amounts to **INR using verified 10th-of-month exchange rates**
- Logs payment history with **timestamps and exchange rates per entry**
- Shows **cumulative outstanding balance** as an area chart
- Exports a clean **PDF snapshot** via browser print
- Fully **offline-capable** — no API calls, no external dependencies except Google Fonts

---

## ✨ Features

| Feature | Details |
|---|---|
| **KPI Dashboard** | Monthly EMI, Friend's Share, Total Received, Outstanding, Months Left |
| **Per-month cards** | Due (₹ + €), Paid, Net Remaining, Total Remaining |
| **Payment logging** | Log multiple partial payments per month with timestamps |
| **Payment history** | Full history timeline inside each month's drawer — delete individual entries |
| **Balance chart** | Canvas area chart showing cumulative ₹ balance over elapsed months |
| **Filter tabs** | All · Paid · Partial · Unpaid · Upcoming |
| **Sticky bar** | Fixed summary ribbon showing totals as you scroll |
| **Export PDF** | One-tap export via browser print dialog |
| **Mobile-first** | Responsive from 320px — stacked card layout on mobile |
| **Accessibility** | WCAG 2.1: focus rings, skip link, ARIA labels, reduced motion |

---

## 💱 Exchange Rates

Rates are hardcoded as **verified mid-market EUR→INR on the 10th of each month**. No live API fetching — values are stable and auditable.

| Month | Rate (₹/€) | Source |
|---|---|---|
| Feb 2026 | 107.9160 | poundsterlinglive.com |
| Mar 2026 | 106.8030 | Xe.com |
| Apr 2026 onwards | TBD | Add each month |

**To add a new month's rate:** Open `loan-dashboard.html`, find the `RATES` object in the `<script>` block, and add:
```js
"2026-4": { rate: 106.XXXX, src: "Xe.com" },
```

---

## 💾 Data Storage

All payment data is saved to **browser `localStorage`** under two keys:

| Key | Contents |
|---|---|
| `ls_pay5` | `{ "2026-2": true, ... }` — months marked fully paid |
| `ls_pmt5` | `{ "2026-2": { inr, eur, history: [{inr, eur, rate, ts}] } }` — payment entries |

> ⚠️ Data is stored per-browser. Clearing browser data will erase payment history. Back up by exporting to PDF regularly.

---

## 🚀 How to Use

### Option A — Open locally
1. Download `loan-dashboard.html`
2. Open it in Safari, Chrome, or Firefox
3. No installation needed

### Option B — GitHub Pages (recommended)
1. Fork or clone this repo
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Visit `https://<username>.github.io/<repo>/loan-dashboard.html`

---

## 📅 Monthly Maintenance

On or after the **10th of each month**:
1. Look up the EUR→INR mid-market rate on [Xe.com](https://xe.com) or [poundsterlinglive.com](https://poundsterlinglive.com)
2. Add it to the `RATES` object in the HTML file
3. Commit and push — the dashboard updates automatically

---

## 🛠 Tech Stack

- **Vanilla HTML/CSS/JS** — no frameworks, no build step
- **Canvas API** — balance chart
- **localStorage** — payment persistence
- **Google Fonts** — Plus Jakarta Sans + IBM Plex Sans
- **Calibri** — numeric display font (system font)

---

## 📁 Files

```
/
├── loan-dashboard.html    # The entire app — open this
├── README.md              # This file
├── .gitignore             # Ignores OS junk files
└── LICENSE                # MIT
```

---

## 📄 License

MIT — use freely, no warranty.
