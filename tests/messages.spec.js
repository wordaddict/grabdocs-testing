const { test, expect } = require('@playwright/test');

test('navigation works', async ({ page }) => {
  await page.goto('https://grabdocs.com');

  const links = page.locator('a');

  await expect(links.first()).toBeVisible();
});