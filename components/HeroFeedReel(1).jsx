'use client';
import { useEffect, useRef, useState } from 'react';

// Files: public/reel/<slug>-after.jpg, <slug>-before.jpg (if pair), thumb/<slug>.jpg
const ITEMS = [
  { slug: 'tv-wall', caption: 'Slat wall + TV mount', pair: true },
  { slug: 'pool-night', caption: 'Backyard lighting' },
  { slug: 'closet', caption: 'Closet system assembly' },
  { slug: 'bath-floor', caption: 'Bathroom floor + baseboards', pair: true },
  { slug: 'front-lights', caption: 'Landscape lighting' },
  { slug: 'window-trim', caption: 'Exterior trim repair', pair: true },
  { slug: 'pool-lighting-box', caption: 'Lighting transformer install', pair: true },
  { slug: 'wall-repair', caption: 'Drywall + baseboard repair', pair: true },
  { slug: 'vent', caption: 'Vent register replacement', pair: true },
  { slug: 'door-floor', caption: 'Water-damaged floor repair', pair: true },
  { slug: 'toilet-floor', caption: 'Half bath flooring' },
  { slug: 'window-sill', caption: 'Window return paint' },
];
// Which tiles get "tapped", in order
const TAPS = [0, 3, 6, 9];

const AVATAR = '/images/nikita.jpg';
const BEFORE_MS = 1800;
const AFTER_MS = 2600;
const HEADER = 64;
const GAP = 2;
const BRONZE = '#c8763a';
const CREAM = '#fdfaf5';
const src = (slug, kind) => `/reel/${slug}-${kind}.jpg`;

export default function HeroFeedReel() {
  const screenRef = useRef(null);
  const [size, setSize] = useState({ w: 264, h: 560 });
  const [scroll, setScroll] = useState(0);
  const [tap, setTap] = useState(null);
  const [open, setOpen] = useState(null); // { i, x, y, stage: 'before'|'after', closing }
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = screenRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    // preload tapped pairs
    TAPS.forEach((i) => {
      ['before', 'after'].forEach((k) => { const im = new Image(); im.src = src(ITEMS[i].slug, k); });
    });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const tile = (size.w - GAP * 2) / 3;
    const rowH = tile + GAP;
    const viewH = size.h - HEADER;

    (async () => {
      await wait(900);
      while (!cancelled) {
        for (const i of TAPS) {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const target = Math.max(0, row * rowH - viewH * 0.35);
          setScroll(target);
          await wait(1400);
          if (cancelled) return;
          const x = col * (tile + GAP) + tile / 2;
          const y = HEADER + row * rowH + tile / 2 - target;
          setTap({ x, y, k: Date.now() });
          await wait(450);
          const hasPair = ITEMS[i].pair;
          setOpen({ i, x, y, stage: hasPair ? 'before' : 'after', closing: false });
          if (hasPair) {
            await wait(BEFORE_MS);
            if (cancelled) return;
            setOpen((o) => o && { ...o, stage: 'after' });
          }
          await wait(AFTER_MS);
          setOpen((o) => o && { ...o, closing: true });
          await wait(350);
          setOpen(null);
          setTap(null);
          await wait(450);
          if (cancelled) return;
        }
        setScroll(0);
        await wait(1400);
      }
    })();
    return () => { cancelled = true; };
  }, [size.w, size.h, reduced]);

  const item = open ? ITEMS[open.i] : null;

  return (
    <div className="phone" aria-label="Recent HandyYet jobs">
      <div className="screen" ref={screenRef}>
        <header className="profile">
          <img src={AVATAR} alt="Nikita, HandyYet" />
          <div>
            <strong>HandyYet</strong>
            <span>Handyman in Huntington Beach</span>
          </div>
        </header>

        <div className="viewport">
          <div className="grid" style={{ transform: `translateY(${-scroll}px)` }}>
            {ITEMS.map((it, i) => (
              <div className="tile" key={it.slug}>
                <img src={`/reel/thumb/${it.slug}.jpg`} alt={it.caption} loading={i < 9 ? 'eager' : 'lazy'} />
                {it.pair && (
                  <svg className="multi" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="7" y="3" width="14" height="14" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
                    <path d="M3 7v12a2 2 0 0 0 2 2h12" fill="none" stroke="#fff" strokeWidth="2" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {tap && <span key={tap.k} className="tap" style={{ left: tap.x, top: tap.y }} />}

        {item && (
          <div
            className={`post ${open.closing ? 'closing' : ''}`}
            style={{ transformOrigin: `${open.x}px ${open.y}px` }}
          >
            <div className="media">
              <div className={`track ${open.stage === 'after' ? 'show-after' : ''} ${item.pair ? '' : 'single'}`}>
                {item.pair && <img src={src(item.slug, 'before')} alt={`${item.caption}, before`} />}
                <img src={src(item.slug, 'after')} alt={`${item.caption}, after`} />
              </div>
              {item.pair && (
                <span className="pill">{open.stage === 'after' ? 'After' : 'Before'}</span>
              )}
            </div>
            {item.pair && (
              <div className="dots">
                <i className={open.stage === 'before' ? 'on' : ''} />
                <i className={open.stage === 'after' ? 'on' : ''} />
              </div>
            )}
            <p className="caption">{item.caption}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .phone {
          width: 100%;
          max-width: 290px;
          margin: 0 auto;
          padding: 10px;
          background: ${CREAM};
          border: 2px solid ${BRONZE};
          border-radius: 40px;
          box-shadow: 0 24px 50px rgba(120, 70, 30, 0.2);
        }
        .screen {
          position: relative;
          aspect-ratio: 9 / 19;
          border-radius: 30px;
          overflow: hidden;
          background: #fff;
        }
        .profile {
          position: absolute;
          inset: 0 0 auto 0;
          height: ${HEADER}px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 14px 8px;
          background: #fff;
          z-index: 2;
          border-bottom: 1px solid #f0e6da;
        }
        .profile img {
          width: 38px; height: 38px; border-radius: 50%;
          object-fit: cover; border: 2px solid ${BRONZE};
        }
        .profile div { display: flex; flex-direction: column; line-height: 1.2; }
        .profile strong { font-size: 14px; color: #18181b; }
        .profile span { font-size: 11px; color: #71717a; }
        .viewport { position: absolute; inset: ${HEADER}px 0 0 0; overflow: hidden; }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: ${GAP}px;
          transition: transform 1.2s cubic-bezier(0.22, 0.8, 0.25, 1);
        }
        .tile { position: relative; aspect-ratio: 1 / 1; background: #f3ece2; }
        .tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .multi { position: absolute; top: 6px; right: 6px; width: 15px; height: 15px;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,.5)); }
        .tap {
          position: absolute; width: 38px; height: 38px; margin: -19px 0 0 -19px;
          border-radius: 50%; background: rgba(255,255,255,.55); border: 2px solid ${BRONZE};
          z-index: 3; pointer-events: none; animation: tap .45s ease-out forwards;
        }
        @keyframes tap {
          0% { transform: scale(1.4); opacity: 0; }
          40% { transform: scale(0.85); opacity: 1; }
          100% { transform: scale(1.1); opacity: 0.6; }
        }
        .post {
          position: absolute; inset: 0; z-index: 4; background: ${CREAM};
          display: flex; flex-direction: column; justify-content: center;
          animation: grow .35s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .post.closing { animation: shrink .35s ease-in forwards; }
        .media { position: relative; width: 100%; aspect-ratio: 4 / 5; overflow: hidden; }
        .track {
          display: flex; width: 200%; height: 100%;
          transition: transform .5s cubic-bezier(0.3, 0.8, 0.3, 1);
        }
        .track.single { width: 100%; }
        .track.show-after:not(.single) { transform: translateX(-50%); }
        .track img { width: 100%; height: 100%; object-fit: cover; display: block; flex: 1 1 0; min-width: 0; }
        .pill {
          position: absolute; top: 10px; left: 10px;
          padding: 3px 10px; border-radius: 999px;
          background: #fff; border: 2px solid ${BRONZE};
          font-size: 11px; font-weight: 700; color: #18181b;
          box-shadow: 0 2px 6px rgba(0,0,0,.15);
        }
        .dots { display: flex; gap: 5px; justify-content: center; padding-top: 10px; }
        .dots i { width: 6px; height: 6px; border-radius: 50%; background: #e4d6c6; }
        .dots i.on { background: ${BRONZE}; }
        .caption { margin: 8px 14px 0; font-size: 13px; color: #3f3f46; text-align: center; }
        @keyframes grow { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes shrink { from { transform: scale(1); opacity: 1; } to { transform: scale(0.3); opacity: 0; } }
        @media (max-width: 768px) { .phone { max-width: 250px; margin-top: 28px; } }
        @media (prefers-reduced-motion: reduce) { .grid, .track { transition: none; } }
      `}</style>
    </div>
  );
}
