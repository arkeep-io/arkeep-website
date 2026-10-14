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

test('notifications fragment runs a job and sends events', async ({ page }) => {
  await page.goto('/');
  const notify = page.locator('[data-notify]');
  await notify.scrollIntoViewIfNeeded();
  await expect(notify.locator('[data-run-state]')).toHaveText('Running');
  await expect(notify.locator('[data-events] li').first()).toContainText('Healthchecks.io');
  await expect(notify.locator('[data-run-state]')).toHaveText('Succeeded', { timeout: 8000 });
  await expect(notify.locator('[data-events]')).toContainText('Backup completed: Postgres');
});

test('notifications fragment shows a finished run without JS', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('[data-notify] [data-run-state]')).toHaveText('Failed');
  await expect(page.locator('[data-notify] [data-events] li')).toHaveCount(4);
  await ctx.close();
});
