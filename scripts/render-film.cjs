/*
 * Usage: node scripts/render-film.cjs
 * Requirements: Node.js, Playwright (`npm install playwright`) and Chromium (`npx playwright install chromium`).
 * Renders 900 deterministic frames at 60fps from film.html at 1920x1080 / DPR 1.
 * Writes frames/frame-0000.png through frames/frame-0899.png.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'frames');
const frameCount = 900;
const fps = 60;

(async () => {
  let browser;
  try {
    fs.mkdirSync(outputDir, { recursive: true });
    for (const name of fs.readdirSync(outputDir)) {
      if (/^frame-\d{4}\.png$/.test(name)) fs.unlinkSync(path.join(outputDir, name));
    }

    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.join(root, 'film.html')).href, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__film && typeof window.__film.seek === 'function');

    for (let frame = 0; frame < frameCount; frame += 1) {
      await page.evaluate((seconds) => window.__film.seek(seconds), frame / fps);
      const filename = `frame-${String(frame).padStart(4, '0')}.png`;
      await page.screenshot({ path: path.join(outputDir, filename), fullPage: false });
      if (frame % 60 === 0) console.log(`Rendered ${frame + 1}/${frameCount}`);
    }
    console.log(`Rendered ${frameCount} frames at ${fps}fps to ${outputDir}`);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
