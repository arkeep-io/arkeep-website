// Captures light and dark screenshots of the seeded demo at 2x, plus one short job-log loop.
// Pass --video-only to re-record just the loop.
import { chromium } from '@playwright/test';
import { mkdir, rename } from 'node:fs/promises';

const BASE = 'http://127.0.0.1:18080';
const API = `${BASE}/api/v1`;
const OUT = new URL('../../src/assets/screens/', import.meta.url).pathname;
const MEDIA = new URL('../../public/media/', import.meta.url).pathname;
const ADMIN = { email: 'alex@example.com', password: 'demo-Password-2026!' };
await mkdir(OUT, { recursive: true });
await mkdir(MEDIA, { recursive: true });

// IDs come from the API so the capture does not depend on clicking GUI labels.
const token = (
  await (
    await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ADMIN) })
  ).json()
).data.access_token;
const get = async (path) => (await (await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } })).json()).data;
const policies = (await get('/policies')).items;
const policyId = (name) => policies.find((p) => p.name === name).id;
const job = (await get('/jobs?limit=20')).items.find((j) => j.status === 'succeeded' && j.type === 'backup');
const snapshot =
  (await get('/snapshots?limit=50')).items.find((s) => s.policy_name === 'Postgres') ?? (await get('/snapshots?limit=1')).items[0];

const shots = [
  { name: 'dashboard', path: '/dashboard' },
  { name: 'agents', path: '/agents' },
  { name: 'policy', path: `/policies/${policyId('Web server')}` },
  { name: 'job-log', path: `/jobs/${job.id}` },
  {
    name: 'snapshot-browse',
    path: `/snapshots/${snapshot.id}`,
    expand: ['tmp', 'arkeep-demo', 'sources', 'db-01', 'var', 'backups', 'etc', 'postgresql'],
  },
  { name: 'notifications', path: '/settings/notifications' },
  { name: 'security', path: '/profile' },
];

async function login(page) {
  await page.goto(`${BASE}/login`);
  await page.locator('input[type="email"]').fill(ADMIN.email);
  await page.locator('input[type="password"]').fill(ADMIN.password);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL((u) => !u.pathname.startsWith('/login'));
}

const browser = await chromium.launch();
const videoOnly = process.argv.includes('--video-only');
for (const theme of videoOnly ? [] : ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
  await context.addInitScript((t) => localStorage.setItem('arkeep:color-mode', t), theme);
  const page = await context.newPage();
  await login(page);
  for (const s of shots) {
    await page.goto(`${BASE}${s.path}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800); // charts and lazy lists settle
    // Open the snapshot tree down to real files: clicking a folder name toggles it. Each tree row has a
    // "Download <name> as ZIP" button, which scopes the click away from the agent picker.
    for (const dir of s.expand ?? []) {
      const row = page.locator(`button[aria-label="Download ${dir} as ZIP"]`).first().locator('xpath=..');
      await row.getByText(dir, { exact: true }).first().click();
      await page.waitForTimeout(700);
    }
    if (s.expand) await page.waitForTimeout(1500); // let the last folder finish loading
    await page.screenshot({ path: `${OUT}${s.name}-${theme}.png` });
  }
  await context.close();
}

// The phone in the hero mockup: the dashboard at an iPhone viewport, 3x for a sharp crop.
for (const theme of videoOnly ? [] : ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, colorScheme: theme,
  });
  await context.addInitScript((t) => localStorage.setItem('arkeep:color-mode', t), theme);
  const page = await context.newPage();
  await login(page);
  await page.goto(`${BASE}/dashboard`);
  await page.waitForLoadState('networkidle');
  // On phones the GUI only applies the stored theme once the sidebar (NavUser) mounts; apply it here.
  await page.evaluate((dark) => document.documentElement.classList.toggle('dark', dark), theme === 'dark');
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}mobile-dashboard-${theme}.png` });
  await context.close();
}

// One honest moving picture: the live log of a running job. Sign in on a separate context so the
// recording starts on the job page instead of the login screen.
const auth = await browser.newContext({ viewport: { width: 1200, height: 750 } });
await login(await auth.newPage());
const storageState = await auth.storageState();
await auth.close();
const rec = await browser.newContext({
  viewport: { width: 1200, height: 750 },
  colorScheme: 'dark',
  storageState,
  recordVideo: { dir: MEDIA, size: { width: 1200, height: 750 } },
});
await rec.addInitScript(() => localStorage.setItem('arkeep:color-mode', 'dark'));
const p = await rec.newPage();
await fetch(`${API}/policies/${policyId('Postgres')}/trigger`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: '{}',
});
await new Promise((r) => setTimeout(r, 1200));
const running = (await get('/jobs?limit=5')).items[0];
await p.goto(`${BASE}/jobs/${running.id}`);
await p.waitForTimeout(9000);
await p.screenshot({ path: `${OUT}job-log-poster.png` });
const video = p.video();
await rec.close();
await rename(await video.path(), `${MEDIA}job-log-loop.webm`);
await browser.close();
console.log('Captured.');
