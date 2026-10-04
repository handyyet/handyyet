'use client';
import { useEffect, useRef, useState } from 'react';

// Files: public/reel/<slug>-after.jpg, <slug>-before.jpg (if pair), thumb/<slug>.jpg
const ITEMS = [
  { slug: 'tv-wall', caption: 'Slat wall + TV mount', pair: true },
  { slug: 'garden-lights', caption: 'Garden lighting' },
  { slug: 'closet', caption: 'Closet system assembly' },
  { slug: 'kitchen-pendants', caption: 'Kitchen pendant lights', pair: true },
  { slug: 'front-lights', caption: 'Landscape lighting' },
  { slug: 'shelves', caption: 'Floating shelves' },
  { slug: 'bath-floor', caption: 'Bathroom floor + baseboards', pair: true },
  { slug: 'pool-night', caption: 'Backyard lighting' },
  { slug: 'mirror-sconces', caption: 'Mirror + wall sconces', pair: true },
  { slug: 'smart-toilet', caption: 'Smart toilet install', pair: true },
  { slug: 'washer-repair', caption: 'Washer repair' },
  { slug: 'window-trim', caption: 'Exterior trim repair', pair: true },
  { slug: 'tv-wiring', caption: 'TV mount + in-wall wiring', pair: true },
  { slug: 'smart-toilet-open', caption: 'Smart toilet setup' },
  { slug: 'wall-repair', caption: 'Drywall + baseboard repair', pair: true },
  { slug: 'chimney-cap', caption: 'Chimney cap install', pair: true },
  { slug: 'pool-lighting-box', caption: 'Lighting transformer install', pair: true },
  { slug: 'door-lock', caption: 'Patio door lock repair' },
  { slug: 'window-shade', caption: 'Blackout roller shade', pair: true },
  { slug: 'toilet-floor', caption: 'Half bath flooring' },
  { slug: 'vent', caption: 'Vent register replacement', pair: true },
  { slug: 'door-floor', caption: 'Water-damaged floor repair', pair: true },
  { slug: 'toilet-flange', caption: 'Toilet flange + wax ring' },
  { slug: 'ceiling-vent', caption: 'Ceiling vent + crack repair' },
];
// Which tiles get "tapped", in order (first tile of each row)
const TAPS = [0, 3, 6, 9, 12, 15, 18, 21];
// Feed is rendered twice so it never looks empty
const FEED = [...ITEMS, ...ITEMS];

const AVATAR = '/images/nikita-portrait.png'; // your photo; falls back to HY badge if missing
const BEFORE_MS = 1500; // show 'before'
const AFTER_MS = 3200;  // wipe (1.2s) + hold on 'after'
const HEADER = 64;
const GAP = 2;
const BRONZE = '#c8763a';
const CREAM = '#fdfaf5';
const src = (slug, kind) => `/reel/${slug}-${kind}.jpg`;

export default function HeroFeedReel() {
  const screenRef = useRef(null);
  const loadedRef = useRef({}); // 'slug-kind' -> true once the image actually loaded
  const [size, setSize] = useState({ w: 264, h: 560 });
  const [scroll, setScroll] = useState(0);
  const [tap, setTap] = useState(null);
  const [open, setOpen] = useState(null); // { i, x, y, stage: 'before'|'after', closing }
  const [reduced, setReduced] = useState(false);
  const [avatarOk, setAvatarOk] = useState(true);
  const [badBefore, setBadBefore] = useState({}); // slugs whose 'before' failed to load

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = screenRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    // preload tapped pairs and remember which ones really loaded
    TAPS.forEach((i) => {
      const kinds = ITEMS[i].pair ? ['before', 'after'] : ['after'];
      kinds.forEach((k) => {
        const im = new Image();
        im.onload = () => { loadedRef.current[`${ITEMS[i].slug}-${k}`] = true; };
        im.src = src(ITEMS[i].slug, k);
      });
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
      await wait(400); // start almost immediately
      while (!cancelled) {
        for (const i of TAPS) {
          // never open a post with a missing photo
          const it = ITEMS[i];
          const isOk = () => loadedRef.current[`${it.slug}-after`] && (!it.pair || loadedRef.current[`${it.slug}-before`]);
          // wait up to 2.5s for this post's photos, then skip it if still missing
          for (let t = 0; t < 25 && !isOk() && !cancelled; t++) await wait(100);
          if (cancelled) return;
          if (!isOk()) continue;
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
          {avatarOk ? (
            <img className="avatar" src={AVATAR} alt="" onError={() => setAvatarOk(false)} />
          ) : (
            <span className="avatar badge" aria-hidden="true">HY</span>
          )}
          <div>
            <strong>HandyYet</strong>
            <span>Handyman in Huntington Beach</span>
          </div>
        </header>

        <div className="viewport">
          <div className="grid" style={{ transform: `translateY(${-scroll}px)` }}>
            {FEED.map((it, i) => (
              <div className="tile" key={`${it.slug}-${i}`}>
                <img src={`/reel/thumb/${it.slug}.jpg`} alt={i < ITEMS.length ? it.caption : ''} loading={i < 12 ? 'eager' : 'lazy'} />
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
              {item.pair && !badBefore[item.slug] ? (
                <>
                  <img
                    className="layer"
                    src={src(item.slug, 'before')}
                    alt=""
                    onError={() => setBadBefore((b) => ({ ...b, [item.slug]: true }))}
                  />
                  <img
                    className={`layer top ${open.stage === 'after' ? 'wipe' : ''}`}
                    src={src(item.slug, 'after')}
                    alt={`${item.caption}, after`}
                  />
                  {open.stage === 'after' && <span className="divider" />}
                  <span className={`pill right ${open.stage === 'after' ? 'hide' : ''}`}>Before</span>
                  <span className={`pill left ${open.stage === 'after' ? 'show' : ''}`}>After</span>
                </>
              ) : (
                <img className="layer" src={src(item.slug, 'after')} alt={item.caption} />
              )}
            </div>
            <p className="caption">{item.caption}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .phone {
          width: 100%;
          max-width: 360px;
          margin: 0 auto;
          padding: 10px;
          background: ${CREAM};
          border: 2px solid ${BRONZE};
          border-radius: 40px;
          box-shadow: 0 24px 50px rgba(120, 70, 30, 0.2);
        }
        .screen {
          position: relative;
          aspect-ratio: 9 / 18;
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
        .avatar {
          width: 38px; height: 38px; border-radius: 50%; flex: none;
          object-fit: cover; border: 2px solid ${BRONZE};
        }
        .badge {
          display: grid; place-items: center; background: ${CREAM};
          font-size: 13px; font-weight: 800; color: ${BRONZE}; letter-spacing: -0.02em;
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
        .layer { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .top { clip-path: inset(0 100% 0 0); }
        .top.wipe { animation: wipe 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        @keyframes wipe { to { clip-path: inset(0 0 0 0); } }
        .divider {
          position: absolute; top: 0; bottom: 0; left: 0; width: 3px; margin-left: -1.5px;
          background: #fff; box-shadow: 0 0 10px rgba(0,0,0,.35); z-index: 2;
          animation: sweep 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .divider::after {
          content: ''; position: absolute; top: 50%; left: 50%;
          width: 30px; height: 30px; margin: -15px 0 0 -15px; border-radius: 50%;
          background: #fff; border: 2px solid ${BRONZE}; box-shadow: 0 2px 8px rgba(0,0,0,.25);
        }
        @keyframes sweep {
          0% { left: 0; opacity: 1; }
          92% { left: 100%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .pill.right { right: 10px; transition: opacity .25s ease .85s; }
        .pill.right.hide { opacity: 0; }
        .pill.left { left: 10px; opacity: 0; transition: opacity .3s ease .6s; }
        .pill.left.show { opacity: 1; }
        .pill {
          position: absolute; top: 10px; z-index: 3;
          padding: 3px 10px; border-radius: 999px;
          background: #fff; border: 2px solid ${BRONZE};
          font-size: 11px; font-weight: 700; color: #18181b;
          box-shadow: 0 2px 6px rgba(0,0,0,.15);
        }
                .caption { margin: 12px 14px 0; font-size: 14px; font-weight: 600; color: #3f3f46; text-align: center; }
        @keyframes grow { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes shrink { from { transform: scale(1); opacity: 1; } to { transform: scale(0.3); opacity: 0; } }
        @media (max-width: 1023px) { .phone { max-width: 300px; margin-top: 0; } }
        @media (prefers-reduced-motion: reduce) { .grid { transition: none; } .top.wipe, .divider { animation-duration: 1ms; } }
      `}</style>
    </div>
  );
}
