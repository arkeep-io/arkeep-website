// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { externalLinks } from './src/lib/external-links.mjs';

export default defineConfig({
  site: 'https://arkeep.io',
  trailingSlash: 'always',
  markdown: { processor: satteri({ hastPlugins: [externalLinks] }) },
  integrations: [
    sitemap(),
    starlight({
      title: 'Arkeep',
      // The site's own 404 (src/pages/404.astro) keeps the marketing nav for every missing URL.
      disable404Route: true,
      logo: { src: './src/assets/arkeep-mark.png', alt: 'Arkeep' },
      favicon: '/favicon.ico',
      head: [{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } }],
      customCss: ['./src/styles/fonts.css', './src/styles/tokens.css', './src/styles/starlight.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/arkeep-io/arkeep' }],
      editLink: { baseUrl: 'https://github.com/arkeep-io/arkeep-website/edit/develop/' },
      components: {
        Header: './src/components/starlight/Header.astro',
        EditLink: './src/components/starlight/EditLink.astro',
        SocialIcons: './src/components/starlight/SocialIcons.astro',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Introduction', slug: 'docs' },
            { label: 'Quickstart', slug: 'docs/quickstart' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'How backups work', slug: 'docs/concepts/how-backups-work' },
            { label: 'Architecture', slug: 'docs/concepts/architecture' },
            { label: 'Security model', slug: 'docs/concepts/security' },
          ],
        },
        {
          label: 'Installation',
          items: [
            { label: 'Docker Compose', slug: 'docs/installation/docker-compose' },
            { label: 'Standalone binary', slug: 'docs/installation/binary' },
            { label: 'Kubernetes (Helm)', slug: 'docs/installation/kubernetes' },
            { label: 'Agent via systemd', slug: 'docs/installation/agent-systemd' },
            { label: 'Reverse proxy and TLS', slug: 'docs/installation/reverse-proxy-tls' },
            { label: 'Upgrading', slug: 'docs/installation/upgrading' },
            { label: 'Backing up Arkeep itself', slug: 'docs/installation/backing-up-arkeep' },
          ],
        },
        {
          label: 'Using Arkeep',
          items: [
            { label: 'Agents', slug: 'docs/guides/agents' },
            { label: 'Destinations', slug: 'docs/guides/destinations' },
            { label: 'Retention and integrity checks', slug: 'docs/guides/retention-and-checks' },
            { label: 'Policies', slug: 'docs/guides/policies' },
            { label: 'Backing up databases', slug: 'docs/guides/databases' },
            { label: 'Docker volumes', slug: 'docs/guides/docker-volumes' },
            { label: 'Jobs', slug: 'docs/guides/jobs' },
            { label: 'Snapshots and restore', slug: 'docs/guides/snapshots-and-restore' },
            { label: 'Importing and syncing snapshots', slug: 'docs/guides/importing-and-sync' },
            { label: 'Users, roles and 2FA', slug: 'docs/guides/users-and-2fa' },
            { label: 'Single sign-on (OIDC)', slug: 'docs/guides/oidc' },
            { label: 'Notifications', slug: 'docs/guides/notifications' },
            { label: 'Healthchecks.io', slug: 'docs/guides/healthchecks' },
            { label: 'Settings', slug: 'docs/guides/settings' },
            { label: 'Audit log', slug: 'docs/guides/audit-log' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Server configuration', slug: 'docs/reference/server-config' },
            { label: 'Agent configuration', slug: 'docs/reference/agent-config' },
            { label: 'Health and metrics', slug: 'docs/reference/health-and-metrics' },
            { label: 'Webhook events', slug: 'docs/reference/webhook-events' },
            { label: 'Telemetry', slug: 'docs/reference/telemetry' },
            { label: 'FAQ', slug: 'docs/reference/faq' },
          ],
        },
        {
          label: 'Contributing',
          collapsed: true,
          items: [
            { label: 'Contributing', slug: 'docs/contributing' },
            { label: 'Development setup', slug: 'docs/contributing/development' },
            { label: 'Project structure', slug: 'docs/contributing/project-structure' },
            { label: 'Support Arkeep', slug: 'docs/contributing/support' },
          ],
        },
      ],
    }),
  ],
});
