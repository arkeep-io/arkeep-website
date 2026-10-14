import { expect, test } from '@playwright/test';

test('six feature tiles with real screenshots that follow the theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('#features .tile')).toHaveCount(6);
  const light = page.locator('#features img[data-theme-img="light"]').first();
  await light.scrollIntoViewIfNeeded();
  await expect(light).toBeVisible();
  await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
  await expect(page.locator('#features img[data-theme-img="dark"]').first()).toBeVisible();
  await expect(light).toBeHidden();
});

test('ecosystem strip names destinations in text', async ({ page }) => {
  await page.goto('/');
  const strip = page.locator('#ecosystem');
  for (const n of ['S3', 'Backblaze B2', 'Cloudflare R2', 'MinIO', 'SFTP', 'Google Drive']) {
    await expect(strip.getByText(n, { exact: true })).toBeVisible();
  }
});

test('notifications panel runs a job and sends its notification', async ({ page }) => {
  await page.goto('/');
  const panel = page.locator('[data-notify]');
  await panel.scrollIntoViewIfNeeded();
  await expect(panel.locator('[data-run-state]')).toContainText('Running');
  await expect(panel.locator('[data-events] .item').first()).toContainText('Backup completed: Postgres', { timeout: 8000 });
  await expect(panel.locator('[data-events] .item').first().locator('.sent.is-sent')).toHaveCount(3, { timeout: 4000 });
});

test('notifications panel shows finished runs without JS', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('[data-notify] [data-events] .item')).toHaveCount(3);
  await expect(page.locator('[data-notify] [data-events]')).toContainText('Backup failed: Web server');
  await ctx.close();
});
