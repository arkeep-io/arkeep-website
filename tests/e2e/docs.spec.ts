import { expect, test } from '@playwright/test';

const routes = [
  '/docs/',
  '/docs/installation/docker-compose/',
  '/docs/installation/binary/',
  '/docs/installation/kubernetes/',
  '/docs/installation/agent-systemd/',
  '/docs/concepts/architecture/',
];

for (const route of routes) {
  test(`docs page ${route} renders with site header`, async ({ page, isMobile }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('header a[href="/"]').first()).toBeVisible();
    // The header's right group is hidden below 50rem; phones reach installation through the sidebar.
    if (!isMobile) await expect(page.getByRole('link', { name: 'Install Arkeep' })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

test('retention anchor exists', async ({ page }) => {
  await page.goto('/docs/concepts/architecture/');
  await expect(page.locator('#retention')).toHaveCount(1);
});

test('theme carries across halves', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop covers it');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.goto('/docs/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('starlight-theme-select select').first().selectOption('light');
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
