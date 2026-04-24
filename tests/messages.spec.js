const { test, expect } = require('@playwright/test');
const { localFixtureUrl } = require('./helpers');

test.describe('message board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(localFixtureUrl());
  });

  test('prevents empty messages from being posted', async ({ page }) => {
    await page.getByRole('button', { name: /post message/i }).click();

    await expect(page.locator('#messageStatus')).toHaveText('Message cannot be empty.');
    await expect(page.locator('#messageList li')).toHaveCount(0);
  });

  test('posts a message and clears the input', async ({ page }) => {
    const input = page.getByLabel('Add a message');

    await input.fill('First post');
    await page.getByRole('button', { name: /post message/i }).click();

    await expect(page.locator('#messageStatus')).toHaveText('Message posted.');
    await expect(page.locator('#messageList li')).toHaveCount(1);
    await expect(page.locator('#messageList li').first()).toHaveText('First post');
    await expect(input).toHaveValue('');
  });

  test('appends multiple messages in submission order', async ({ page }) => {
    const input = page.getByLabel('Add a message');

    await input.fill('First post');
    await page.getByRole('button', { name: /post message/i }).click();

    await input.fill('Second post');
    await page.getByRole('button', { name: /post message/i }).click();

    await expect(page.locator('#messageList li')).toHaveCount(2);
    await expect(page.locator('#messageList li').nth(0)).toHaveText('First post');
    await expect(page.locator('#messageList li').nth(1)).toHaveText('Second post');
  });
});
