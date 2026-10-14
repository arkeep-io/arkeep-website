import { getInstallTarget } from '../lib/install';

const root = document.querySelector<HTMLElement>('[data-install]');
if (root) {
  const radios = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
  const command = root.querySelector<HTMLElement>('[data-install-command]')!;
  const link = root.querySelector<HTMLAnchorElement>('[data-install-link]')!;
  const label = root.querySelector<HTMLElement>('[data-install-label]')!;
  const copy = root.querySelector<HTMLButtonElement>('[data-copy]')!;
  const copyLabel = root.querySelector<HTMLElement>('[data-copy-label]')!;
  const status = root.querySelector<HTMLElement>('[data-copy-status]')!;

  const choose = (radio: HTMLButtonElement, focus = false) => {
    for (const r of radios) {
      r.setAttribute('aria-checked', String(r === radio));
      r.tabIndex = r === radio ? 0 : -1;
    }
    const target = getInstallTarget(radio.dataset.platform!);
    command.textContent = target.command;
    link.href = target.href;
    label.textContent = target.label;
    if (focus) radio.focus();
  };
  radios.forEach((r) => r.addEventListener('click', () => choose(r)));
  root.querySelector('[role="radiogroup"]')!.addEventListener('keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    const i = radios.indexOf(document.activeElement as HTMLButtonElement);
    const step = k === 'ArrowRight' || k === 'ArrowDown' ? 1 : k === 'ArrowLeft' || k === 'ArrowUp' ? -1 : 0;
    if (i < 0 || !step) return;
    e.preventDefault();
    choose(radios[(i + step + radios.length) % radios.length], true);
  });

  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(command.textContent ?? '');
      copyLabel.textContent = 'Copied';
      status.textContent = 'Command copied';
    } catch {
      copyLabel.textContent = 'Select and copy';
    }
    setTimeout(() => (copyLabel.textContent = 'Copy'), 1800);
  });
}
