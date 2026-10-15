import { describe, expect, it } from 'vitest';
import { cellGrid, displayPath, scanLog } from '../../src/lib/not-found';

describe('cellGrid', () => {
  it('draws 404 in 5×7 digits with a one-cell margin', () => {
    const grid = cellGrid();
    expect(grid).toHaveLength(9);
    expect(grid.every((row) => row.length === 19)).toBe(true);
    expect(grid[0].every((c) => c === 'empty')).toBe(true);
    expect(grid[8].every((c) => c === 'empty')).toBe(true);
  });

  it('keeps the 4s and loses the 0', () => {
    const cells = cellGrid().flat();
    expect(cells.filter((c) => c === 'kept')).toHaveLength(28);
    expect(cells.filter((c) => c === 'lost')).toHaveLength(16);
  });
});

describe('displayPath', () => {
  it('decodes the path', () => {
    expect(displayPath('/docs/caf%C3%A9/')).toBe('/docs/café/');
  });

  it('keeps a malformed path as it is', () => {
    expect(displayPath('/%E0%A4%A/')).toBe('/%E0%A4%A/');
  });

  it('shortens long paths around an ellipsis', () => {
    const shown = displayPath(`/${'a'.repeat(100)}/end/`, 20);
    expect(shown).toHaveLength(20);
    expect(shown.startsWith('/aaa')).toBe(true);
    expect(shown.endsWith('/end/')).toBe(true);
    expect(shown).toContain('…');
  });
});

describe('scanLog', () => {
  const lines = scanLog('/missing/', new Date(2026, 9, 15, 12), () => 0.5);

  it('runs restic find on the requested path and finds nothing', () => {
    expect(lines[0]).toEqual({ kind: 'cmd', text: 'restic find /missing/' });
    expect(lines.at(-2)).toEqual({ kind: 'warn', text: '0 of 6 snapshots contain /missing/' });
    expect(lines.at(-1)?.kind).toBe('hint');
  });

  it('lists the nightly snapshots of the last days, newest first', () => {
    const misses = lines.filter((l) => l.kind === 'miss').map((l) => l.text);
    expect(misses).toHaveLength(6);
    expect(misses[0]).toMatch(/^80000000 {2}Oct 15 03:00 +nas-01 +no match$/);
    expect(misses[5]).toMatch(/Oct 10 03:00 +b2-offsite/);
  });

  it('does not list a snapshot from later today before 03:00', () => {
    const early = scanLog('/x/', new Date(2026, 9, 15, 1), () => 0.5);
    expect(early.find((l) => l.kind === 'miss')?.text).toContain('Oct 14 03:00');
  });
});
