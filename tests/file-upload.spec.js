const { test, expect } = require('@playwright/test');
const path = require('path');

test('file upload simulation works', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/index.html');

  const filePath = path.join(__dirname, 'sample.txt');

  await page.setInputFiles('input[type="file"]', filePath);

  await expect(page.locator('body')).toContainText(/upload/i);
});