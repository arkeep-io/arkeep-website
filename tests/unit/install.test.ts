import { describe, expect, it } from 'vitest';
import { getInstallTarget, installTargets } from '../../src/lib/install';

describe('install targets', () => {
  it('every target points at a docs install page', () => {
    for (const t of installTargets) expect(t.href).toMatch(/^\/docs\/installation\/[a-z-]+\/$/);
  });
  it('the ARM target downloads the real linux_arm agent asset', () => {
    expect(getInstallTarget('board').command).toContain('arkeep-agent_linux_arm.tar.gz');
  });
  it('the Kubernetes command works from scratch (clones the chart first)', () => {
    expect(getInstallTarget('kubernetes').command).toMatch(/^git clone https:\/\/github\.com\/arkeep-io\/arkeep\.git/);
  });
  it('the board option names only the architecture its command downloads', () => {
    const board = getInstallTarget('board');
    expect(board.label).not.toMatch(/MIPS/);
  });
  it('unknown ids fall back to Docker', () => {
    expect(getInstallTarget('nope').id).toBe('docker');
  });
});
