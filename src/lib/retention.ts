export interface RetentionPolicy {
  last: number;
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export function isoWeek(d: Date): number {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day); // the Thursday of this week decides the ISO year
  const yearStart = Date.UTC(t.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((t.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return t.getUTCFullYear() * 100 + week;
}

export function timeline(end: Date, days: number, everyHours: number): Date[] {
  const count = Math.floor((days * 24) / everyHours);
  return Array.from({ length: count }, (_, i) => new Date(end.getTime() - (count - 1 - i) * everyHours * 3_600_000));
}

export function clampKeep(v: unknown): number {
  const n = Math.trunc(Number(v));
  if (!Number.isFinite(n)) return 0;
  return Math.min(999, Math.max(0, n));
}

type Bucket = { count: number; key: (d: Date, nr: number) => number; last: number | null };

// Mirrors restic's ApplyPolicy: newest first, a snapshot is kept when it opens a new bucket
// for any rule that still has budget; a rule with budget left also keeps the oldest snapshot,
// to maximise the history kept. An all-zero policy keeps everything.
export function applyRetention(times: Date[], p: RetentionPolicy): boolean[] {
  if (Object.values(p).every((n) => n === 0)) return times.map(() => true);
  const keep = times.map(() => false);
  const buckets: Bucket[] = [
    { count: p.last, key: (_d, nr) => nr, last: null },
    { count: p.hourly, key: (d) => d.getUTCFullYear() * 1e6 + (d.getUTCMonth() + 1) * 1e4 + d.getUTCDate() * 100 + d.getUTCHours(), last: null },
    { count: p.daily, key: (d) => d.getUTCFullYear() * 1e4 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate(), last: null },
    { count: p.weekly, key: (d) => isoWeek(d), last: null },
    { count: p.monthly, key: (d) => d.getUTCFullYear() * 100 + d.getUTCMonth() + 1, last: null },
    { count: p.yearly, key: (d) => d.getUTCFullYear(), last: null },
  ];
  const order = times.map((d, i) => [d, i] as const).sort((a, b) => b[0].getTime() - a[0].getTime());
  order.forEach(([d, i], nr) => {
    for (const b of buckets) {
      if (b.count <= 0) continue;
      const k = b.key(d, nr);
      if (k !== b.last || nr === order.length - 1) {
        keep[i] = true;
        b.last = k;
        b.count--;
      }
    }
  });
  return keep;
}

export const DESTINATION_PRESETS = {
  nas: { label: 'NAS (local)', policy: { last: 4, hourly: 0, daily: 7, weekly: 4, monthly: 0, yearly: 0 } },
  b2: { label: 'Backblaze B2', policy: { last: 0, hourly: 0, daily: 14, weekly: 0, monthly: 0, yearly: 0 } },
  sftp: { label: 'SFTP offsite', policy: { last: 1, hourly: 0, daily: 0, weekly: 4, monthly: 0, yearly: 0 } },
} satisfies Record<string, { label: string; policy: RetentionPolicy }>;

export type DestinationKey = keyof typeof DESTINATION_PRESETS;
