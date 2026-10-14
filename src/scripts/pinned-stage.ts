const stage = document.querySelector<HTMLElement>('[data-stage]');
const steps = [...document.querySelectorAll<HTMLElement>('#how-it-works [data-step]')];
if (stage && steps.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const n = (e.target as HTMLElement).dataset.step!;
        stage.dataset.state = n;
        for (const s of steps) s.classList.toggle('is-active', s.dataset.step === n);
      }
    },
    { rootMargin: '-45% 0px -45% 0px' }, // a thin band at the viewport centre decides
  );
  steps.forEach((s) => io.observe(s));
}
