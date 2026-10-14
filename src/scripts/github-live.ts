// Release tag and star count are baked in at build time; on page load the browser asks the GitHub API
// for fresh values. The last good answer is kept for five minutes so quick reloads do not spend the
// unauthenticated limit (60 requests an hour per IP), and it stands in when the API refuses.
import { formatStars, getLatestRelease, getRepoStars, type Release } from '../lib/release';

const KEY = 'arkeep:github';
const FRESH = 5 * 60 * 1000;
interface Cached {
  at: number;
  stars: number | null;
  release: Release | null;
}

function read(): Cached | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? 'null');
  } catch {
    return null;
  }
}
function write(c: Cached) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* storage blocked: values just are not cached */
  }
}

const all = <T extends Element>(sel: string) => [...document.querySelectorAll<T>(sel)];

function showStars(stars: number) {
  for (const el of all<HTMLElement>('[data-gh-stars]')) el.textContent = formatStars(stars);
  for (const el of all<HTMLElement>('[data-gh-stars-label]')) {
    el.setAttribute('aria-label', `Arkeep on GitHub, ${stars.toLocaleString('en')} stars`);
  }
}

function showRelease(release: Release) {
  const date = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${release.date}T00:00:00Z`));
  for (const el of all<HTMLAnchorElement>('[data-gh-release-link]')) el.href = release.url;
  for (const el of all<HTMLElement>('[data-gh-release-tag]')) el.textContent = release.tag;
  for (const el of all<HTMLElement>('[data-gh-release-label]')) el.textContent = 'Latest release';
  for (const el of all<HTMLTimeElement>('[data-gh-release-date]')) {
    el.dateTime = release.date;
    el.textContent = date;
  }
}

const cached = read();
if (cached?.stars != null) showStars(cached.stars);
if (cached?.release) showRelease(cached.release);

if (!cached || Date.now() - cached.at > FRESH) {
  void Promise.all([getRepoStars(), getLatestRelease()]).then(([stars, release]) => {
    if (stars !== null) showStars(stars);
    if (release) showRelease(release);
    // Keep the last good values when one request fails.
    write({ at: Date.now(), stars: stars ?? cached?.stars ?? null, release: release ?? cached?.release ?? null });
  });
}
