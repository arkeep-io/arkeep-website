// Loops two runs while on screen: one succeeds, one fails, and the notification channels fire for each.
// Reduced motion keeps the static end state rendered by the server.
type Kind = 'ok' | 'bad' | 'info';
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
const MAX_EVENTS = 5;

const root = document.querySelector<HTMLElement>('[data-notify]');
if (root && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const name = root.querySelector<HTMLElement>('[data-run-name]')!;
  const state = root.querySelector<HTMLElement>('[data-run-state]')!;
  const bar = root.querySelector<HTMLElement>('[data-bar]')!;
  const meta = root.querySelector<HTMLElement>('[data-run-meta]')!;
  const list = root.querySelector<HTMLElement>('[data-events]')!;
  let visible = false;
  let started = false;

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const untilVisible = async () => {
    while (!visible) await sleep(250);
  };

  function event(channel: string, text: string, detail: string, kind: Kind) {
    const li = document.createElement('li');
    li.dataset.kind = kind;
    li.className = 'enter';
    for (const [cls, value] of [['channel', channel], ['text', text], ['detail', detail]]) {
      const s = document.createElement('span');
      s.className = cls;
      s.textContent = value;
      li.append(s);
    }
    list.prepend(li);
    while (list.children.length > MAX_EVENTS) list.lastElementChild!.remove();
  }

  function setState(text: string, kind: 'run' | 'ok' | 'bad') {
    state.textContent = text;
    state.dataset.kind = kind;
  }

  async function progress(run: Run) {
    const end = run.failAt ?? 1;
    const duration = 4200 * end;
    const t0 = performance.now();
    await new Promise<void>((done) => {
      const frame = (now: number) => {
        const p = Math.min(1, (now - t0) / duration) * end;
        bar.style.transform = `scaleX(${p})`;
        meta.textContent = `${Math.round(p * 100)}% · ${(p * run.mib).toFixed(1)} of ${run.mib.toFixed(1)} MiB · NAS (local)`;
        if (p < end) requestAnimationFrame(frame);
        else done();
      };
      requestAnimationFrame(frame);
    });
  }

  async function play(run: Run) {
    await untilVisible();
    name.innerHTML = '';
    name.append(run.policy, Object.assign(document.createElement('span'), { textContent: ` · ${run.host}` }));
    setState('Running', 'run');
    bar.style.transform = 'scaleX(0)';
    event('Healthchecks.io', 'Ping /start', '200 OK', 'info');
    await progress(run);
    if (run.failAt) {
      setState('Failed', 'bad');
      meta.textContent = run.error!;
      const title = `Backup failed: ${run.policy}`;
      await sleep(400);
      event('Email', title, 'ops@example.com', 'bad');
      await sleep(300);
      event('Webhook', `job_failure · ${title}`, 'signed', 'bad');
      await sleep(300);
      event('Healthchecks.io', 'Ping /fail', '200 OK', 'bad');
    } else {
      setState('Succeeded', 'ok');
      const title = `Backup completed: ${run.policy}`;
      await sleep(400);
      event('Email', title, 'ops@example.com', 'ok');
      await sleep(300);
      event('Webhook', `job_success · ${title}`, 'signed', 'ok');
      await sleep(300);
      event('Healthchecks.io', 'Ping', '200 OK', 'ok');
    }
    await sleep(2600);
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
