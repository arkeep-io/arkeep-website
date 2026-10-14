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
