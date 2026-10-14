// Build-time (and dev-server) access to GitHub data. Nav, hero and footer all ask for it on every
// render, so one fetch is shared per process for ten minutes; GitHub allows 60 unauthenticated
// requests an hour per IP. Set GITHUB_TOKEN (CI) to lift that to 5000. Never imported by browser code.
import { getLatestRelease, getRepoStars, type Release } from './release';

const TTL = 10 * 60 * 1000;
const token = process.env.GITHUB_TOKEN;
const authFetch: typeof fetch = (input, init) =>
  fetch(input, token ? { ...init, headers: { ...init?.headers, Authorization: `Bearer ${token}` } } : init);

function shared<T>(load: () => Promise<T>): () => Promise<T> {
  let value: Promise<T> | null = null;
  let at = 0;
  return () => {
    if (!value || Date.now() - at > TTL) {
      at = Date.now();
      value = load();
    }
    return value;
  };
}

export const latestRelease: () => Promise<Release | null> = shared(() => getLatestRelease(authFetch));
export const repoStars: () => Promise<number | null> = shared(() => getRepoStars(authFetch));
