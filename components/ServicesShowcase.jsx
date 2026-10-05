'use client';
import { useEffect, useRef, useState } from 'react';

// Example 2-hour visits: [task, price if booked as a separate service]
const VISITS = [
  [['Mount TV', 80], ['Install smart lock', 65], ['Replace kitchen faucet', 80], ['Swap light fixture', 70]],
  [['Assemble dresser', 70], ['Hang floating shelves', 80], ['Set up video doorbell', 65], ['Replace outlets', 70]],
  [['Replace ceiling fan', 70], ['Fix running toilet', 80], ['Mount mirror', 80], ['Install smart thermostat', 65]],
];
const VISIT_HOURS = 2;
const HOURLY = 65;
const TAGS = ['Electrical', 'Plumbing', 'Smart Home', 'Mounting', 'Assembly', 'Repairs'];
const STEP_MS = 900;
const HOLD_MS = 3200;
const BRONZE = '#c8763a';
const CREAM = '#fdfaf5';

export default function ServicesShowcase({ services = [] }) {
  const rootRef = useRef(null);
  const [visit, setVisit] = useState(0);
  const [done, setDone] = useState(0); // how many items are checked
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  // start animating only when the block is on screen
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.3 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) { setDone(VISITS[0].length); return; }
    if (!active) return;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      let v = visit;
      while (!cancelled) {
        setVisit(v);
        setDone(0);
        await wait(500);
        for (let i = 1; i <= VISITS[v].length && !cancelled; i++) {
          setDone(i);
          await wait(STEP_MS);
        }
        setDone(VISITS[v].length + 1); // total appears, gets crossed out, one-visit price pops
        await wait(1200);
        await wait(HOLD_MS);
        v = (v + 1) % VISITS.length;
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  const items = VISITS[visit];
  const allDone = done >= items.length;
  const showDeal = done > items.length;
  const separate = items.reduce((sum, [, price]) => sum + price, 0);

  return (
    <div ref={rootRef} className="showcase">
      {/* Left: animated visit ticket */}
      <div className="ticket" aria-hidden="true">
        <div className="ticket-head">
          <span className="dot" />
          <span>Example visit</span>
          <span className="count">{Math.min(done, items.length)}/{items.length} done</span>
        </div>
        <ul key={visit}>
          {items.map(([t, price], i) => (
            <li key={t} className={i < done ? 'checked' : ''} style={{ animationDelay: `${i * 80}ms` }}>
              <span className="box">
                <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              <span className="label">{t}</span>
              <span className="item-price">${price}</span>
            </li>
          ))}
        </ul>
        <div className={`total ${allDone ? 'show' : ''}`}>
          <div className="total-row">
            <span className="total-label">Booked separately</span>
            <span className={`old ${showDeal ? 'struck' : ''}`}>${separate}</span>
          </div>
          <div className={`deal ${showDeal ? 'show' : ''}`}>
            <span>One visit · {VISIT_HOURS} hrs</span>
            <strong>${VISIT_HOURS * HOURLY}</strong>
          </div>
        </div>
      </div>

      {/* Right: pitch + all services */}
      <div className="pitch">
        <p className="lead">
          Don't book five different pros. Make one list and I'll handle it in a single visit at ${HOURLY}/hr.
        </p>
        <div className="tags">
          {TAGS.map((t, i) => (
            <span key={t} className="tag" style={{ animationDelay: `${i * 0.35}s` }}>{t}</span>
          ))}
        </div>
        <div className="list">
          {services.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}`} className="row">
              <span className="title">{s.title}</span>
              <span className="price">{s.price}</span>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
        <a href="/booking" className="cta">Book one visit →</a>
      </div>

      <style jsx>{`
        .showcase {
          display: grid; grid-template-columns: 1fr; gap: 28px;
          background: ${CREAM}; border: 2px solid ${BRONZE}33; border-radius: 36px;
          padding: 22px; box-shadow: 0 30px 60px -30px rgba(120, 70, 30, 0.25);
        }
        @media (min-width: 900px) {
          .showcase { grid-template-columns: 1fr 1fr; gap: 48px; padding: 44px; }
        }

        /* ticket */
        .ticket {
          position: relative; background: #fff; border: 2px solid ${BRONZE}; border-radius: 28px;
          padding: 22px; box-shadow: 0 16px 40px -18px rgba(120, 70, 30, 0.35);
        }
        .ticket-head {
          display: flex; align-items: center; gap: 10px; font-weight: 900; color: #18181b;
          padding-bottom: 14px; border-bottom: 1px dashed #e7d8c8; margin-bottom: 8px;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; border: 2px solid ${BRONZE}; animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse { 50% { transform: scale(1.35); opacity: .5; } }
        .count { margin-left: auto; font-size: 13px; color: #71717a; font-variant-numeric: tabular-nums; }
        ul { list-style: none; margin: 0; padding: 0; }
        li {
          display: flex; align-items: center; gap: 14px; padding: 14px 4px;
          border-bottom: 1px solid #f3ece2; opacity: 0; transform: translateY(8px);
          animation: in .45s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes in { to { opacity: 1; transform: none; } }
        .box {
          width: 26px; height: 26px; flex: none; border-radius: 8px; border: 2px solid #d9c7b4;
          display: grid; place-items: center; transition: border-color .3s, background .3s;
        }
        .box svg { width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset .35s ease .1s; }
        .label { font-weight: 700; color: #3f3f46; transition: color .3s; }
        li.checked .box { border-color: ${BRONZE}; background: ${BRONZE}; }
        li.checked .box svg { stroke-dashoffset: 0; }
        li.checked .label { color: #a1a1aa; text-decoration: line-through; text-decoration-color: ${BRONZE}; }
        .item-price { margin-left: auto; font-weight: 800; color: #52525b; font-variant-numeric: tabular-nums; transition: color .3s; }
        li.checked .item-price { color: #a1a1aa; }
        .total { margin-top: 14px; padding-top: 14px; border-top: 2px dashed #e7d8c8; min-height: 92px;
          opacity: .35; transition: opacity .4s; }
        .total.show { opacity: 1; }
        .total-row { display: flex; align-items: center; font-weight: 800; color: #52525b; }
        .total-label { font-size: 14px; }
        .old { position: relative; margin-left: auto; font-size: 22px; font-weight: 900; color: #3f3f46;
          font-variant-numeric: tabular-nums; transition: color .4s; }
        .old::after { content: ''; position: absolute; left: -4px; right: -4px; top: 52%; height: 3px;
          background: ${BRONZE}; border-radius: 2px; transform: scaleX(0); transform-origin: left;
          transition: transform .45s cubic-bezier(.65,0,.35,1); }
        .old.struck { color: #a1a1aa; }
        .old.struck::after { transform: scaleX(1); }
        .deal { display: flex; align-items: center; justify-content: space-between; margin-top: 10px;
          padding: 10px 16px; border: 2px solid ${BRONZE}; border-radius: 999px; background: #fff;
          font-weight: 900; color: #18181b; opacity: 0; transform: scale(.9);
          transition: opacity .3s .35s, transform .5s cubic-bezier(.34,1.56,.64,1) .35s; }
        .deal.show { opacity: 1; transform: scale(1); }
        .deal strong { font-size: 26px; color: ${BRONZE}; font-variant-numeric: tabular-nums; }

        /* pitch */
        .pitch { display: flex; flex-direction: column; justify-content: center; }
        .lead { font-size: 1.25rem; line-height: 1.5; color: #52525b; margin: 0; }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 22px; }
        .tag {
          padding: 6px 14px; border-radius: 999px; border: 2px solid ${BRONZE}55; background: #fff;
          font-size: 13px; font-weight: 800; color: #3f3f46; animation: glow 2.1s ease-in-out infinite;
        }
        @keyframes glow { 0%, 70%, 100% { border-color: ${BRONZE}55; } 35% { border-color: ${BRONZE}; } }
        .list { border-top: 1px solid #eadfd2; }
        .row {
          display: flex; align-items: center; gap: 12px; padding: 14px 4px;
          border-bottom: 1px solid #eadfd2; text-decoration: none; color: #18181b;
        }
        .title { font-weight: 900; }
        .price { margin-left: auto; font-weight: 800; color: ${BRONZE}; font-size: 14px; }
        .arrow { color: ${BRONZE}; transition: transform .25s; }
        .row:hover .arrow { transform: translateX(4px); }
        .cta {
          margin-top: 24px; align-self: flex-start; padding: 16px 28px; border-radius: 999px;
          border: 2px solid ${BRONZE}; background: #fff; color: #18181b; font-weight: 900; text-decoration: none;
          transition: background .25s, color .25s, box-shadow .25s;
        }
        .cta:hover { background: ${BRONZE}; color: #fff; box-shadow: 0 10px 24px -8px ${BRONZE}; }
        @media (max-width: 899px) { .cta { align-self: stretch; text-align: center; } }

        @media (prefers-reduced-motion: reduce) {
          li, .dot, .tag { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
