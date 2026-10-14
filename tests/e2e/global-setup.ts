import { execSync } from 'node:child_process';

export default async function globalSetup() {
  if (!process.env.SKIP_BUILD) execSync('pnpm build', { stdio: 'inherit' });
  execSync('pnpm astro preview stop', { stdio: 'ignore' });
  execSync('pnpm astro preview --port 4399 --background', { stdio: 'inherit' });
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch('http://localhost:4399/')).ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('preview server did not start on :4399');
}
