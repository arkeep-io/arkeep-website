import { describe, expect, it } from 'vitest';
import { backupLog, clock, formatBytes, restoreLog, snapshotId } from '../../src/lib/snapshot';

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

describe('backupLog', () => {
  const files = [
    { path: '/arkeep.io/hero.html', bytes: 2048 },
    { path: '/arkeep.io/roadmap.html', bytes: 1024 },
  ];
  const dests = [
    { name: 'NAS (local)', type: 'local' },
    { name: 'Backblaze B2', type: 's3' },
  ];
  it('has a start block, one block per destination and a closing line', () => {
    const blocks = backupLog(files, 'a3f9c1d2', dests);
    expect(blocks).toHaveLength(4);
    expect(blocks[0][1].msg).toBe('resolved 2 source(s), 0 command source(s)');
    expect(blocks[3][0].msg).toBe('backup completed successfully');
  });
  it('reports the snapshot and the bytes added for each destination', () => {
    const lines = backupLog(files, 'a3f9c1d2', dests).flat().map((l) => l.msg);
    expect(lines.filter((m) => m.includes('(snapshot: a3f9c1d2, added: 3072 bytes)'))).toHaveLength(2);
  });
});

describe('restoreLog', () => {
  it('uses the agent\'s restore messages', () => {
    expect(restoreLog('a3f9c1d2').map((l) => l.msg)).toEqual([
      'restore started: snapshot a3f9c1d2 → /tmp/arkeep-restore',
      'restore completed successfully: files written to /tmp/arkeep-restore',
    ]);
  });
});

describe('clock', () => {
  it('formats like the GUI', () => {
    expect(clock(new Date('2026-10-14T11:54:50Z'), 'UTC')).toBe('11:54:50 AM');
  });
});
