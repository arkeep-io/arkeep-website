export interface Release {
  tag: string;
  date: string;
  url: string;
}

const LATEST = 'https://api.github.com/repos/arkeep-io/arkeep/releases/latest';

// Called at build time; any failure (offline, rate limit, odd payload) yields null
// so the footer falls back to a plain "all releases" link instead of breaking the build.
export async function getLatestRelease(fetchFn: typeof fetch = fetch): Promise<Release | null> {
  try {
    const res = await fetchFn(LATEST, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data?.tag_name !== 'string' || typeof data?.published_at !== 'string' || typeof data?.html_url !== 'string') {
      return null;
    }
    return { tag: data.tag_name, date: data.published_at.slice(0, 10), url: data.html_url };
  } catch {
    return null;
  }
}

const REPO = 'https://api.github.com/repos/arkeep-io/arkeep';

// Star count at build time, for the nav and footer. Same contract as above: null on any failure.
export async function getRepoStars(fetchFn: typeof fetch = fetch): Promise<number | null> {
  try {
    const res = await fetchFn(REPO, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.stargazers_count === 'number' ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

/** GitHub-style short count: 950 → "950", 1234 → "1.2k", 15300 → "15.3k". */
export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return `${k >= 100 ? Math.round(k) : Number(k.toFixed(1))}k`;
}
