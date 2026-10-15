export const GITHUB_URL = 'https://github.com/arkeep-io/arkeep';
export const RELEASES_URL = `${GITHUB_URL}/releases`;
export const DISCUSSIONS_URL = `${GITHUB_URL}/discussions`;
export const ISSUES_URL = `${GITHUB_URL}/issues`;
export const SPONSORS_URL = 'https://github.com/sponsors/arkeep-io';
export const DOCKER_HUB_URL = 'https://hub.docker.com/repositories/arkeepio';
export const GET_STARTED_URL = '/docs/installation/docker-compose/';

export const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Roadmap', href: '/#roadmap' },
  { label: 'Docs', href: '/docs/' },
  { label: 'GitHub', href: GITHUB_URL },
];

// External links open in a new tab everywhere. From marketing pages, links into the docs do too
// (and show NewTabIcon); inside the docs they stay in the same tab.
export const isExternal = (href: string) => /^https?:\/\//.test(href);
export const isDocs = (href: string) => href.startsWith('/docs');
// A fresh object per call: Astro writes its scoped class onto spread props, so a shared object would
// collect every component's class and leak it onto later links.
export const newTab = () => ({ target: '_blank', rel: 'noopener noreferrer' }) as const;
export const tabAttrs = (href: string) => (isExternal(href) || isDocs(href) ? newTab() : {});
