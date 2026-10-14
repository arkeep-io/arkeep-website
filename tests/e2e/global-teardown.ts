import { execSync } from 'node:child_process';

export default async function globalTeardown() {
  execSync('pnpm astro preview stop', { stdio: 'ignore' });
}
