import { getInstallTarget } from '../lib/install';

const form = document.querySelector<HTMLFormElement>('[data-install]');
if (form) {
  const select = form.querySelector<HTMLSelectElement>('select')!;
  const command = document.querySelector<HTMLElement>('[data-install-command]')!;
  const copy = document.querySelector<HTMLButtonElement>('[data-copy]')!;
  const status = document.querySelector<HTMLElement>('[data-copy-status]')!;

  const update = () => {
    const target = getInstallTarget(select.value);
    command.textContent = target.command;
    form.action = target.href;
  };
  select.addEventListener('change', update);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open(getInstallTarget(select.value).href, '_blank', 'noopener');
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(command.textContent ?? '');
      copy.textContent = 'Copied';
      status.textContent = 'Command copied';
    } catch {
      copy.textContent = 'Select and copy';
    }
    setTimeout(() => (copy.textContent = 'Copy'), 1800);
  });
  update();
}
