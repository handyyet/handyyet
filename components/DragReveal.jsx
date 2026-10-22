'use client';
import { useEffect, useRef, useState } from 'react';

// "Fix it yourself": drag over the BEFORE photo to wipe it away and reveal AFTER. Percent updates live.
export default function DragReveal({ before = '/reel/story-floor-before.jpg', after = '/reel/story-floor-after.jpg', title = 'Fix this floor.' }) {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const [pct, setPct] = useState(0);
  const [shown, setShown] = useState(0);
  const drawing = useRef(false);
  const last = useRef(null);
  const lastMeasure = useRef(0);

  useEffect(() => {
    const c = canvasRef.current, box = boxRef.current;
    const im = new Image();
    im.src = before;
    const paint = () => {
      const r = box.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      c.width = r.width * dpr; c.height = r.height * dpr; c.style.opacity = '1';
      const ctx = c.getContext('2d', { willReadFrequently: true });
      const s = Math.max(c.width / im.width, c.height / im.height);
      const w = im.width * s, h = im.height * s;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(im, (c.width - w) / 2, (c.height - h) / 2, w, h);
      setPct(0);
    };
    im.onload = paint;
    window.addEventListener('resize', paint);
    return () => window.removeEventListener('resize', paint);
  }, [before]);

  // count the shown number up/down to the real value, frame by frame
  useEffect(() => {
    if (shown === pct) return;
    const id = requestAnimationFrame(() => setShown((v) => v + Math.sign(pct - v) * Math.max(1, Math.round(Math.abs(pct - v) / 6))));
    return () => cancelAnimationFrame(id);
  }, [pct, shown]);

  const measure = () => {
    const c = canvasRef.current, d = c.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, c.width, c.height).data;
    let clear = 0, n = 0;
    for (let k = 3; k < d.length; k += 4 * 97) { n++; if (d[k] === 0) clear++; }
    const v = Math.min(100, Math.round((clear / n) * 100 / 0.7)); // 70% wiped counts as fully fixed
    setPct(v);
    if (v >= 100) c.style.opacity = '0';
  };

  const scrub = (e) => {
    if (!drawing.current) return;
    const c = canvasRef.current, r = c.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    const pt = e.touches ? e.touches[0] : e;
    const x = (pt.clientX - r.left) * dpr, y = (pt.clientY - r.top) * dpr;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 80 * dpr;
    ctx.beginPath();
    const p = last.current || { x, y };
    ctx.moveTo(p.x, p.y); ctx.lineTo(x, y); ctx.stroke();
    last.current = { x, y };
    const now = performance.now();
    if (now - lastMeasure.current > 60) { lastMeasure.current = now; measure(); }
  };
  const start = (e) => { drawing.current = true; last.current = null; scrub(e); };
  const stop = () => { if (!drawing.current) return; drawing.current = false; last.current = null; measure(); };

  return (
    <div className="dr">
      <div className="head">
        <h3>{title}</h3>
        <p>Drag across the photo to see the result.</p>
      </div>
      <div className="box" ref={boxRef}>
        <img src={after} alt="After" />
        <canvas
          ref={canvasRef}
          onMouseDown={start}
          onMouseMove={scrub}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={start}
          onTouchMove={(e) => { e.preventDefault(); scrub(e); }}
          onTouchEnd={stop}
        />
        <span className="pill">{shown >= 100 ? 'Fixed ✓' : `${shown}% fixed`}</span>
        <div className="meter"><i style={{ width: `${shown}%` }} /></div>
      </div>
      <style jsx>{`
        .dr { max-width: 520px; margin: 0 auto; }
        h3 { margin: 0; font-size: clamp(28px, 5vw, 48px); font-weight: 900; letter-spacing: -0.03em; }
        .head p { margin: 8px 0 18px; color: #71717a; font-weight: 700; }
        .box { position: relative; aspect-ratio: 4 / 5; border-radius: 28px; overflow: hidden; border: 2px solid #c8763a; touch-action: none; cursor: crosshair; }
        .box img, canvas { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        canvas { transition: opacity .6s; }
        .pill { position: absolute; top: 14px; left: 14px; padding: 5px 12px; border-radius: 999px; background: #fff; border: 2px solid #c8763a; font-size: 12px; font-weight: 900; color: #18181b; pointer-events: none; font-variant-numeric: tabular-nums; }
        .meter { position: absolute; left: 14px; right: 14px; bottom: 14px; height: 6px; border-radius: 6px; background: rgba(255,255,255,.7); overflow: hidden; pointer-events: none; }
        .meter i { display: block; height: 100%; background: #c8763a; border-radius: 6px; transition: width .1s linear; }
      `}</style>
    </div>
  );
}
