import fetch from 'node-fetch';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Init Firebase Admin using service account from GitHub secret
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = getDatabase();

async function run() {
  const now   = new Date();
  const year  = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1; // 1-indexed
  const key   = `${year}-${month}`;    // e.g. "2026-4" — matches existing mkey() format

  // Check if rate already exists for this month — don't overwrite
  const existing = await db.ref(`loandata/rates/${key}`).get();
  if (existing.exists()) {
    console.log(`Rate for ${key} already exists (${existing.val().rate}) — skipping.`);
    process.exit(0);
  }

  // Fetch from frankfurter.app — no API key needed, ECB data
  // Use the date of today (the 10th) to get the rate specifically for this date
  const dateStr = `${year}-${String(month).padStart(2,'0')}-10`;
  const url     = `https://api.frankfurter.app/${dateStr}?from=EUR&to=INR`;

  console.log(`Fetching: ${url}`);
  const res  = await fetch(url);

  if (!res.ok) {
    console.error(`API error: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const data = await res.json();
  const rate = data.rates?.INR;

  if (!rate || typeof rate !== 'number') {
    console.error('Invalid rate in API response:', data);
    process.exit(1);
  }

  // Write to Firebase at loandata/rates/YYYY-M
  await db.ref(`loandata/rates/${key}`).set({
    rate:   parseFloat(rate.toFixed(4)),
    src:    'frankfurter.app (ECB)',
    fetchedAt: new Date().toISOString(),
  });

  console.log(`✓ Rate for ${key} written to Firebase: ₹${rate.toFixed(4)}/€`);
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
