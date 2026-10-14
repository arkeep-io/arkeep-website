import type { Destination, SourceFile } from './snapshot';

// The hero's demo policy backs up this page to two destinations.
export const HERO_DESTINATIONS: Destination[] = [
  { name: 'NAS (local)', type: 'local' },
  { name: 'Backblaze B2', type: 's3' },
];

// Static completed run, shown before any interaction and when JS is off. With JS the sizes are
// measured from the real sections marked [data-snapshot].
export const STATIC_ID = 'a3f9c1d2';
export const STATIC_FILES: SourceFile[] = [
  { path: '/arkeep.io/hero.html', bytes: 3_412 },
  { path: '/arkeep.io/how-it-works.html', bytes: 6_215 },
  { path: '/arkeep.io/retention.html', bytes: 9_870 },
  { path: '/arkeep.io/features.html', bytes: 8_904 },
  { path: '/arkeep.io/roadmap.html', bytes: 7_480 },
  { path: '/arkeep.io/install.html', bytes: 2_391 },
];
