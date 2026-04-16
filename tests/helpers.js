const login = async (page) => {
    await page.goto('https://grabdocs.com/login');
  
    await page.getByLabel(/email/i).fill('YOUR_EMAIL');
    await page.getByLabel(/password/i).fill('YOUR_PASSWORD');
    await page.getByRole('button', { name: /log in|sign in/i }).click();
  
    await page.waitForLoadState('networkidle');
  };
  
  module.exports = { login };