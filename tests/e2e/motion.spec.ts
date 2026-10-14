import { expect, test } from '@playwright/test';

test('sections reveal on scroll and nothing stays hidden', async ({ page }) => {
  await page.goto('/');
  const target = page.locator('#features .section-head');
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveClass(/is-in/);
  await expect(target).toHaveCSS('opacity', '1');
});

test('reduced motion shows everything immediately', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('#roadmap .head')).toHaveCSS('opacity', '1');
  await ctx.close();
});

test('hero headline settles in place', async ({ page }) => {
  await page.goto('/');
  const line = page.locator('h1 .line > span').first();
  // After the rise the computed transform is the identity ("none" or its matrix form).
  await expect(line).toHaveCSS('transform', /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/, { timeout: 3000 });
});

test('content shows even when the page scripts fail to load', async ({ page }) => {
  // The inline theme script still adds .js; every bundled module is blocked.
  await page.route('**/_astro/*.js', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('#roadmap .head')).toHaveCSS('opacity', '1', { timeout: 5000 });
});
