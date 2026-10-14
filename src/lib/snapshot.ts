export interface SourceFile {
  path: string;
  bytes: number;
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

const pad = (n: number) => String(n).padStart(5, ' ');

// Lines shaped like restic's backup output, once per destination.
export function buildLog(files: SourceFile[], id: string, destinations: string[]): string[] {
  const total = files.reduce((sum, f) => sum + f.bytes, 0);
  const lines: string[] = [];
  for (const dest of destinations) {
    lines.push(`[${dest}] open repository`);
    lines.push('using parent snapshot none');
    for (const f of files) lines.push(`  ${f.path}  ${formatBytes(f.bytes)}`);
    lines.push(`Files:       ${pad(files.length)} new, ${pad(0)} changed, ${pad(0)} unmodified`);
    lines.push(`Added to the repository: ${formatBytes(total)}`);
    lines.push(`snapshot ${id} saved`);
  }
  return lines;
}
