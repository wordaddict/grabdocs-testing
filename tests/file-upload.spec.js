const { test, expect } = require('@playwright/test');
const path = require('path');
const { localFixtureUrl } = require('./helpers');

test.describe('file upload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(localFixtureUrl());
  });

  test('shows a default empty state before a file is chosen', async ({ page }) => {
    await expect(page.locator('#uploadStatus')).toHaveText('No file selected');
  });

  test('shows the selected file name and size after upload', async ({ page }) => {
    const filePath = path.join(__dirname, 'sample.txt');

    await page.setInputFiles('#fileInput', filePath);

    await expect(page.locator('#uploadStatus')).toContainText('Selected sample.txt');
    await expect(page.locator('#uploadStatus')).toContainText('bytes');
    await expect(page.locator('#fileInput')).toHaveValue(/sample\.txt$/);
    await expect(page.locator('#fileInput')).toHaveAttribute('type', 'file');

    const selectedFile = await page.locator('#fileInput').evaluate((input) => ({
      count: input.files.length,
      name: input.files[0]?.name
    }));

    expect(selectedFile).toEqual({ count: 1, name: 'sample.txt' });
  });

  test('returns to the empty state when the selection is cleared', async ({ page }) => {
    const filePath = path.join(__dirname, 'sample.txt');

    await page.setInputFiles('#fileInput', filePath);
    await expect(page.locator('#uploadStatus')).toContainText('Selected sample.txt');

    await page.setInputFiles('#fileInput', []);
    await expect(page.locator('#uploadStatus')).toHaveText('No file selected');
  });
});
