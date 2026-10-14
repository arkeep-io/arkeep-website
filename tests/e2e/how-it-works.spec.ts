import { expect, test } from '@playwright/test';

test('stage follows the statement in view', async ({ page }) => {
  await page.goto('/');
  const stage = page.locator('[data-stage]');
  await page.locator('#how-it-works [data-step="0"]').evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await expect(stage).toHaveAttribute('data-state', '0');
  await page.locator('#how-it-works [data-step="2"]').evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await expect(stage).toHaveAttribute('data-state', '2');
  await expect(stage.getByText('4 online')).toBeVisible();
});

test('without JS every state is readable', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/`);
  for (const text of ['No agents yet', 'Connecting', '4 online']) {
    await expect(page.locator('#how-it-works').getByText(text).first()).toBeVisible();
  }
  await ctx.close();
});
