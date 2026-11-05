import { expect, test, type Page } from '@playwright/test';

// Compares the parsed host, not a prefix: "https://arkeep.io.example.com" is external.
const isExternal = (href: string) => /^https?:\/\//.test(href) && new URL(href).hostname !== 'arkeep.io';

async function anchors(page: Page) {
  return page.locator('a[href]').evaluateAll((els) =>
    els.map((a) => ({
      href: a.getAttribute('href') ?? '',
      target: a.getAttribute('target'),
      rel: a.getAttribute('rel') ?? '',
      icon: a.querySelector('[data-new-tab-icon]') !== null,
      text: a.textContent ?? '',
    })),
  );
}

test('home: external links and docs links open in a new tab; docs links show the icon', async ({ page }) => {
  await page.goto('/');
  const all = await anchors(page);
  const external = all.filter((a) => isExternal(a.href));
  const docs = all.filter((a) => a.href.startsWith('/docs'));
  expect(external.length).toBeGreaterThan(5);
  expect(docs.length).toBeGreaterThan(2);
  for (const a of [...external, ...docs]) {
    expect(a.target, a.href).toBe('_blank');
    expect(a.rel, a.href).toContain('noopener');
  }
  for (const a of docs) expect(a.icon, a.href).toBe(true);
  for (const a of docs) expect(a.text, a.href).toContain('(opens in a new tab)');
});

test('docs: external links open in a new tab, internal links stay', async ({ page }) => {
  await page.goto('/docs/guides/notifications/');
  const all = await anchors(page);
  const external = all.filter((a) => isExternal(a.href));
  expect(external.length).toBeGreaterThan(3); // content, header GitHub, sidebar GitHub, edit link
  for (const a of external) {
    expect(a.target, a.href).toBe('_blank');
    expect(a.rel, a.href).toContain('noopener');
  }
  for (const a of all.filter((x) => x.href.startsWith('/docs'))) expect(a.target, a.href).toBeNull();
});

test('install guide opens in a new tab', async ({ page, context }) => {
  await page.goto('/');
  await page.locator('#install').getByRole('radio', { name: 'Kubernetes cluster' }).click();
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#install').getByRole('link', { name: /Open the Kubernetes cluster guide/ }).click(),
  ]);
  await expect(popup).toHaveURL(/\/docs\/installation\/kubernetes\/$/);
});
