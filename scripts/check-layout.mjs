// Walks every question through every stage at 1920x1080 with stub images routed in,
// and fails if anything overflows the viewport or body text drops under 40px.
// Usage: BASE_URL=http://localhost:5173 node scripts/check-layout.mjs   (dev server or `npm start` must be running)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const MIN_PX = 40;
const TEXT_SELECTORS = ['.question-text', '.option-text', '.hint-text', '.answer-text', '.reveal', '.story-line', '.story-title'];
const questions = JSON.parse(readFileSync(new URL('../src/data/questions.json', import.meta.url), 'utf8'));

const stub = (w, h, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#6b4fa0"/><text x="50%" y="50%" fill="#fff" font-size="48" text-anchor="middle">${label}</text></svg>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.route('**/img/*.jpg', (route) => {
  const url = route.request().url();
  const face = /-opt-/.test(url) && /\/5\./.test(url);
  const poster = /-opt-/.test(url);
  const svg = face ? stub(800, 800, 'face') : poster ? stub(800, 1200, 'poster') : stub(1200, 900, 'photo');
  return route.fulfill({ contentType: 'image/svg+xml', body: svg });
});

const failures = [];
const overflows = () => page.evaluate(() => {
  const d = document.documentElement;
  return d.scrollWidth > innerWidth || d.scrollHeight > innerHeight;
});

// The board and the pick screens must fit too: their glyph rows set each tile's minimum width.
await page.goto(`${BASE}/?n=board`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /begin/i }).click();
await page.waitForSelector('.board');
if (await overflows()) failures.push('board overflows 1080p');
await page.getByRole('button', { name: /Diwali/ }).click();
await page.waitForSelector('.pick');
if (await overflows()) failures.push('pick (who) overflows 1080p');
await page.getByRole('button', { name: /^Adult/ }).click();
await page.waitForTimeout(100);
if (await overflows()) failures.push('pick (side) overflows 1080p');

for (const q of questions) {
  await page.goto(`${BASE}/?n=${encodeURIComponent(q.id)}#/q/${encodeURIComponent(q.id)}`, { waitUntil: "networkidle" });
  await page.waitForSelector('.question');
  const stageCount = 1 + (q.options || q.hint ? 1 : 0) + 1 + (q.story ? 1 : 0);
  for (let s = 0; s < stageCount; s++) {
    if (s > 0) { await page.waitForTimeout(420); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300); }
    const r = await page.evaluate(({ sels, min }) => {
      const el = document.querySelector('.question');
      const overflow = Math.max(document.documentElement.scrollHeight, el.scrollHeight) - window.innerHeight;
      const small = [];
      for (const sel of sels) for (const n of document.querySelectorAll(sel)) {
        const px = parseFloat(getComputedStyle(n).fontSize);
        if (px < min) small.push(`${sel}=${px.toFixed(0)}px`);
      }
      const stage = [...el.classList].find((c) => c.startsWith('stage-'));
      return { overflow, small: [...new Set(small)], stage };
    }, { sels: TEXT_SELECTORS, min: MIN_PX });
    if (r.overflow > 0) failures.push(`${q.id} ${r.stage}: overflows by ${r.overflow}px`);
    if (r.small.length) failures.push(`${q.id} ${r.stage}: small text ${r.small.join(', ')}`);
  }
}
await browser.close();
if (failures.length) {
  console.log(`LAYOUT CHECK FAILED (${failures.length}):`);
  for (const f of failures) console.log('  ' + f);
  process.exit(1);
}
console.log(`LAYOUT CHECK OK: ${questions.length} questions, every stage fits 1080p with body text >= ${MIN_PX}px`);
