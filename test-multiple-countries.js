const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const urls = [
    'https://www.cutiepawspedia.com/en/australia',
    'https://www.cutiepawspedia.com/nl/netherlands',
    'https://www.cutiepawspedia.com/nl/belgie',
    'https://www.cutiepawspedia.com/en/united-states',
    'https://www.cutiepawspedia.com/en/united-kingdom',
    'https://www.cutiepawspedia.com/de/deutschland',
    'https://www.cutiepawspedia.com/de/germany',
  ];

  for (const url of urls) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const status = response.status();
      const title = await page.title();
      const h1 = await page.locator('h1').first().textContent().catch(() => 'N/A');
      
      const is404 = title.includes('404') || title.includes('Niet gevonden') || h1.includes('404');
      const indicator = is404 ? '❌ 404' : '✅ OK';
      
      console.log(`${indicator} | ${url}`);
      if (is404) console.log(`   Title: "${title}" | H1: "${h1}"`);
    } catch (e) {
      console.log(`⚠️ ERROR | ${url}: ${e.message}`);
    }
  }

  await browser.close();
})();
