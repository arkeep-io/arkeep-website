#!/usr/bin/env node
// Finds internal links in a built site that point at nothing.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolves(distDir, href) {
  const path = decodeURI(href.split(/[?#]/)[0]);
  if (path.endsWith('/')) return exists(join(distDir, path, 'index.html'));
  return (
    (await exists(join(distDir, path))) ||
    (await exists(join(distDir, path, 'index.html'))) ||
    exists(join(distDir, `${path}.html`))
  );
}

export async function findBrokenLinks(distDir) {
  const broken = [];
  const attr = /\s(?:href|src)="([^"]+)"/g;
  for (const file of (await htmlFiles(distDir)).sort()) {
    const html = await readFile(file, 'utf8');
    for (const [, href] of html.matchAll(attr)) {
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      if (!(await resolves(distDir, href))) broken.push({ page: relative(distDir, file), href });
    }
  }
  return broken;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = process.argv[2] ?? 'dist';
  const broken = await findBrokenLinks(dir);
  for (const b of broken) console.log(`${b.page}: ${b.href}`);
  console.log(broken.length === 0 ? 'No broken internal links.' : `${broken.length} broken internal link(s).`);
  process.exit(broken.length === 0 ? 0 : 1);
}
