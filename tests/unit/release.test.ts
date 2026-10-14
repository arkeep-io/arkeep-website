import { describe, expect, it } from 'vitest';
import { getLatestRelease } from '../../src/lib/release';

const ok = (body: unknown) => (async () => new Response(JSON.stringify(body), { status: 200 })) as typeof fetch;

describe('getLatestRelease', () => {
  it('maps the GitHub payload', async () => {
    const fetchFn = ok({ tag_name: 'v0.7.0', published_at: '2026-10-01T09:00:00Z', html_url: 'https://github.com/arkeep-io/arkeep/releases/tag/v0.7.0' });
    expect(await getLatestRelease(fetchFn)).toEqual({ tag: 'v0.7.0', date: '2026-10-01', url: 'https://github.com/arkeep-io/arkeep/releases/tag/v0.7.0' });
  });
  it('returns null on a non-2xx response (rate limit)', async () => {
    const fetchFn = (async () => new Response('{}', { status: 403 })) as typeof fetch;
    expect(await getLatestRelease(fetchFn)).toBeNull();
  });
  it('returns null on a malformed payload', async () => {
    expect(await getLatestRelease(ok({ tag_name: 7 }))).toBeNull();
  });
  it('returns null when the network fails', async () => {
    const fetchFn = (async () => {
      throw new TypeError('fetch failed');
    }) as typeof fetch;
    expect(await getLatestRelease(fetchFn)).toBeNull();
  });
});
