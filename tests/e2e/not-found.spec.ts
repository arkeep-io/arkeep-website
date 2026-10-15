import { expect, test } from '@playwright/test';

test('a missing page outside the docs keeps the site nav', async ({ page }) => {
  const res = await page.goto('/no-such-page/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page isn’t in any snapshot');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('the restore log searches for the requested path and comes back empty', async ({ page }) => {
  await page.goto('/no-such-page/');
  const log = page.locator('[data-scan]');
  await expect(log.locator('.cmd')).toHaveText('restic find /no-such-page/');
  await expect(log.locator('.warn')).toHaveText('0 of 6 snapshots contain /no-such-page/');
  const first = await log.locator('.miss').first().textContent();
  await page.getByRole('button', { name: 'Search again' }).click();
  await expect(log.locator('.hint')).toBeVisible();
  expect(await log.locator('.miss').first().textContent()).not.toBe(first);
});

test('the way back leads home', async ({ page }) => {
  await page.goto('/no-such-page/');
  await page.getByRole('link', { name: 'Restore the homepage' }).click();
  await expect(page.locator('#hero-title')).toBeVisible();
});
