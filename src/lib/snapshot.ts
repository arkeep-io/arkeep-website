export interface SourceFile {
  path: string;
  bytes: number;
}

export interface Destination {
  name: string;
  type: string;
}

/** One line of the job log, shaped like the GUI's Logs panel on the job detail page. */
export interface LogLine {
  level: 'INFO' | 'WARN';
  msg: string;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MiB`;
}

// Restic shows the first 8 hex chars of a SHA-256 snapshot id; we hash what we "backed up".
// crypto.subtle only exists in secure contexts; plain-http previews fall back to FNV-1a.
export async function snapshotId(parts: string[]): Promise<string> {
  const data = new TextEncoder().encode(parts.join('\u0000'));
  if (globalThis.crypto?.subtle) {
    const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
    return Array.from(digest.slice(0, 4), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 0x811c9dc5;
  for (const byte of data) h = Math.imul(h ^ byte, 0x01000193);
  return (h >>> 0).toString(16).padStart(8, '0');
}

export const totalBytes = (files: SourceFile[]) => files.reduce((sum, f) => sum + f.bytes, 0);

/** The log of a backup job, one block per destination, in the agent's own wording. */
export function backupLog(files: SourceFile[], id: string, destinations: Destination[]): LogLine[][] {
  const added = totalBytes(files);
  const start: LogLine[] = [
    { level: 'INFO', msg: 'backup started' },
    { level: 'INFO', msg: `resolved ${files.length} source(s), 0 command source(s)` },
  ];
  const perDest = destinations.map((d): LogLine[] => [
    { level: 'INFO', msg: `backing up to destination ${d.name} (type: ${d.type})` },
    { level: 'INFO', msg: `backup to destination ${d.name} completed (snapshot: ${id}, added: ${added} bytes)` },
  ]);
  return [start, ...perDest, [{ level: 'INFO', msg: 'backup completed successfully' }]];
}

/** The two lines the agent logs for a restore, to the GUI's default custom path. */
export function restoreLog(id: string, target = '/tmp/arkeep-restore'): LogLine[] {
  return [
    { level: 'INFO', msg: `restore started: snapshot ${id} → ${target}` },
    { level: 'INFO', msg: `restore completed successfully: files written to ${target}` },
  ];
}

/** 12-hour clock like the GUI: "11:54:50 AM", in the visitor's time zone unless one is given. */
export function clock(d: Date, timeZone?: string): string {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true, timeZone });
}
