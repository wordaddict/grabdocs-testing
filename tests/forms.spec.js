const { test, expect } = require('@playwright/test');

test('user can open homepage and see main heading', async ({ page }) => {
  await page.goto('https://grabdocs.com');

  await expect(page.locator('body')).toContainText(/grabdocs/i);
});