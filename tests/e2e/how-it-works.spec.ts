import { expect, test } from '@playwright/test';

test('steps switch the terminal and the agents panel', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#how-it-works');
  const tabs = section.getByRole('tab');
  await expect(tabs).toHaveCount(3);
  await expect(section.locator('[role="tabpanel"].is-active')).toContainText('docker compose up -d');
  await expect(section.locator('[role="tabpanel"].is-active')).toContainText('No agents yet');
  await tabs.nth(2).click();
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(section.locator('[role="tabpanel"].is-active')).toContainText('4 online');
  await expect(section.locator('[role="tabpanel"].is-active')).toContainText('restic -r');
});

test('arrow keys move between steps', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard flow');
  await page.goto('/');
  const tabs = page.locator('#how-it-works').getByRole('tab');
  await tabs.first().click();
  await page.keyboard.press('ArrowDown');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
});

test('without JS every step is readable', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/`);
  for (const text of ['No agents yet', 'Connecting', '4 online']) {
    await expect(page.locator('#how-it-works').getByText(text).first()).toBeVisible();
  }
  await ctx.close();
});
