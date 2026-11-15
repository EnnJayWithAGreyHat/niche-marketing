import { chromium } from 'playwright';

const base = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const pages = ['/', '/services', '/industries', '/how-it-works', '/about', '/contact', '/privacy'];
const viewports = [[375, 812], [390, 844], [768, 1024], [1366, 768], [1920, 1080]];
const browser = await chromium.launch({headless: true});
try {
  for (const [width, height] of viewports) {
    const page = await browser.newPage({viewport: {width, height}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of pages) {
      const response = await page.goto(new URL(path, base).href);
      if (!response || response.status() >= 400) throw new Error(`${width}x${height} ${path}: HTTP ${response?.status()}`);
      if (path === '/' && await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`${width}x${height}: horizontal overflow`);
    }
    if (errors.length) throw new Error(`${width}x${height}: ${errors.join('; ')}`);
    console.log(`${width}x${height}: ${pages.length} routes passed`);
    await page.close();
  }
  const page = await browser.newPage();
  const invalid = await page.request.post(new URL('/api/contact', base).href, {data: {name: 'x'}});
  if (invalid.status() !== 400) throw new Error(`Invalid contact data returned HTTP ${invalid.status()}`);
  console.log('Contact validation: invalid request rejected');
} finally { await browser.close(); }
