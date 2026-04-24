const { test, expect } = require('@playwright/test');
const { localFixtureUrl } = require('./helpers');

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(localFixtureUrl());
  });

  test('shows validation error when required fields are missing', async ({ page }) => {
    const contactSection = page.getByRole('region', { name: 'Contact form' });

    await contactSection.getByRole('button', { name: /send message/i }).click();

    await expect(page.locator('#formStatus')).toHaveText('Please complete every field before submitting.');
    await expect(page.locator('#submissionSummary')).toBeHidden();
  });

  test('rejects invalid email addresses', async ({ page }) => {
    const contactSection = page.getByRole('region', { name: 'Contact form' });

    await contactSection.getByLabel('Name').fill('Michael');
    await contactSection.getByLabel('Email').fill('not-an-email');
    await contactSection.getByLabel('Message', { exact: true }).fill('This message is definitely long enough.');
    await contactSection.getByRole('button', { name: /send message/i }).click();

    await expect(page.locator('#formStatus')).toHaveText('Enter a valid email address.');
    await expect(page.locator('#submissionSummary')).toBeHidden();
  });

  test('rejects messages that are too short', async ({ page }) => {
    const contactSection = page.getByRole('region', { name: 'Contact form' });

    await contactSection.getByLabel('Name').fill('Michael');
    await contactSection.getByLabel('Email').fill('michael@example.com');
    await contactSection.getByLabel('Message', { exact: true }).fill('Too short');
    await contactSection.getByRole('button', { name: /send message/i }).click();

    await expect(page.locator('#formStatus')).toHaveText('Message must be at least 10 characters long.');
    await expect(page.locator('#submissionSummary')).toBeHidden();
  });

  test('submits valid details and shows a submission summary', async ({ page }) => {
    const contactSection = page.getByRole('region', { name: 'Contact form' });
    const name = 'Michael Adeyinka';
    const email = 'michael@example.com';
    const message = 'I need a more robust test suite for this form.';

    await contactSection.getByLabel('Name').fill(name);
    await contactSection.getByLabel('Email').fill(email);
    await contactSection.getByLabel('Message', { exact: true }).fill(message);
    await contactSection.getByRole('button', { name: /send message/i }).click();

    await expect(page.locator('#formStatus')).toHaveText('Message sent successfully.');
    await expect(page.locator('#submissionSummary')).toBeVisible();
    await expect(page.locator('[data-summary="name"]')).toHaveText(name);
    await expect(page.locator('[data-summary="email"]')).toHaveText(email);
    await expect(page.locator('[data-summary="message"]')).toHaveText(message);
  });
});
