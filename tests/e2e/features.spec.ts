import { expect, test } from '@playwright/test';

test('six feature cells with real screenshots that follow the theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const cells = page.locator('#features [data-cell]');
  await expect(cells).toHaveCount(6);
  const light = page.locator('#features img[data-theme-img="light"]').first();
  await light.scrollIntoViewIfNeeded();
  await expect(light).toBeVisible();
  await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
  await expect(page.locator('#features img[data-theme-img="dark"]').first()).toBeVisible();
  await expect(light).toBeHidden();
});

test('proof row names destinations in text and shows the restic command', async ({ page }) => {
  await page.goto('/');
  const proof = page.locator('#proof');
  for (const n of ['S3', 'Backblaze B2', 'Cloudflare R2', 'MinIO', 'SFTP', 'Google Drive']) {
    await expect(proof.getByText(n, { exact: true })).toBeVisible();
  }
  await expect(proof.locator('code')).toContainText('restic -r');
});
