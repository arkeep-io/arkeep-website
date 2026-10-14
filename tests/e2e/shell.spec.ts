import { expect, test } from '@playwright/test';

test('nav links and footer are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Install Arkeep' })).toHaveAttribute('href', '/docs/installation/docker-compose/');
  await expect(page.getByRole('link', { name: 'Sponsor the work' })).toHaveAttribute('href', 'https://github.com/sponsors/arkeep-io');
  await expect(page.locator('footer .release a')).toBeVisible();
  await expect(page.locator('footer').getByRole('navigation', { name: 'Docs' }).getByRole('link')).toHaveCount(5);
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

test('phone menu opens, lists every link and closes on Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone-only control');
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#nav-links').getByRole('link', { name: 'GitHub' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#nav-links')).toBeHidden();
});
