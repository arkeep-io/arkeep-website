import { expect, test } from '@playwright/test';

test('run, break and restore the page', async ({ page }) => {
  await page.goto('/');
  const frag = page.locator('[data-backup]');
  await frag.getByRole('button', { name: 'Run now' }).click();
  await expect(frag.locator('[data-log]')).toContainText(/snapshot [0-9a-f]{8} saved/);
  await frag.getByRole('button', { name: 'Break something' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0);
  await frag.getByRole('button', { name: 'Restore' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Backups you can');
});

test('hero fragment survives out-of-order use', async ({ page }) => {
  await page.goto('/');
  const frag = page.locator('[data-backup]');
  await expect(frag.getByRole('button', { name: 'Restore' })).toBeDisabled();
  await expect(frag.getByRole('button', { name: 'Break something' })).toBeDisabled();
  await frag.getByRole('button', { name: 'Run now' }).click();
  await expect(frag.getByRole('button', { name: 'Break something' })).toBeEnabled();
  await frag.getByRole('button', { name: 'Break something' }).click();
  await expect(frag.getByRole('button', { name: 'Break something' })).toBeDisabled();
  await expect(frag.getByRole('button', { name: 'Run now' })).toBeDisabled();
  await frag.getByRole('button', { name: 'Restore' }).click();
  await expect(frag.getByRole('button', { name: 'Run now' })).toBeEnabled();
  await frag.getByRole('button', { name: 'Run now' }).click();
  await expect(frag.locator('[data-readout]')).toContainText(/Last snapshot [0-9a-f]{8}/);
});

test('no-js renders static fragments', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('[data-backup] [data-log]')).toContainText('snapshot a3f9c1d2 saved');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await ctx.close();
});

test('focus moves to the next meaningful action', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard flow');
  await page.goto('/');
  const frag = page.locator('[data-backup]');
  await frag.getByRole('button', { name: 'Run now' }).focus();
  await page.keyboard.press('Enter');
  await expect(frag.getByRole('button', { name: 'Break something' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(frag.getByRole('button', { name: 'Restore' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(frag.getByRole('button', { name: 'Break something' })).toBeFocused();
});
