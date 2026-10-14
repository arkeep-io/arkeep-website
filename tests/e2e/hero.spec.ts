import { expect, test } from '@playwright/test';

test('run, break and restore the page', async ({ page }) => {
  await page.goto('/');
  const app = page.locator('[data-backup]');
  await page.getByRole('button', { name: 'Run backup' }).click();
  await expect(app.locator('[data-log]')).toContainText('backup completed successfully');
  await expect(app.locator('[data-log]')).toContainText(/\(snapshot: [0-9a-f]{8}, added: \d+ bytes\)/);
  await page.getByRole('button', { name: 'Break the headline' }).click();
  await expect(page.locator('#hero-title')).toHaveCount(0);
  await expect(app.locator('[data-status]')).toContainText('Data lost');
  await page.getByRole('button', { name: 'Restore it' }).click();
  await expect(page.locator('#hero-title')).toContainText('Let there be backups');
  await expect(app.locator('[data-status]')).toContainText('Restored');
});

test('destinations go pending, running, succeeded', async ({ page }) => {
  await page.goto('/');
  const rows = page.locator('[data-backup] [data-dest]');
  await page.getByRole('button', { name: 'Run backup' }).click();
  await expect(rows.nth(1)).toContainText('Pending');
  await expect(rows.nth(0)).toContainText('Running');
  await expect(rows.nth(1)).toContainText('Succeeded');
  await expect(rows.nth(0)).toContainText('Succeeded');
});

test('hero controls survive out-of-order use', async ({ page }) => {
  await page.goto('/');
  const run = page.getByRole('button', { name: 'Run backup' });
  const brk = page.getByRole('button', { name: 'Break the headline' });
  const restore = page.getByRole('button', { name: 'Restore it' });
  await expect(restore).toBeDisabled();
  await expect(brk).toBeDisabled();
  await run.click();
  await expect(brk).toBeEnabled();
  await brk.click();
  await expect(brk).toBeDisabled();
  await expect(run).toBeDisabled();
  await restore.click();
  await expect(run).toBeEnabled();
  await run.click();
  await expect(page.locator('[data-backup] [data-readout]')).toContainText(/[0-9a-f]{8} · \d+ files/);
});

test('no-js renders the completed job', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('[data-backup] [data-log]')).toContainText('backup completed successfully');
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Run backup' })).toBeHidden();
  await ctx.close();
});

test('focus moves to the next meaningful action', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard flow');
  await page.goto('/');
  await page.getByRole('button', { name: 'Run backup' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Break the headline' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: /Restore from snapshot [0-9a-f]{8}/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Break the headline' })).toBeFocused();
});

test('breaking the headline brings it into view with the way back inside', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Run backup' }).click();
  const brk = page.getByRole('button', { name: 'Break the headline' });
  await expect(brk).toBeEnabled();
  await brk.click();
  const back = page.getByRole('button', { name: /Restore from snapshot/ });
  await expect(back).toBeInViewport();
  await back.click();
  await expect(page.locator('#hero-title')).toBeInViewport();
  await expect(page.locator('[data-backup] [data-status]')).toContainText('Restored');
});

test('phone frame shows the live job page without the sidebar', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone layout');
  await page.goto('/');
  await expect(page.locator('[data-backup] .sidebar')).toBeHidden();
  await expect(page.locator('[data-backup] [data-log]')).toBeVisible();
});
