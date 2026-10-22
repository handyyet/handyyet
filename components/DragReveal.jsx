'use client';
import { useEffect, useRef, useState } from 'react';

// "Fix it yourself": drag a finger / mouse over the BEFORE photo to wipe it away and reveal AFTER.
export default function DragReveal({ before = '/reel/door-floor-before.jpg', after = '/reel/door-floor-after.jpg', title = 'Fix this floor.' }) {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const [pct, setPct] = useState(0);
  const drawing = useRef(false);

  useEffect(() => {
    const c = canvasRef.current, box = boxRef.current;
    const im = new Image();
    im.src = before;
    const paint = () => {
      const r = box.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      c.width = r.width * dpr; c.height = r.height * dpr;
      const ctx = c.getContext('2d');
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

  const scrub = (e) => {
    if (!drawing.current) return;
    const c = canvasRef.current, r = c.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    const pt = e.touches ? e.touches[0] : e;
    const x = (pt.clientX - r.left) * dpr, y = (pt.clientY - r.top) * dpr;
    const ctx = c.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath(); ctx.arc(x, y, 38 * dpr, 0, Math.PI * 2); ctx.fill();
  };
  const measure = () => {
    drawing.current = false;
    const c = canvasRef.current, d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    let clear = 0, n = 0;
    for (let k = 3; k < d.length; k += 4 * 40) { n++; if (d[k] === 0) clear++; }
    const v = Math.round((clear / n) * 100);
    setPct(v);
    if (v > 70) c.style.opacity = '0';
  };

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
          onMouseDown={(e) => { drawing.current = true; scrub(e); }}
          onMouseMove={scrub}
          onMouseUp={measure}
          onMouseLeave={() => drawing.current && measure()}
          onTouchStart={(e) => { drawing.current = true; scrub(e); }}
          onTouchMove={(e) => { e.preventDefault(); scrub(e); }}
          onTouchEnd={measure}
        />
        <span className="pill">{pct > 70 ? 'Fixed ✓' : `${pct}% fixed`}</span>
      </div>
      <style jsx>{`
        .dr { max-width: 520px; margin: 0 auto; }
        h3 { margin: 0; font-size: clamp(28px, 5vw, 48px); font-weight: 900; letter-spacing: -0.03em; }
        .head p { margin: 8px 0 18px; color: #71717a; font-weight: 700; }
        .box { position: relative; aspect-ratio: 4 / 5; border-radius: 28px; overflow: hidden; border: 2px solid #c8763a; touch-action: none; cursor: crosshair; }
        .box img, canvas { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        canvas { transition: opacity .6s; }
        .pill { position: absolute; top: 14px; left: 14px; padding: 5px 12px; border-radius: 999px; background: #fff; border: 2px solid #c8763a; font-size: 12px; font-weight: 900; color: #18181b; pointer-events: none; }
      `}</style>
    </div>
  );
}
