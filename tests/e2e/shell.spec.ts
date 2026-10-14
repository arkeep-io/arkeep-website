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

test('release and stars refresh from the GitHub API on load', async ({ page }) => {
  await page.route('https://api.github.com/repos/arkeep-io/arkeep', (r) => r.fulfill({ json: { stargazers_count: 4321 } }));
  await page.route('https://api.github.com/repos/arkeep-io/arkeep/releases/latest', (r) =>
    r.fulfill({ json: { tag_name: 'v9.9.9', published_at: '2027-01-02T10:00:00Z', html_url: 'https://github.com/arkeep-io/arkeep/releases/tag/v9.9.9' } }),
  );
  await page.goto('/');
  await expect(page.locator('footer [data-gh-stars]')).toHaveText('4.3k');
  await expect(page.locator('footer [data-gh-release-tag]')).toHaveText('v9.9.9');
  await expect(page.locator('footer [data-gh-release-date]')).toHaveText('Jan 2, 2027');
  await expect(page.locator('.hero [data-gh-release-tag]')).toHaveText('v9.9.9');
});

test('a failing GitHub API keeps the built values', async ({ page }) => {
  await page.route('https://api.github.com/**', (r) => r.fulfill({ status: 403, json: {} }));
  await page.goto('/');
  await expect(page.locator('footer [data-gh-release-tag]')).not.toBeEmpty();
});

test('in-page anchors scroll smoothly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth');
  await page.goto('/docs/guides/notifications/');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth');
});

test('every external link opens in a new tab', async ({ page }) => {
  await page.goto('/');
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')].filter((a) => a.target !== '_blank').map((a) => a.href),
  );
  expect(missing).toEqual([]);
  await expect(page.locator('footer a.sponsor')).toHaveAttribute('target', '_blank');
});
