import { applyRetention, clampKeep, DESTINATION_PRESETS, timeline, type RetentionPolicy } from '../lib/retention';

const root = document.querySelector<HTMLElement>('[data-retention]');
if (root) {
  const END = new Date('2026-10-14T18:00:00Z'); // must match Showcase.astro
  const times = timeline(END, 30, 6);
  const dots = [...root.querySelectorAll<HTMLElement>('.timeline .cell')];
  const count = root.querySelector<HTMLElement>('[data-retention-count]')!;
  const inputs = Object.fromEntries(
    [...root.querySelectorAll<HTMLInputElement>('input[type="number"]')].map((i) => [i.name, i]),
  ) as Record<keyof RetentionPolicy, HTMLInputElement>;
  const policies = Object.fromEntries(
    Object.entries(DESTINATION_PRESETS).map(([k, v]) => [k, { ...v.policy }]),
  ) as Record<string, RetentionPolicy>;
  let current = 'nas';

  function render() {
    const keep = applyRetention(times, policies[current]);
    for (const dot of dots) dot.classList.toggle('kept', keep[Number(dot.dataset.i)]);
    count.textContent = `Keeps ${keep.filter(Boolean).length} of ${times.length} snapshots`;
  }

  function load() {
    for (const [k, input] of Object.entries(inputs)) input.value = String(policies[current][k as keyof RetentionPolicy]);
    render();
  }

  for (const [k, input] of Object.entries(inputs)) {
    const key = k as keyof RetentionPolicy;
    input.addEventListener('input', () => {
      policies[current][key] = clampKeep(input.value);
      render();
    });
    // Show the clamped value once the visitor leaves the field.
    input.addEventListener('change', () => {
      input.value = String(policies[current][key]);
    });
  }

  for (const btn of root.querySelectorAll<HTMLButtonElement>('[data-step]')) {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key as keyof RetentionPolicy;
      policies[current][key] = clampKeep(policies[current][key] + Number(btn.dataset.step));
      inputs[key].value = String(policies[current][key]);
      render();
    });
  }

  const radios = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
  const choose = (radio: HTMLButtonElement, focus = false) => {
    current = radio.dataset.dest!;
    for (const r of radios) {
      r.setAttribute('aria-checked', String(r === radio));
      r.tabIndex = r === radio ? 0 : -1;
    }
    if (focus) radio.focus();
    load();
  };
  for (const radio of radios) radio.addEventListener('click', () => choose(radio));
  // Radio group keyboard: arrows move and select.
  root.querySelector('[role="radiogroup"]')!.addEventListener('keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    const i = radios.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const step = k === 'ArrowRight' || k === 'ArrowDown' ? 1 : k === 'ArrowLeft' || k === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    choose(radios[(i + step + radios.length) % radios.length], true);
  });

  const more = root.querySelector<HTMLButtonElement>('[data-more-rules]');
  more?.addEventListener('click', () => {
    const open = more.getAttribute('aria-expanded') !== 'true';
    more.setAttribute('aria-expanded', String(open));
    more.textContent = open ? 'Fewer rules' : 'More rules';
    root.querySelector('.controls')!.classList.toggle('show-all', open);
  });
}
