/**
 * Screenshot walkthrough for the saved-but-unpublished demo.
 *
 * Usage:
 *   1. Complete the claim flow for BIZ in the browser so draft_data is populated.
 *      Then run:  node walkthrough.mjs state-a
 *      This captures the public listing showing ORIGINAL data (draft saved, pending approval).
 *
 *   2. Approve the claim in /admin. Then run:  node walkthrough.mjs state-b
 *      This captures the public listing showing MERGED draft data (live after approval).
 *
 *   Run without args to capture all other screens (landing, claim flow):
 *      node walkthrough.mjs
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'https://lemon-business-mvp.vercel.app';
const OUT = './docs/screenshots';
mkdirSync(OUT, { recursive: true });

// Business used for the draft/published demo
const BIZ = 'ce24e41c-1518-47c1-acb9-0228bbc1a8f3'; // Versailles Restaurant

const state = process.argv[2]; // 'state-a' | 'state-b' | undefined

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

const page = await ctx.newPage();

async function shot(name, url, scrollY = 0) {
  console.log(`→ ${name}`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1500);
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false, timeout: 30000 });
  console.log(`  ✓ saved ${OUT}/${name}.png`);
}

if (state === 'state-a') {
  // Draft saved, claim pending — public listing still shows original data
  await shot('draft-state-a-public-listing', `${BASE}/business/${BIZ}`, 0);
  await shot('draft-state-a-edit-screen',   `${BASE}/claim/${BIZ}/edit`, 0);
  console.log('\nState A captured. Now approve the claim in /admin, then run: node walkthrough.mjs state-b');

} else if (state === 'state-b') {
  // Claim approved — draft_data merged into live columns
  await shot('draft-state-b-public-listing', `${BASE}/business/${BIZ}`, 0);
  await shot('draft-state-b-dashboard',      `${BASE}/dashboard`, 0);
  console.log('\nState B captured. Add both sets of screenshots to README.');

} else {
  // General walkthrough — landing page + claim flow screens
  await shot('01-hero',           BASE,                        0);
  await shot('02-value-props',    BASE,                     1400);
  await shot('03-how-it-works',   BASE,                     3200);
  await shot('04-dark-section',   BASE,                     4500);
  await shot('05-faq',            BASE,                     6000);
  await shot('06-claim-preview',  `${BASE}/claim/${BIZ}`,      0);
  await shot('07-edit-profile',   `${BASE}/claim/${BIZ}/edit`, 0);
  await shot('08-verify',         `${BASE}/claim/${BIZ}/verify`, 0);
  await shot('09-value-screen',   `${BASE}/claim/${BIZ}/value`, 0);
  await shot('10-checkout',       `${BASE}/claim/${BIZ}/checkout`, 0);
  console.log('\nAll screens captured.');
}

await browser.close();
console.log(`Done → ${OUT}/`);
