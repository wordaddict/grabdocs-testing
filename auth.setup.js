const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Start from the real site, not /login
  await page.goto('https://grabdocs.com');

  console.log('Log in manually with Google in the opened browser.');
  console.log('After you are fully logged in and inside the app, press ENTER here.');

  process.stdin.resume();
  process.stdin.once('data', async () => {
    await context.storageState({ path: 'storageState.json' });
    console.log('Saved login session to storageState.json');
    await browser.close();
    process.exit(0);
  });
})();