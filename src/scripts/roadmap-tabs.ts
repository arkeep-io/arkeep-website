// WAI-ARIA tabs: click or arrow keys select a version; without JS every panel stays visible.
const list = document.querySelector<HTMLElement>('#roadmap [role="tablist"]');
if (list) {
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (tab: HTMLButtonElement, focus = false) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')!)!.hidden = !on;
    }
    if (focus) tab.focus();
  };
  tabs.forEach((t) => t.addEventListener('click', () => select(t)));
  list.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? tabs[(i + 1) % tabs.length]
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? tabs[(i - 1 + tabs.length) % tabs.length]
          : e.key === 'Home'
            ? tabs[0]
            : e.key === 'End'
              ? tabs[tabs.length - 1]
              : null;
    if (next) {
      e.preventDefault();
      select(next, true);
    }
  });
  select(tabs[0]);
}
