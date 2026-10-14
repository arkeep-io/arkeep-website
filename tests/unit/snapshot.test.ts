import { describe, expect, it } from 'vitest';
import { buildLog, formatBytes, snapshotId } from '../../src/lib/snapshot';

describe('formatBytes', () => {
  it.each([
    [0, '0 B'],
    [512, '512 B'],
    [1024, '1.0 KiB'],
    [1536, '1.5 KiB'],
    [5 * 1024 * 1024, '5.0 MiB'],
  ])('%i → %s', (n, s) => expect(formatBytes(n)).toBe(s));
});

describe('snapshotId', () => {
  it('is 8 hex chars and deterministic', async () => {
    const a = await snapshotId(['<h1>x</h1>', '<p>y</p>']);
    expect(a).toMatch(/^[0-9a-f]{8}$/);
    expect(await snapshotId(['<h1>x</h1>', '<p>y</p>'])).toBe(a);
  });
  it('still works where crypto.subtle is missing (insecure context)', async () => {
    const subtle = globalThis.crypto.subtle;
    Object.defineProperty(globalThis.crypto, 'subtle', { value: undefined, configurable: true });
    try {
      expect(await snapshotId(['a'])).toMatch(/^[0-9a-f]{8}$/);
    } finally {
      Object.defineProperty(globalThis.crypto, 'subtle', { value: subtle, configurable: true });
    }
  });
  it('changes when content changes', async () => {
    expect(await snapshotId(['a'])).not.toBe(await snapshotId(['b']));
  });
});

describe('buildLog', () => {
  const files = [
    { path: '/arkeep.io/hero.html', bytes: 2048 },
    { path: '/arkeep.io/roadmap.html', bytes: 1024 },
  ];
  it('reports totals and the snapshot per destination', () => {
    const log = buildLog(files, 'a3f9c1d2', ['NAS (local)', 'Backblaze B2']);
    expect(log).toContain('Files:           2 new,     0 changed,     0 unmodified');
    expect(log).toContain('Added to the repository: 3.0 KiB');
    expect(log.filter((l) => l === 'snapshot a3f9c1d2 saved')).toHaveLength(2);
    expect(log[0]).toBe('[NAS (local)] open repository');
  });
});
