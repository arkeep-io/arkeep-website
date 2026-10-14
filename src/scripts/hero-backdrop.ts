// Hero backdrop: a field of snapshot cells, like the retention timeline. Now and then a cell is kept
// (lights up and fades); a backup run sweeps a wave across, a restore ripples out from the headline.
// Runs only while the hero is on screen; under reduced motion the grid is drawn once and stays still.
const canvas = document.querySelector<HTMLCanvasElement>('[data-backdrop]');
const ctx = canvas?.getContext('2d');
if (canvas && ctx) {
  const PITCH = 28;
  const SIZE = 10;
  const FADE = 2400; // ms a lit cell takes to go dark again
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let cols = 0;
  let rows = 0;
  let lit = new Map<number, { at: number; color: string }>();
  let colors = { base: '#ebe3dd', brand: '#f66921', ok: '#1d7d3e' };
  let running = false;
  let visible = true;
  let last = 0;

  function readColors() {
    const css = getComputedStyle(document.documentElement);
    colors = {
      base: css.getPropertyValue('--hairline').trim() || colors.base,
      brand: css.getPropertyValue('--brand').trim() || colors.brand,
      ok: css.getPropertyValue('--success').trim() || colors.ok,
    };
  }

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const { width, height } = canvas!.getBoundingClientRect();
    canvas!.width = Math.round(width * dpr);
    canvas!.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / PITCH) + 1;
    rows = Math.ceil(height / PITCH) + 1;
    draw(performance.now());
  }

  // Centre the grid so it sits symmetrically under the centred headline.
  const offsetX = () => ((canvas!.clientWidth % PITCH) - PITCH + SIZE) / 2;

  function draw(now: number) {
    const w = canvas!.clientWidth;
    const h = canvas!.clientHeight;
    ctx!.clearRect(0, 0, w, h);
    const ox = offsetX();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = ox + c * PITCH;
        const y = 8 + r * PITCH;
        const cell = lit.get(r * cols + c);
        // Wave cells are scheduled ahead: they stay dark until their moment comes.
        const t = cell && now >= cell.at ? 1 - (now - cell.at) / FADE : 0;
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = colors.base;
        ctx!.beginPath();
        ctx!.roundRect(x, y, SIZE, SIZE, 2.5);
        ctx!.fill();
        if (t > 0) {
          ctx!.globalAlpha = t;
          ctx!.fillStyle = cell!.color;
          ctx!.fill();
        }
      }
    }
    ctx!.globalAlpha = 1;
  }

  function light(r: number, c: number, color: string, at = performance.now()) {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    lit.set(r * cols + c, { at, color });
    start();
  }

  function frame(now: number) {
    if (!visible) {
      running = false;
      return;
    }
    // ~30 fps is plenty for slow fades.
    if (now - last > 33) {
      last = now;
      // Ambient: a few cells are kept each second, mostly in the middle band.
      if (Math.random() < 0.18) {
        const c = Math.floor(cols / 2 + (Math.random() - 0.5) * cols * 0.9);
        const r = Math.floor(Math.random() * rows * 0.8);
        light(r, c, colors.brand, now);
      }
      for (const [k, v] of lit) if (now - v.at > FADE) lit.delete(k);
      draw(now);
    }
    requestAnimationFrame(frame);
  }

  function start() {
    if (reduced || running || !visible) return;
    running = true;
    requestAnimationFrame(frame);
  }

  // A backup sweeps a wave left to right; a restore ripples out from the headline.
  addEventListener('arkeep:backup', () => {
    if (reduced) return;
    const t0 = performance.now();
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (Math.random() < 0.35) light(r, c, colors.brand, t0 + c * 28 + Math.random() * 120);
      }
    }
  });
  addEventListener('arkeep:restore', ((e: CustomEvent<{ x: number; y: number }>) => {
    if (reduced) return;
    const box = canvas!.getBoundingClientRect();
    const cx = (e.detail.x - box.left) / PITCH;
    const cy = (e.detail.y - box.top) / PITCH;
    const t0 = performance.now();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const d = Math.hypot(c - cx, r - cy);
        if (d < 16 && Math.random() < 0.4) light(r, c, colors.ok, t0 + d * 45);
      }
    }
  }) as EventListener);

  readColors();
  resize();
  new ResizeObserver(resize).observe(canvas);
  new MutationObserver(() => {
    readColors();
    draw(performance.now());
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  }).observe(canvas);
  start();
}
