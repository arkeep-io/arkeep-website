import { buildLog, formatBytes, snapshotId, type SourceFile } from '../lib/snapshot';

const root = document.querySelector<HTMLElement>('[data-backup]');
if (root) {
  const log = root.querySelector<HTMLPreElement>('[data-log]')!;
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  const readout = root.querySelector<HTMLElement>('[data-readout]')!;
  const run = root.querySelector<HTMLButtonElement>('[data-run]')!;
  const brk = root.querySelector<HTMLButtonElement>('[data-break]')!;
  const restore = root.querySelector<HTMLButtonElement>('[data-restore]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let saved: Map<string, string> | null = null;
  let broken: HTMLElement | null = null;
  let running = false;

  const sections = () => [...document.querySelectorAll<HTMLElement>('[data-snapshot]')];

  function setStatus(text: string, kind: 'running' | 'ok' | 'broken') {
    status.textContent = text;
    status.dataset.kind = kind;
  }

  function sync() {
    run.disabled = running || broken !== null;
    brk.disabled = running || saved === null || broken !== null;
    restore.disabled = running || broken === null;
  }

  async function stream(lines: string[]) {
    log.textContent = '';
    for (const line of lines) {
      log.textContent += `${line}\n`;
      log.scrollTop = log.scrollHeight;
      if (!reduced) await new Promise((r) => setTimeout(r, 70));
    }
  }

  run.addEventListener('click', async () => {
    running = true;
    sync();
    setStatus('Running', 'running');
    try {
      const files: SourceFile[] = sections().map((s) => ({
        path: `/arkeep.io/${s.dataset.snapshot}.html`,
        bytes: new Blob([s.innerHTML]).size,
      }));
      const id = await snapshotId(sections().map((s) => s.innerHTML));
      saved = new Map(sections().map((s) => [s.dataset.snapshot!, s.innerHTML]));
      await stream(buildLog(files, id, ['NAS (local)', 'Backblaze B2']));
      const total = files.reduce((n, f) => n + f.bytes, 0);
      readout.textContent = `Last snapshot ${id} · ${files.length} files · ${formatBytes(total)}`;
      setStatus('Succeeded', 'ok');
    } catch {
      setStatus('Failed', 'broken');
    } finally {
      running = false;
      sync();
    }
    // The pressed button was disabled while running; hand focus to the next step.
    (brk.disabled ? run : brk).focus();
  });

  brk.addEventListener('click', () => {
    const target = document.querySelector<HTMLElement>('[data-snapshot="hero"]');
    if (!target || !saved) return;
    target.style.minHeight = `${target.offsetHeight}px`; // keep the layout still while content is gone
    target.innerHTML = '<p class="missing">hero.html is gone. Restore it from the snapshot.</p>';
    broken = target;
    setStatus('Data lost', 'broken');
    log.textContent += 'rm /arkeep.io/hero.html\n';
    log.scrollTop = log.scrollHeight;
    sync();
    restore.focus();
  });

  restore.addEventListener('click', async () => {
    if (!broken || !saved) return;
    running = true;
    sync();
    const name = broken.dataset.snapshot!;
    try {
      await stream(['restoring <Snapshot> to /arkeep.io', `  /arkeep.io/${name}.html`, 'Summary: Restored 1 file']);
    } finally {
      // Whatever happens to the log, the page gets its content back.
      broken.innerHTML = saved.get(name)!;
      broken.style.minHeight = '';
      broken = null;
      setStatus('Restored', 'ok');
      running = false;
      sync();
    }
    brk.focus();
  });

  sync();
}
