import { expect, test } from '@playwright/test';

test('changing a rule changes what is kept', async ({ page }) => {
  await page.goto('/');
  const panel = page.locator('[data-retention]');
  const count = panel.locator('[data-retention-count]');
  const before = await count.textContent();
  await panel.getByRole('button', { name: 'More weekly' }).click();
  await expect(count).not.toHaveText(before!);
});

test('destinations keep independent rules', async ({ page }) => {
  await page.goto('/');
  const panel = page.locator('[data-retention]');
  await panel.getByLabel('Keep daily').fill('3');
  await panel.getByRole('radio', { name: 'Backblaze B2' }).click();
  await expect(panel.getByLabel('Keep daily')).toHaveValue('14');
  await panel.getByRole('radio', { name: 'NAS (local)' }).click();
  await expect(panel.getByLabel('Keep daily')).toHaveValue('3');
});

test('all rules at zero keeps everything; junk input clamps', async ({ page, isMobile }) => {
  test.skip(isMobile, 'hourly/yearly live behind More rules on phone');
  await page.goto('/');
  const panel = page.locator('[data-retention]');
  for (const label of ['Keep last', 'Keep hourly', 'Keep daily', 'Keep weekly', 'Keep monthly', 'Keep yearly']) {
    await panel.getByLabel(label).fill('0');
  }
  await expect(panel.locator('[data-retention-count]')).toHaveText('Keeps 120 of 120 snapshots');
  await panel.getByLabel('Keep daily').fill('-5');
  await panel.getByLabel('Keep daily').blur();
  await expect(panel.getByLabel('Keep daily')).toHaveValue('0');
});

test('phone reveals the extra rules on demand', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone-only control');
  await page.goto('/');
  const panel = page.locator('[data-retention]');
  await expect(panel.getByLabel('Keep hourly')).toBeHidden();
  await panel.getByRole('button', { name: 'More rules' }).click();
  await expect(panel.getByLabel('Keep hourly')).toBeVisible();
});
