import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { writeFile, rm, mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4330';
const fixtures = [
  ['aa-list-fixture', 'Alpha fixture', 'Unique description needle', '2026-12-01', '[FixtureTag, Shared Topic]'],
  ['bb-list-fixture', 'Beta fixture', 'Another description', '2026-12-01', '[FixtureTag]'],
  ['cc-list-fixture', 'Older fixture', 'Older description', '2026-01-01', '[OtherTag]'],
];

test('built listing discovers, orders and searches workarounds and opens their details', async () => {
  const files = fixtures.map(([slug]) => new URL(`../src/content/docs/workaround/${slug}.mdx`, import.meta.url));
  const indexDir = new URL('../src/content/docs/workaround/index-list-fixture/', import.meta.url);
  const indexFile = new URL('index.mdx', indexDir);
  const customFile = new URL('../src/content/docs/workaround/custom-list-fixture.mdx', import.meta.url);
  const otherFile = new URL('../src/content/docs/other-list-fixture.mdx', import.meta.url);
  let server;
  let browser;
  try {
    await mkdir(indexDir, { recursive: true });
    await writeFile(indexFile, '---\ntitle: Index fixture\ndescription: Index description\ntags: [IndexTag]\npublishedAt: "2025-01-01"\n---\n\nIndex content.\n');
    await writeFile(customFile, '---\ntitle: Custom fixture\ndescription: Custom description\ntags: [CustomTag]\npublishedAt: "2025-01-01"\nslug: workaround/custom-route\n---\n\nCustom content.\n');
    await writeFile(otherFile, '---\ntitle: Other fixture\nslug: workaround/unrelated-fixture\n---\n\nOther content.\n');
    for (const [i, [, title, description, date, tags]] of fixtures.entries()) {
      await writeFile(files[i], `---\ntitle: ${title}\ndescription: ${description}\ntags: ${tags}\npublishedAt: "${date}"\n---\n\nBodyOnlyNeedle\n`);
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
    const clickCardDescription = async (title, description) => {
      const box = await cards.filter({ hasText: title }).getByText(description).boundingBox();
      assert.ok(box);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    };
    await page.goto(base);
    await page.getByRole('navigation').getByRole('link', { name: 'Workarounds' }).click();
    assert.match(page.url(), /\/workarounds\/$/);
    const cards = page.locator('main article');
    const titles = await cards.locator('h2').allTextContents();
    assert.deepEqual(titles.slice(0, 2), ['Alpha fixture', 'Beta fixture']);
    assert.ok(titles.indexOf('Older fixture') > titles.indexOf('Beta fixture'));
    assert.ok(!titles.includes('Other fixture'));
    assert.ok(titles.includes('Custom fixture'));
    assert.ok(titles.includes('Index fixture'));
    assert.ok(await cards.filter({ hasText: 'Alpha fixture' }).getByText('FixtureTag').isVisible());
    await cards.filter({ hasText: 'Alpha fixture' }).getByRole('link', { name: 'FixtureTag' }).click();
    assert.match(page.url(), /\/workarounds\/tags\/fixturetag\/$/);
    assert.deepEqual(await page.locator('main article h2').allTextContents(), ['Alpha fixture', 'Beta fixture']);
    await page.getByRole('searchbox').fill('description needle');
    assert.deepEqual(await page.locator('main article').filter({ visible: true }).locator('h2').allTextContents(), ['Alpha fixture']);
    await page.getByRole('searchbox').fill('Older fixture');
    assert.ok(await page.getByText('ไม่พบ Workaround ที่ตรงกับคำค้น').isVisible());
    await page.getByRole('link', { name: 'กลับไป Workarounds ทั้งหมด' }).click();
    assert.match(page.url(), /\/workarounds\/$/);
    const search = page.getByRole('searchbox');
    await search.fill('beta FIXTURE');
    assert.deepEqual(await cards.filter({ visible: true }).locator('h2').allTextContents(), ['Beta fixture']);
    await search.fill('description needle');
    assert.deepEqual(await cards.filter({ visible: true }).locator('h2').allTextContents(), ['Alpha fixture']);
    await search.fill('BodyOnlyNeedle');
    assert.ok(await page.getByText('ไม่พบ Workaround ที่ตรงกับคำค้น').isVisible());
    await search.fill('Alpha fixture');
    await clickCardDescription('Alpha fixture', 'Unique description needle');
    await page.waitForURL(/\/workaround\/aa-list-fixture\/$/);
    assert.ok(await page.getByRole('heading', { name: 'Alpha fixture' }).isVisible());
    await page.getByRole('link', { name: 'Shared Topic' }).click();
    assert.match(page.url(), /\/workarounds\/tags\/shared-topic\/$/);
    assert.deepEqual(await page.locator('main article h2').allTextContents(), ['Alpha fixture']);
    await page.goto(`${base}/workarounds/`);
    await clickCardDescription('Index fixture', 'Index description');
    await page.waitForURL(/\/workaround\/index-list-fixture\/$/);
    assert.ok(await page.getByRole('heading', { name: 'Index fixture' }).isVisible());
    await page.goto(`${base}/workarounds/`);
    await clickCardDescription('Custom fixture', 'Custom description');
    await page.waitForURL(/\/workaround\/custom-route\/$/);
    assert.ok(await page.getByRole('heading', { name: 'Custom fixture' }).isVisible());
    await page.goto(`${base}/workaround/unrelated-fixture/`);
    assert.equal(await page.locator('[aria-label="Workaround tags"]').count(), 0);
  } finally {
    await browser?.close();
    server?.kill();
    await Promise.all(files.map((file) => rm(file, { force: true })));
    await rm(indexDir, { recursive: true, force: true });
    await rm(customFile, { force: true });
    await rm(otherFile, { force: true });
  }
});

test('build rejects different tags that produce the same URL', async () => {
  const file = new URL('../src/content/docs/workaround/tag-collision-fixture.mdx', import.meta.url);
  try {
    await writeFile(file, '---\ntitle: Collision fixture\ndescription: Example\ntags: [Shared Topic, shared-topic]\npublishedAt: "2026-11-04"\n---\n\nFixture content.\n');
    const build = spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
    assert.notEqual(build.status, 0);
    assert.match(build.stdout + build.stderr, /Shared Topic/);
    assert.match(build.stdout + build.stderr, /shared-topic/);
  } finally {
    await rm(file, { force: true });
  }
});
