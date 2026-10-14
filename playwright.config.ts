import { defineConfig, devices } from '@playwright/test';

// Astro 7's `astro preview` detaches when not attached to a TTY, so Playwright's
// webServer would see it "exit early". Global setup builds and starts it with
// --background instead; teardown stops it.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  globalSetup: './tests/e2e/global-setup.ts',
  globalTeardown: './tests/e2e/global-teardown.ts',
  // A dedicated port, so tests never hit a running `astro dev` on 4321.
  use: { baseURL: 'http://localhost:4399' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
});
