import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findBrokenLinks } from '../../scripts/check-links.mjs';

async function site(files: Record<string, string>) {
  const dir = await mkdtemp(join(tmpdir(), 'links-'));
  for (const [path, html] of Object.entries(files)) {
    await mkdir(join(dir, path, '..'), { recursive: true });
    await writeFile(join(dir, path), html);
  }
  return dir;
}

describe('findBrokenLinks', () => {
  it('accepts directory routes, files, hashes and external links', async () => {
    const dir = await site({
      'index.html': '<a href="/docs/">d</a><a href="/docs/#x">h</a><a href="https://github.com">g</a><a href="#top">t</a><img src="/logo.png"><a href="mailto:a@b.c">m</a>',
      'docs/index.html': '<a href="/">home</a>',
      'logo.png': 'x',
    });
    expect(await findBrokenLinks(dir)).toEqual([]);
  });

  it('reports missing targets with the page they appear on', async () => {
    const dir = await site({ 'index.html': '<a href="/docs/missing/">x</a><link href="/gone.css" rel="stylesheet">' });
    expect(await findBrokenLinks(dir)).toEqual([
      { page: 'index.html', href: '/docs/missing/' },
      { page: 'index.html', href: '/gone.css' },
    ]);
  });
});
