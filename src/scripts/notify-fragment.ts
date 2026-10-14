// Loops two runs while on screen: one succeeds, one fails. Each ends in a notification whose channels
// are marked sent one by one. Reduced motion keeps the static panel rendered by the server.
interface Run {
  policy: string;
  host: string;
  mib: number;
  failAt?: number;
  error?: string;
}
const RUNS: Run[] = [
  { policy: 'Postgres', host: 'db-01', mib: 18 },
  { policy: 'Web server', host: 'web-01', mib: 42, failAt: 0.63, error: 'repository is already locked' },
];
const CHANNELS = ['Email', 'Webhook', 'Healthchecks.io'];
const TIMES = ['just now', '6 min ago', '1 h ago'];

const root = document.querySelector<HTMLElement>('[data-notify]');
if (root && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const name = root.querySelector<HTMLElement>('[data-run-name]')!;
  const state = root.querySelector<HTMLElement>('[data-run-state]')!;
  const bar = root.querySelector<HTMLElement>('[data-bar]')!;
  const list = root.querySelector<HTMLElement>('[data-events]')!;
  const unread = root.querySelector<HTMLElement>('[data-unread]')!;
  let visible = false;
  let started = false;

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const untilVisible = async () => {
    while (!visible) await sleep(250);
  };
  const el = (tag: string, cls: string, text = '') => Object.assign(document.createElement(tag), { className: cls, textContent: text });

  function setRun(run: Run) {
    name.replaceChildren(run.policy, el('span', '', ` on ${run.host}`));
  }

  function notification(run: Run): HTMLElement[] {
    const ok = !run.failAt;
    const li = el('li', 'item enter');
    li.dataset.kind = ok ? 'ok' : 'bad';
    const body = el('div', 'body');
    const meta = el('p', 'meta');
    meta.append(el('span', 'time', TIMES[0]));
    const pills = CHANNELS.map((c) => el('span', 'sent', c));
    meta.append(...pills);
    body.append(
      el('p', 'title', ok ? `Backup completed: ${run.policy}` : `Backup failed: ${run.policy}`),
      el('p', 'text', ok ? `Policy “${run.policy}” completed successfully.` : `Policy “${run.policy}” failed: ${run.error}.`),
      meta,
    );
    li.append(el('span', 'status'), body);
    list.prepend(li);
    while (list.children.length > TIMES.length) list.lastElementChild!.remove();
    [...list.children].forEach((item, i) => (item.querySelector('.time')!.textContent = TIMES[i]));
    unread.textContent = `${list.children.length} new`;
    return pills;
  }

  async function progress(run: Run) {
    const end = run.failAt ?? 1;
    const duration = 4200 * end;
    const t0 = performance.now();
    await new Promise<void>((done) => {
      const frame = (now: number) => {
        const p = Math.min(1, (now - t0) / duration) * end;
        bar.style.transform = `scaleX(${p})`;
        state.textContent = `Running · ${Math.round(p * 100)}% · ${(p * run.mib).toFixed(1)} of ${run.mib} MiB`;
        if (p < end) requestAnimationFrame(frame);
        else done();
      };
      requestAnimationFrame(frame);
    });
  }

  async function play(run: Run) {
    await untilVisible();
    setRun(run);
    state.dataset.kind = 'run';
    bar.style.transform = 'scaleX(0)';
    await progress(run);
    await sleep(300);
    const pills = notification(run);
    state.dataset.kind = 'idle';
    state.textContent = run.failAt ? 'Failed · retry at next run' : 'Succeeded · next run in 6 h';
    bar.style.transform = 'scaleX(0)';
    for (const pill of pills) {
      await sleep(380);
      pill.classList.add('is-sent');
    }
    await sleep(3000);
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) {
      started = true;
      void (async () => {
        for (;;) for (const run of RUNS) await play(run);
      })();
    }
  }, { threshold: 0.3 }).observe(root);
}
