import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { writeFile, rm } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4330';
const fixtures = [
  ['aa-list-fixture', 'Alpha fixture', 'Unique description needle', '2026-12-01'],
  ['bb-list-fixture', 'Beta fixture', 'Another description', '2026-12-01'],
  ['cc-list-fixture', 'Older fixture', 'Older description', '2026-01-01'],
];

test('built listing discovers, orders and searches workarounds and opens their details', async () => {
  const files = fixtures.map(([slug]) => new URL(`../src/content/docs/workaround/${slug}.mdx`, import.meta.url));
  let server;
  let browser;
  try {
    for (const [i, [, title, description, date]] of fixtures.entries()) {
      await writeFile(files[i], `---\ntitle: ${title}\ndescription: ${description}\ntags: [FixtureTag]\npublishedAt: "${date}"\n---\n\nBodyOnlyNeedle\n`);
    }
    const build = spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
    assert.equal(build.status, 0, build.stdout + build.stderr);
    server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4330'], { stdio: 'ignore' });
    for (let i = 0; i < 100; i++) {
      try { if ((await fetch(base)).ok) break; } catch {}
      await delay(100);
    }
    browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
    const page = await browser.newPage();
    await page.goto(base);
    await page.getByRole('navigation').getByRole('link', { name: 'Workarounds' }).click();
    assert.match(page.url(), /\/workarounds\/$/);
    const cards = page.locator('main article');
    const titles = await cards.locator('h2').allTextContents();
    assert.deepEqual(titles.slice(0, 2), ['Alpha fixture', 'Beta fixture']);
    assert.ok(titles.indexOf('Older fixture') > titles.indexOf('Beta fixture'));
    assert.ok(await cards.filter({ hasText: 'Alpha fixture' }).getByText('FixtureTag').isVisible());
    const search = page.getByRole('searchbox');
    await search.fill('beta FIXTURE');
    assert.deepEqual(await cards.filter({ visible: true }).locator('h2').allTextContents(), ['Beta fixture']);
    await search.fill('description needle');
    assert.deepEqual(await cards.filter({ visible: true }).locator('h2').allTextContents(), ['Alpha fixture']);
    await search.fill('BodyOnlyNeedle');
    assert.ok(await page.getByText('ไม่พบ Workaround ที่ตรงกับคำค้น').isVisible());
    await search.fill('Alpha fixture');
    await page.getByRole('link', { name: 'Alpha fixture' }).click();
    assert.match(page.url(), /\/workaround\/aa-list-fixture\/$/);
    assert.ok(await page.getByRole('heading', { name: 'Alpha fixture' }).isVisible());
  } finally {
    await browser?.close();
    server?.kill();
    await Promise.all(files.map((file) => rm(file, { force: true })));
  }
});
