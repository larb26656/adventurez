import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { writeFile, rm } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4329';

test('built pages preserve the old fragment and show the complete workaround', async () => {
  const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4329'], { stdio: 'ignore' });
  let browser;
  try {
    for (let i = 0; i < 100; i++) {
      try { if ((await fetch(base)).ok) break; } catch {}
      await delay(100);
    }
    browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
    const page = await browser.newPage();
    await page.goto(`${base}/cheatsheet/postgresql/#workaround-สร้าง-user-และกำหนดสิทธิ์-database`);
    const heading = page.locator('#workaround-สร้าง-user-และกำหนดสิทธิ์-database');
    assert.equal(await heading.count(), 1);
    assert.ok(await heading.isVisible());
    assert.ok(await heading.evaluate((element) => Math.abs(element.getBoundingClientRect().top) < window.innerHeight));
    await page.getByRole('link', { name: /สร้าง User และกำหนดสิทธิ์ Database/ }).last().click();
    assert.match(page.url(), /\/workaround\/postgresql-user-database-permissions\/$/);
    assert.ok(await page.getByRole('heading', { name: 'Full access (อ่าน/เขียน)' }).isVisible());
    assert.ok(await page.getByRole('heading', { name: 'Read-only' }).isVisible());
    assert.ok(await page.getByText('CREATE ROLE <app_full_role> NOLOGIN;', { exact: false }).first().isVisible());
    assert.ok(await page.getByText('ALTER DEFAULT PRIVILEGES มีผลเฉพาะ object', { exact: false }).isVisible());
  } finally {
    await browser?.close();
    server.kill();
  }
});

test('build rejects incomplete and invalid workaround metadata', async () => {
  const file = new URL('../src/content/docs/workaround/validation-fixture.mdx', import.meta.url);
  const cases = [
    ['title: Fixture\ndescription: Example\npublishedAt: "2026-11-04"', 'tags'],
    ['title: Fixture\ndescription: Example\ntags: []\npublishedAt: "2026-11-04"', 'tags'],
    ['title: Fixture\ndescription: Example\ntags: [" "]\npublishedAt: "2026-11-04"', 'tags'],
    ['title: Fixture\ndescription: Example\ntags: [PostgreSQL]', 'publishedAt'],
    ['title: Fixture\ndescription: Example\ntags: [PostgreSQL]\npublishedAt: "2026-02-30"', 'publishedAt'],
    ['title: Fixture\ntags: [PostgreSQL]\npublishedAt: "2026-11-04"', 'description'],
    ['description: Example\ntags: [PostgreSQL]\npublishedAt: "2026-11-04"', 'title'],
  ];
  try {
    for (const [frontmatter, field] of cases) {
      await writeFile(file, `---\n${frontmatter}\n---\n\nFixture content.\n`);
      const result = spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
      assert.notEqual(result.status, 0, `${field} should fail the build`);
      assert.match(result.stdout + result.stderr, /Workaround/i);
      assert.match(result.stdout + result.stderr, new RegExp(field));
    }
  } finally {
    await rm(file, { force: true });
  }
});
