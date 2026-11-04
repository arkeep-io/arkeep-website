// The full roadmap. The arkeep README keeps a one-line summary per version: update it when a theme changes.
export interface RoadmapVersion {
  id: string;
  version: string;
  theme: string;
  summary?: string;
  items: { text: string; done: boolean }[];
}

export const roadmap: RoadmapVersion[] = [
  {
    id: 'v1-0',
    version: 'v1.0',
    theme: 'Production-ready core',
    items: [
      { text: 'Restore: browse, download, restore in place or elsewhere', done: true },
      { text: 'Automated restore test: restore a snapshot to a scratch location and verify it', done: false },
      { text: 'Helm chart', done: true },
      { text: 'Comprehensive test coverage (server + agent + GUI)', done: false },
      { text: 'Full documentation site', done: true },
    ],
  },
  {
    id: 'v1-x',
    version: 'v1.x',
    theme: 'Inventory',
    summary: 'Central visibility across your entire infrastructure (containers, VMs, bare metal) from a single dashboard.',
    items: [
      { text: 'Host inventory: OS, kernel version, uptime, reboot-pending status', done: false },
      { text: 'Docker inventory: running containers, images, tags, digests, exposed ports, volume coverage', done: false },
      { text: 'VM inventory: Proxmox VM and LXC status, resource usage', done: false },
      { text: 'Backup coverage map: which hosts and volumes have an active, recently verified policy', done: false },
    ],
  },
  {
    id: 'v2-0',
    version: 'v2.0',
    theme: 'Update orchestration',
    summary: 'Safe, recoverable updates for containers and hosts, with backup verification built into every step.',
    items: [
      { text: 'Docker update detection: current vs latest digest, outdated tag warnings (latest, unversioned)', done: false },
      { text: 'OS package update detection: pending updates per host, reboot-required flags', done: false },
      { text: 'Pre-update backup gate: updates blocked or warned if no recent verified backup exists', done: false },
      { text: 'One-click Docker updates with automatic rollback on failed health check', done: false },
      { text: 'Proxmox VM and LXC updates', done: false },
      { text: 'Audit log for every update operation', done: false },
    ],
  },
  {
    id: 'v2-x',
    version: 'v2.x',
    theme: 'Intelligence',
    items: [
      { text: 'CVE correlation: known vulnerabilities mapped to your running containers and packages', done: false },
      { text: 'AI advisor: weekly infrastructure reports, CVE triage, update risk summaries, runbook generation', done: false },
      { text: 'Bandwidth throttling', done: false },
      { text: 'BYOK encryption key management', done: false },
    ],
  },
];
