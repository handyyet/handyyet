'use client';
import { useEffect, useRef, useState } from 'react';

// Scroll-driven before → after story. Photos: public/reel/story-<slug>-before|after.jpg
const STEPS = [
  { slug: 'fountain', title: 'Peeling, faded fountain.', after: 'Resurfaced. Bright blue.', note: 'Fountain pool resurfacing' },
  { slug: 'chandelier', title: 'Old fixture, 20 ft up.', after: 'New spiral chandelier.', note: 'Foyer chandelier install' },
  { slug: 'office', title: 'Plain office corner.', after: 'Slat wall + lit shelf.', note: 'Accent wall + shelf lighting' },
  { slug: 'tv', title: 'Holes in the wall?', after: 'TV up. No cords.', note: 'TV mount + in-wall power' },
  { slug: 'disposal', title: 'Rusty disposal.', after: 'New 3/4 HP unit.', note: 'Garbage disposal replacement' },
  { slug: 'toilet', title: 'Broken flange.', after: 'New TOTO, sealed tight.', note: 'Toilet replacement' },
  { slug: 'transformer', title: 'Open wires.', after: 'Clean and safe.', note: 'Pool lighting transformer' },
];
const BRONZE = '#c8763a';
const CREAM = '#fdfaf5';
const img = (slug, kind) => `/reel/story-${slug}-${kind}.jpg`;

export default function ScrollStory() {
  const wrapRef = useRef(null);
  const [p, setP] = useState(0); // 0..STEPS.length

  // Live, smoothed progress: the target follows the scroll, the shown value glides to it every frame
  useEffect(() => {
    let raf = 0, target = 0, shown = 0;
    const read = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      target = Math.min(Math.max(-r.top / total, 0), 1) * STEPS.length;
    };
    const tick = () => {
      read();
      shown += (target - shown) * 0.12;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      setP(shown);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const i = Math.min(Math.floor(p), STEPS.length - 1);
  const local = Math.min(Math.max(p - i, 0), 1);
  // hold "before" for the first 20%, wipe 20%→80%, hold "after" for the last 20%
  const wipe = Math.min(Math.max((local - 0.2) / 0.6, 0), 1);
  const step = STEPS[i];
  const pct = Math.floor(wipe * 100);

  return (
    <section ref={wrapRef} className="story" style={{ height: `${STEPS.length * 80 + 100}vh` }} aria-label="Before and after, scroll to fix">
      <div className="sticky">
        <div className="text">
          <p className="hint">Scroll to fix it</p>
          <h2 key={`${i}-${wipe < 0.5}`} className="headline">{wipe < 0.5 ? step.title : step.after}</h2>
          <p className="note">{step.note}</p>
          <div className="dots">
            {STEPS.map((s, k) => <i key={s.slug} className={k === i ? 'on' : k < i ? 'past' : ''} />)}
          </div>
        </div>

        <div className="frame">
          {STEPS.map((s, k) => (
            <div key={s.slug} className={`slide ${k === i ? 'show' : ''}`}>
              <img src={img(s.slug, 'before')} alt={`${s.note}, before`} />
              <img
                src={img(s.slug, 'after')}
                alt={`${s.note}, after`}
                style={{ clipPath: `inset(0 0 ${k === i ? 100 - wipe * 100 : k < i ? 0 : 100}% 0)` }}
              />
            </div>
          ))}
          <div className="bar" style={{ top: `${wipe * 100}%`, opacity: wipe > 0 && wipe < 1 ? 1 : 0 }} />
          <span className="pill">{pct < 100 ? `${pct}% fixed` : 'Done ✓'}</span>
        </div>
      </div>

      <style jsx>{`
        .story { position: relative; }
        .sticky {
          position: sticky; top: 0; height: 100vh; display: grid; align-items: center;
          grid-template-columns: 1fr; gap: 20px; padding: 84px 20px 24px; max-width: 1200px; margin: 0 auto;
        }
        @media (min-width: 900px) { .sticky { grid-template-columns: 1fr 1fr; gap: 56px; padding: 80px 32px; } }
        .hint { margin: 0 0 10px; font-weight: 900; color: ${BRONZE}; font-size: 14px; }
        .headline { margin: 0; font-size: clamp(32px, 6vw, 72px); line-height: 1; font-weight: 900; letter-spacing: -0.03em; min-height: 2em; animation: rise .4s cubic-bezier(.22,1,.36,1); }
        @keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .note { margin: 14px 0 0; color: #71717a; font-weight: 700; }
        .dots { display: flex; gap: 6px; margin-top: 18px; }
        .dots i { width: 22px; height: 4px; border-radius: 4px; background: #e4d6c6; transition: background .3s; }
        .dots i.past { background: ${BRONZE}88; }
        .dots i.on { background: ${BRONZE}; }
        .frame {
          position: relative; width: 100%; max-width: 520px; justify-self: center; aspect-ratio: 4 / 5; max-height: 62vh;
          border-radius: 28px; overflow: hidden; border: 2px solid ${BRONZE}; background: ${CREAM};
          box-shadow: 0 30px 60px -30px rgba(120,70,30,.45);
        }
        @media (min-width: 900px) { .frame { max-height: 78vh; } }
        .slide { position: absolute; inset: 0; opacity: 0; transition: opacity .4s; }
        .slide.show { opacity: 1; }
        .slide img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .bar {
          position: absolute; left: 0; right: 0; height: 3px; margin-top: -1.5px; background: #fff;
          box-shadow: 0 0 18px 4px rgba(255,255,255,.8); transition: opacity .2s; pointer-events: none;
        }
        .pill {
          position: absolute; top: 14px; left: 14px; padding: 5px 12px; border-radius: 999px; background: #fff;
          border: 2px solid ${BRONZE}; font-size: 12px; font-weight: 900; color: #18181b; font-variant-numeric: tabular-nums;
        }
        @media (prefers-reduced-motion: reduce) { .headline { animation: none; } .slide { transition: none; } }
      `}</style>
    </section>
  );
}
