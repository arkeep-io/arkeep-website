import { expect, test } from '@playwright/test';

test('roadmap tabs switch with click and keyboard', async ({ page }) => {
  await page.goto('/');
  const tabs = page.locator('#roadmap').getByRole('tab');
  await expect(tabs).toHaveCount(4);
  await tabs.nth(2).click();
  await expect(page.locator('#roadmap').getByRole('tabpanel')).toContainText('Pre-update backup gate');
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
});

test('install sentence leads to the matching page', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Platform').selectOption('kubernetes');
  await expect(page.locator('[data-install-command]')).toContainText('helm install');
  const [popup] = await Promise.all([page.context().waitForEvent('page'), page.getByRole('button', { name: /tonight\./ }).click()]);
  await expect(popup).toHaveURL(/\/docs\/installation\/kubernetes\/$/);
});
