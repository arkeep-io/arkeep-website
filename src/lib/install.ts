export interface InstallTarget {
  id: 'docker' | 'linux' | 'kubernetes' | 'board';
  label: string;
  href: string;
  command: string;
}

const RAW = 'https://raw.githubusercontent.com/arkeep-io/arkeep/main/deploy/docker';
const DL = 'https://github.com/arkeep-io/arkeep/releases/latest/download';

export const installTargets: InstallTarget[] = [
  {
    id: 'docker',
    label: 'Docker host',
    href: '/docs/installation/docker-compose/',
    command: [
      `curl -O ${RAW}/docker-compose.all.yml`,
      `curl -o .env ${RAW}/.env.example`,
      'sed -i "s|^ARKEEP_SECRET_KEY=.*|ARKEEP_SECRET_KEY=$(openssl rand -hex 32)|" .env',
      'sed -i "s|^ARKEEP_AGENT_SECRET=.*|ARKEEP_AGENT_SECRET=$(openssl rand -hex 24)|" .env',
      'docker compose -f docker-compose.all.yml up -d',
    ].join('\n'),
  },
  {
    id: 'linux',
    label: 'Linux server',
    href: '/docs/installation/binary/',
    command: `curl -L ${DL}/arkeep-server_linux_amd64.tar.gz | tar xz`,
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes cluster',
    href: '/docs/installation/kubernetes/',
    command: 'helm install arkeep oci://ghcr.io/arkeep-io/charts/arkeep -f my-values.yaml',
  },
  {
    id: 'board',
    label: 'ARM board',
    href: '/docs/installation/agent-systemd/',
    command: `curl -L ${DL}/arkeep-agent_linux_arm.tar.gz | tar xz`,
  },
];

export function getInstallTarget(id: string): InstallTarget {
  return installTargets.find((t) => t.id === id) ?? installTargets[0];
}
