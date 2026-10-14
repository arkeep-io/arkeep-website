import { describe, expect, it } from 'vitest';
import { applyRetention, clampKeep, isoWeek, timeline, type RetentionPolicy } from '../../src/lib/retention';

const none: RetentionPolicy = { last: 0, hourly: 0, daily: 0, weekly: 0, monthly: 0, yearly: 0 };
const at = (s: string) => new Date(s);

describe('isoWeek', () => {
  it('handles the ISO year boundary', () => {
    expect(isoWeek(at('2021-01-03T12:00:00Z'))).toBe(202053);
    expect(isoWeek(at('2021-01-04T12:00:00Z'))).toBe(202101);
  });
});

describe('timeline', () => {
  it('produces days*24/every dates, oldest first, ending at end', () => {
    const t = timeline(at('2026-10-14T18:00:00Z'), 30, 6);
    expect(t).toHaveLength(120);
    expect(t[119].toISOString()).toBe('2026-10-14T18:00:00.000Z');
    expect(t[0] < t[1]).toBe(true);
  });
});

describe('applyRetention', () => {
  const t = timeline(at('2026-10-14T18:00:00Z'), 3, 6); // 12 snapshots, 4 per day

  it('keeps everything when every rule is zero (retention off)', () => {
    expect(applyRetention(t, none).every(Boolean)).toBe(true);
  });

  it('keep-last keeps the newest N', () => {
    const keep = applyRetention(t, { ...none, last: 3 });
    expect(keep.filter(Boolean)).toHaveLength(3);
    expect(keep.slice(-3)).toEqual([true, true, true]);
  });

  it('keep-daily keeps the newest snapshot of each of the last N days', () => {
    const keep = applyRetention(t, { ...none, daily: 2 });
    const kept = t.filter((_, i) => keep[i]).map((d) => d.toISOString());
    expect(kept).toEqual(['2026-10-13T18:00:00.000Z', '2026-10-14T18:00:00.000Z']);
  });

  it('a snapshot matching two rules is kept once and counts for both', () => {
    const keep = applyRetention(t, { ...none, last: 1, daily: 1 });
    expect(keep.filter(Boolean)).toHaveLength(1);
  });

  it('does not depend on input order', () => {
    const shuffled = [...t].reverse();
    const keep = applyRetention(shuffled, { ...none, daily: 2 });
    expect(
      shuffled
        .filter((_, i) => keep[i])
        .map((d) => d.toISOString())
        .sort(),
    ).toEqual(['2026-10-13T18:00:00.000Z', '2026-10-14T18:00:00.000Z']);
  });

  it('a rule with budget left also keeps the oldest snapshot, as restic does', () => {
    const month = timeline(at('2026-10-14T18:00:00Z'), 30, 6); // spans Sep 15 – Oct 14
    const keep = applyRetention(month, { ...none, monthly: 3 });
    expect(keep.filter(Boolean)).toHaveLength(3);
    expect(keep[0]).toBe(true);
  });

  it('huge counts keep everything without error', () => {
    expect(applyRetention(t, { ...none, hourly: 999 }).every(Boolean)).toBe(true);
  });
});

describe('clampKeep', () => {
  it.each([
    [5, 5],
    [-3, 0],
    [1000, 999],
    ['7', 7],
    ['abc', 0],
    [2.7, 2],
    [NaN, 0],
  ])('%s → %i', (v, n) => expect(clampKeep(v)).toBe(n));
});
