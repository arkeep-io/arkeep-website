// Release tag and star count are baked in at build time; on each page load the visitor's browser asks
// the GitHub API for fresh values (GitHub caches them for about a minute). Any failure, such as the
// unauthenticated rate limit of 60 requests an hour per IP, keeps the built values.
import { formatStars, getLatestRelease, getRepoStars } from '../lib/release';

const all = <T extends Element>(sel: string) => [...document.querySelectorAll<T>(sel)];

void getRepoStars().then((stars) => {
  if (stars === null) return;
  for (const el of all<HTMLElement>('[data-gh-stars]')) el.textContent = formatStars(stars);
  for (const el of all<HTMLElement>('[data-gh-stars-label]')) {
    el.setAttribute('aria-label', `Arkeep on GitHub, ${stars.toLocaleString('en')} stars`);
  }
});

void getLatestRelease().then((release) => {
  if (!release) return;
  const date = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${release.date}T00:00:00Z`));
  for (const el of all<HTMLAnchorElement>('[data-gh-release-link]')) el.href = release.url;
  for (const el of all<HTMLElement>('[data-gh-release-tag]')) el.textContent = release.tag;
  for (const el of all<HTMLElement>('[data-gh-release-label]')) el.textContent = 'Latest release';
  for (const el of all<HTMLTimeElement>('[data-gh-release-date]')) {
    el.dateTime = release.date;
    el.textContent = date;
  }
});
