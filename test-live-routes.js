const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const urls = [
    'https://www.cutiepawspedia.com/en/australia',
    'https://www.cutiepawspedia.com/nl/netherlands',
    'https://www.cutiepawspedia.com/nl/belgie',
    'https://www.cutiepawspedia.com/nl/giftige-stoffen',
    'https://www.cutiepawspedia.com/nl/giftig-voor-honden',
    'https://www.cutiepawspedia.com/nl/giftig/chocolade/honden',
  ];

  for (const url of urls) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const status = response.status();
      const title = await page.title();
      console.log(status + ' - ' + url);
      if (status === 404) {
        console.log('  Title: ' + title);
        const bodyText = await page.locator('body').textContent();
        console.log('  Body: ' + bodyText.substring(0, 200));
      }
    } catch (e) {
      console.log('ERROR - ' + url + ': ' + e.message);
    }
  }

  await browser.close();
})();
