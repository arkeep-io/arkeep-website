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

test('install platform changes the command and the guide link', async ({ page }) => {
  await page.goto('/');
  const install = page.locator('#install');
  await install.getByRole('radio', { name: 'Kubernetes cluster' }).click();
  await expect(install.locator('[data-install-command]')).toContainText('helm install');
  const link = install.getByRole('link', { name: /Open the Kubernetes cluster guide/ });
  await expect(link).toHaveAttribute('href', '/docs/installation/kubernetes/');
  await expect(link).toHaveAttribute('target', '_blank');
});

test('install platforms move with arrow keys', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard flow');
  await page.goto('/');
  const radios = page.locator('#install').getByRole('radio');
  await radios.first().click();
  await page.keyboard.press('ArrowRight');
  await expect(radios.nth(1)).toBeFocused();
  await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true');
});
