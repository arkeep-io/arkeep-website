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
