import { describe, expect, it } from 'vitest';
import { getInstallTarget, installTargets } from '../../src/lib/install';

describe('install targets', () => {
  it('every target points at a docs install page', () => {
    for (const t of installTargets) expect(t.href).toMatch(/^\/docs\/installation\/[a-z-]+\/$/);
  });
  it('the ARM target downloads the real linux_arm agent asset', () => {
    expect(getInstallTarget('board').command).toContain('arkeep-agent_linux_arm.tar.gz');
  });
  it('the Kubernetes command installs the published OCI chart, no clone', () => {
    const command = getInstallTarget('kubernetes').command;
    expect(command).toMatch(/^helm install arkeep oci:\/\/ghcr\.io\/arkeep-io\/charts\/arkeep /);
    expect(command).not.toContain('git clone');
  });
  it('the board option names only the architecture its command downloads', () => {
    const board = getInstallTarget('board');
    expect(board.label).not.toMatch(/MIPS/);
  });
  it('the Docker command sets both required secrets before starting', () => {
    const lines = getInstallTarget('docker').command.split('\n');
    const up = lines.findIndex((l) => l.startsWith('docker compose'));
    expect(lines.slice(0, up).join('\n')).toMatch(/ARKEEP_SECRET_KEY=\$\(openssl rand -hex 32\)/);
    expect(lines.slice(0, up).join('\n')).toMatch(/ARKEEP_AGENT_SECRET=\$\(openssl rand -hex 24\)/);
  });
  it('unknown ids fall back to Docker', () => {
    expect(getInstallTarget('nope').id).toBe('docker');
  });
});
