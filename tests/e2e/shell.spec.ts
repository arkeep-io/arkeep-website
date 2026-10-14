import { expect, test } from '@playwright/test';

test('nav links and footer are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Install Arkeep' })).toHaveAttribute('href', '/docs/installation/docker-compose/');
  await expect(page.getByRole('link', { name: 'Sponsor the work' })).toHaveAttribute('href', 'https://github.com/sponsors/arkeep-io');
  await expect(page.locator('footer .release a')).toBeVisible();
});

test('theme toggle switches and persists in starlight-theme', async ({ page, isMobile }) => {
  test.skip(isMobile, 'same logic on phone');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => localStorage.getItem('starlight-theme'))).toBe('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
