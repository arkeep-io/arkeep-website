// Captures the GUI pieces the homepage shows, light and dark, at 3x.
// Each piece is an element screenshot taken at a viewport where it renders about as wide as the tile
// that shows it, so the site displays it near 1:1 instead of shrinking a whole window.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://127.0.0.1:18080';
const API = `${BASE}/api/v1`;
const OUT = new URL('../../src/assets/screens/', import.meta.url).pathname;
const ADMIN = { email: 'alex@example.com', password: 'demo-Password-2026!' };
await mkdir(OUT, { recursive: true });

// IDs come from the API so the capture does not depend on clicking GUI labels.
const token = (
  await (
    await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ADMIN) })
  ).json()
).data.access_token;
const get = async (path) => (await (await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } })).json()).data;
const policies = (await get('/policies')).items;
const policyId = (name) => policies.find((p) => p.name === name).id;
const snapshot =
  (await get('/snapshots?limit=50')).items.find((s) => s.policy_name === 'Postgres') ?? (await get('/snapshots?limit=1')).items[0];

const pieces = [
  {
    name: 'ui-policy-destinations',
    path: `/policies/${policyId('Web server')}`,
    width: 1240,
    target: (page) => page.locator('main div.border.rounded-md').filter({ has: page.getByRole('heading', { name: 'Destinations', exact: true }) }).first(),
  },
  {
    name: 'ui-snapshot-tree',
    path: `/snapshots/${snapshot.id}`,
    width: 980,
    expand: ['tmp', 'arkeep-demo', 'sources', 'db-01', 'var', 'backups', 'etc', 'postgresql'],
    target: (page) => page.locator('main .border.rounded-md').filter({ has: page.locator('.font-mono') }).first(),
  },
  {
    name: 'ui-2fa',
    path: '/profile',
    width: 1020,
    target: (page) => page.locator('main div.grid').filter({ hasText: 'Two-Factor Authentication' }).last(),
  },
];

async function login(page) {
  await page.goto(`${BASE}/login`);
  await page.locator('input[type="email"]').fill(ADMIN.email);
  await page.locator('input[type="password"]').fill(ADMIN.password);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL((u) => !u.pathname.startsWith('/login'));
}

// The GUI applies the stored theme only once the sidebar (NavUser) mounts, which phones never do;
// set the class directly so every capture matches the requested theme.
const applyTheme = (page, theme) => page.evaluate((dark) => document.documentElement.classList.toggle('dark', dark), theme === 'dark');

const setTheme = async (page, theme) => {
  await page.emulateMedia({ colorScheme: theme });
  await page.evaluate((t) => localStorage.setItem('arkeep:color-mode', t), theme);
};

// One signed-in page per device class: refresh tokens rotate, so parallel contexts sharing one
// session would revoke each other, and the server rate-limits logins.
const browser = await chromium.launch();
const desktop = await (await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 3 })).newPage();
await login(desktop);
for (const theme of ['light', 'dark']) {
  await setTheme(desktop, theme);
  for (const piece of pieces) {
    await desktop.setViewportSize({ width: piece.width, height: 900 });
    await desktop.goto(`${BASE}${piece.path}`);
    await desktop.waitForLoadState('networkidle');
    await applyTheme(desktop, theme);
    await desktop.waitForTimeout(800);
    // Open the snapshot tree down to real files: clicking a folder name toggles it. Each tree row has a
    // "Download <name> as ZIP" button, which scopes the click away from the agent picker.
    for (const dir of piece.expand ?? []) {
      const row = desktop.locator(`button[aria-label="Download ${dir} as ZIP"]`).first().locator('xpath=..');
      await row.getByText(dir, { exact: true }).first().click();
      await desktop.waitForTimeout(700);
    }
    if (piece.expand) await desktop.waitForTimeout(1500); // let the last folder finish loading
    await piece.target(desktop).screenshot({ path: `${OUT}${piece.name}-${theme}.png` });
  }
}

// The phone in the hero mockup: the dashboard at an iPhone viewport.
const phone = await (
  await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
).newPage();
await login(phone);
for (const theme of ['light', 'dark']) {
  await setTheme(phone, theme);
  await phone.goto(`${BASE}/dashboard`);
  await phone.waitForLoadState('networkidle');
  await applyTheme(phone, theme);
  await phone.waitForTimeout(800);
  await phone.screenshot({ path: `${OUT}mobile-dashboard-${theme}.png` });
}
await browser.close();
console.log('Captured.');
