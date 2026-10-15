/** The digits of "404" as 5×7 cell bitmaps, drawn like the retention timeline's snapshot cells. */
export const GLYPHS: Record<string, string[]> = {
  '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  '0': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
};

export type Cell = 'empty' | 'kept' | 'lost';

/**
 * The "404" as a grid of cells with a one-cell margin. The 4s are kept snapshots; the 0 is the one
 * that went missing, so its cells are "lost".
 */
export function cellGrid(code = '404'): Cell[][] {
  const height = 7;
  const rows: Cell[][] = Array.from({ length: height + 2 }, () => ['empty']);
  [...code].forEach((digit, i) => {
    const glyph = GLYPHS[digit];
    for (let r = 0; r < height; r++) {
      const cells = [...glyph[r]].map((ch): Cell => (ch === '#' ? (digit === '0' ? 'lost' : 'kept') : 'empty'));
      rows[r + 1].push(...cells, 'empty');
    }
  });
  const width = rows[1].length;
  rows[0] = Array(width).fill('empty');
  rows[height + 1] = Array(width).fill('empty');
  return rows;
}

export interface ScanLine {
  kind: 'cmd' | 'info' | 'miss' | 'warn' | 'hint';
  text: string;
}

const DESTINATIONS = ['nas-01', 'b2-offsite'];

const HINTS = [
  'Either the link is wrong, or retention pruned this page long ago.',
  'Even restic cannot restore what was never backed up.',
  'Check the URL. Then check your backups. Mostly your backups.',
  'keep_last 0 is a bold retention policy.',
  'Good news: your real backups are not on this website.',
];

/** Shortens a requested path for the terminal, keeping its start and its end. */
export function displayPath(raw: string, max = 48): string {
  let path = raw;
  try {
    path = decodeURI(raw);
  } catch {
    /* keep it encoded */
  }
  if (path.length <= max) return path;
  const keep = max - 1;
  return `${path.slice(0, Math.ceil(keep / 2))}…${path.slice(-Math.floor(keep / 2))}`;
}

/**
 * A `restic find` that searches the nightly (03:00) snapshots of the last week for `path` and finds nothing.
 * `random` returns [0, 1); pass a fixed one for stable output.
 */
export function scanLog(path: string, now: Date, random: () => number = Math.random): ScanLine[] {
  const shown = displayPath(path);
  const hex = () => Math.floor(random() * 0x100000000).toString(16).padStart(8, '0');
  const snapshots = Array.from({ length: 6 }, (_, i) => {
    const at = new Date(now);
    at.setDate(at.getDate() - i - (now.getHours() < 3 ? 1 : 0));
    at.setHours(3, 0, 0, 0);
    const day = at.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { id: hex(), when: `${day} 03:00`, dest: DESTINATIONS[i % DESTINATIONS.length] };
  });
  return [
    { kind: 'cmd', text: `restic find ${shown}` },
    { kind: 'info', text: `searching ${snapshots.length} snapshots on ${DESTINATIONS.length} destinations` },
    ...snapshots.map((s): ScanLine => ({ kind: 'miss', text: `${s.id}  ${s.when.padEnd(14)}${s.dest.padEnd(12)}no match` })),
    { kind: 'warn', text: `0 of ${snapshots.length} snapshots contain ${shown}` },
    { kind: 'hint', text: HINTS[Math.floor(random() * HINTS.length)] },
  ];
}
