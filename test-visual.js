const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const url = 'https://www.cutiepawspedia.com/en/australia';

  console.log('Testing: ' + url);

  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Status: ' + response.status());
  console.log('Title: ' + await page.title());

  // Check for 404 content
  const bodyText = await page.locator('body').textContent();
  const h1Text = await page.locator('h1').first().textContent().catch(() => 'No h1 found');

  console.log('H1: ' + h1Text);

  // Check if it contains 404 indicators
  if (bodyText.toLowerCase().includes('not found') ||
      bodyText.toLowerCase().includes('404') ||
      bodyText.toLowerCase().includes('page not found') ||
      bodyText.toLowerCase().includes('niet gevonden')) {
    console.log('⚠️ PAGE SHOWS 404 CONTENT!');
    console.log('Body preview: ' + bodyText.substring(0, 500));
  } else {
    console.log('✓ Page has normal content');
  }

  // Take screenshot
  await page.screenshot({ path: 'australia-page.png', fullPage: false });
  console.log('Screenshot saved to australia-page.png');

  await browser.close();
})();
