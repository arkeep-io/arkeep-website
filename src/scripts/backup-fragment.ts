import { backupLog, clock, formatBytes, restoreLog, snapshotId, totalBytes, type LogLine, type SourceFile } from '../lib/snapshot';
import { HERO_DESTINATIONS } from '../lib/hero-job';

const app = document.querySelector<HTMLElement>('[data-backup]');
const tryBox = document.querySelector<HTMLElement>('[data-try]');
if (app && tryBox) {
  const log = app.querySelector<HTMLElement>('[data-log]')!;
  const status = app.querySelector<HTMLElement>('[data-status]')!;
  const statusText = app.querySelector<HTMLElement>('[data-status-text]')!;
  const readout = app.querySelector<HTMLElement>('[data-readout]')!;
  const jobId = app.querySelector<HTMLElement>('[data-job-id]')!;
  const rows = [...app.querySelectorAll<HTMLTableRowElement>('[data-dest]')];
  const run = tryBox.querySelector<HTMLButtonElement>('[data-run]')!;
  const brk = tryBox.querySelector<HTMLButtonElement>('[data-break]')!;
  const note = tryBox.querySelector<HTMLElement>('[data-try-note]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms: number) => (reduced ? Promise.resolve() : new Promise((r) => setTimeout(r, ms)));

  type Kind = 'ok' | 'running' | 'pending' | 'broken';
  const ICONS: Record<Kind, string> = {
    ok: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    running: '<path d="M21 12a9 9 0 1 1-6.22-8.56"/>',
    pending: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    broken: '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/>',
  };
  const pill = (el: HTMLElement, kind: Kind, text: string) => {
    el.dataset.kind = kind;
    el.querySelector('svg')!.innerHTML = ICONS[kind];
    (el.querySelector('[data-status-text]') ?? el.querySelector('span'))!.textContent = text;
  };

  let saved: { id: string; html: Map<string, string> } | null = null;
  let broken: HTMLElement | null = null;
  let busy = false;
  const sections = () => [...document.querySelectorAll<HTMLElement>('[data-snapshot]')];

  function sync() {
    run.disabled = busy || broken !== null;
    brk.disabled = busy || saved === null || broken !== null;
  }

  function append(lines: LogLine[]) {
    const now = clock(new Date());
    for (const l of lines) {
      const p = document.createElement('p');
      for (const [cls, text] of [['t', now], ['lvl', l.level], ['msg', l.msg]]) {
        const s = document.createElement('span');
        s.className = cls;
        s.textContent = text;
        p.append(s);
      }
      log.append(p);
    }
    log.scrollTop = log.scrollHeight;
  }

  run.addEventListener('click', async () => {
    busy = true;
    sync();
    pill(status, 'running', 'Running');
    statusText.textContent = 'Running';
    note.textContent = 'Backing up this page…';
    log.replaceChildren();
    try {
      const files: SourceFile[] = sections().map((s) => ({
        path: `/arkeep.io/${s.dataset.snapshot}.html`,
        bytes: new Blob([s.innerHTML]).size,
      }));
      const id = await snapshotId(sections().map((s) => s.innerHTML));
      const html = new Map(sections().map((s) => [s.dataset.snapshot!, s.innerHTML]));
      const added = formatBytes(totalBytes(files));
      jobId.textContent = `01a13a2f-5c0e-7d41-9b2e-${id}0000`;
      rows.forEach((r) => {
        pill(r.querySelector('.pill')!, 'pending', 'Pending');
        r.querySelector('[data-added]')!.textContent = '—';
        r.querySelector('[data-duration]')!.textContent = '—';
      });

      const [start, ...rest] = backupLog(files, id, HERO_DESTINATIONS);
      append(start);
      await wait(500);
      for (const [i, row] of rows.entries()) {
        const [begin, done] = rest[i];
        pill(row.querySelector('.pill')!, 'running', 'Running');
        append([begin]);
        await wait(900 + i * 300);
        pill(row.querySelector('.pill')!, 'ok', 'Succeeded');
        row.querySelector('[data-added]')!.textContent = added;
        row.querySelector('[data-duration]')!.textContent = `${1 + i}s`;
        append([done]);
      }
      append(rest.at(-1)!);
      saved = { id, html };
      dispatchEvent(new CustomEvent('arkeep:backup'));
      readout.textContent = `${id} · ${files.length} files · ${added}`;
      pill(status, 'ok', 'Succeeded');
      note.textContent = `Snapshot ${id} saved to both destinations. Now break something.`;
    } catch {
      pill(status, 'broken', 'Failed');
      note.textContent = 'The backup failed. Try again.';
    } finally {
      busy = false;
      sync();
    }
    // The pressed button was disabled while running; hand focus to the next step.
    (brk.disabled ? run : brk).focus();
  });

  // The headline sits above the devices, usually off screen by now: bring it into view so the visitor
  // sees it go, and offer the way back right inside the gap it leaves.
  const reveal = (el: HTMLElement) => el.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });

  brk.addEventListener('click', () => {
    const target = document.querySelector<HTMLElement>('[data-snapshot="hero"]');
    if (!target || !saved) return;
    target.style.minHeight = `${target.offsetHeight}px`; // keep the layout still while content is gone
    const gap = document.createElement('div');
    gap.className = 'missing';
    const msg = document.createElement('p');
    msg.textContent = 'hero.html is gone.';
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'button';
    back.textContent = `Restore from snapshot ${saved.id}`;
    back.addEventListener('click', () => void doRestore());
    gap.append(msg, back);
    target.replaceChildren(gap);
    broken = target;
    pill(status, 'broken', 'Data lost');
    append([{ level: 'WARN', msg: '/arkeep.io/hero.html deleted on web-01' }]);
    note.textContent = 'The headline is gone. Restore it from the snapshot.';
    sync();
    reveal(target);
    back.focus({ preventScroll: true });
  });

  async function doRestore() {
    if (!broken || !saved || busy) return;
    busy = true;
    sync();
    const target = broken;
    const name = target.dataset.snapshot!;
    pill(status, 'running', 'Restoring');
    target.querySelector<HTMLButtonElement>('.missing .button')?.setAttribute('disabled', '');
    reveal(target);
    try {
      for (const line of restoreLog(saved.id)) {
        append([line]);
        await wait(350);
      }
    } finally {
      // Whatever happens to the log, the page gets its content back.
      target.innerHTML = saved.html.get(name)!;
      target.style.minHeight = '';
      broken = null;
      pill(status, 'ok', 'Restored');
      note.textContent = `Restored from snapshot ${saved.id}. That’s the whole point.`;
      busy = false;
      sync();
      const box = target.querySelector('h1')?.getBoundingClientRect();
      if (box) dispatchEvent(new CustomEvent('arkeep:restore', { detail: { x: box.left + box.width / 2, y: box.top + box.height / 2 } }));
    }
    brk.focus({ preventScroll: true });
  }

  sync();
}
