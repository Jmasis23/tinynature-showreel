/*
 * Usage: node scripts/render-test.cjs
 * Requirements: Node.js, Playwright (`npm install playwright`) and Chromium (`npx playwright install chromium`).
 * Opens film.html, seeks to 2.0 seconds (frame 60 at 30fps), writes frames/test.png,
 * and exits nonzero if rendering or the output-file check fails.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'frames', 'test.png');

(async () => {
  let browser;
  try {
    fs.mkdirSync(path.dirname(output), { recursive: true });
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.join(root, 'film.html')).href, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__film && typeof window.__film.seek === 'function');
    await page.evaluate(() => window.__film.seek(2.0));
    await page.screenshot({ path: output, fullPage: false });
    if (!fs.existsSync(output)) throw new Error(`Expected screenshot was not created: ${output}`);
    console.log(`PASS: ${output}`);
    process.exitCode = 0;
  } catch (error) {
    console.error(`FAIL: ${error && error.stack ? error.stack : error}`);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
