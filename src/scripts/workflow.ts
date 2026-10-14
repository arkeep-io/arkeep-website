// "How it works": WAI-ARIA tabs (click, arrows, Home/End). While the section is on screen the steps
// advance on their own until the visitor picks one; never under reduced motion.
const root = document.querySelector<HTMLElement>('[data-workflow]');
if (root) {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  let current = 0;
  let timer: number | undefined;
  let touched = false;

  const select = (i: number, focus = false) => {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(j === current));
      t.tabIndex = j === current ? 0 : -1;
    });
    panels.forEach((p, j) => {
      p.classList.toggle('is-active', j === current);
      p.toggleAttribute('inert', j !== current);
    });
    if (focus) tabs[current].focus();
  };
  const stop = () => {
    touched = true;
    clearInterval(timer);
  };

  tabs.forEach((t, i) =>
    t.addEventListener('click', () => {
      stop();
      select(i);
    }),
  );
  root.querySelector('[role="tablist"]')!.addEventListener('keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    const next =
      k === 'ArrowDown' || k === 'ArrowRight' ? current + 1
      : k === 'ArrowUp' || k === 'ArrowLeft' ? current - 1
      : k === 'Home' ? 0
      : k === 'End' ? tabs.length - 1
      : null;
    if (next === null) return;
    e.preventDefault();
    stop();
    select(next, true);
  });

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting && !touched) timer = window.setInterval(() => select(current + 1), 5000);
    }, { threshold: 0.5 }).observe(root);
  }
  select(0);
}
