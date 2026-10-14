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
    command: `curl -O ${RAW}/docker-compose.all.yml\ndocker compose -f docker-compose.all.yml up -d`,
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
    command: 'git clone https://github.com/arkeep-io/arkeep.git && cd arkeep\nhelm install arkeep ./deploy/helm/arkeep -f my-values.yaml',
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
