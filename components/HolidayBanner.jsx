'use client';
import { useEffect, useState } from 'react';

// Seasonal promo for holiday / permanent lights. Shows Nov 1 – Dec 24, hides itself the rest of the year.
const BRONZE = '#c8763a';

export default function HolidayBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const d = new Date();
    const m = d.getMonth(); // 10 = Nov, 11 = Dec
    setShow(m === 10 || (m === 11 && d.getDate() <= 24));
  }, []);
  if (!show) return null;

  return (
    <section className="max-w-7xl mx-auto px-5 py-8">
      <a href="/services/holiday-lights" className="hb group">
        <div className="media">
          <video src="/video/holiday-lights.mp4" poster="/images/holiday-hero.jpg" autoPlay muted loop playsInline />
        </div>
        <div className="copy">
          <p className="kicker">Holiday season</p>
          <h2>
            Holiday lights,<br />done for you.
          </h2>
          <p className="sub">
            Christmas string lights and permanent RGB eave lights, installed clean and set up on your phone. Change colors for every holiday.
          </p>
          <div className="row">
            <span className="cta">See holiday lights →</span>
            <span className="price">From $250</span>
          </div>
        </div>
        <div className="dots" aria-hidden="true">
          {['#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899', '#22c55e', '#3b82f6'].map((c, i) => (
            <i key={i} style={{ background: c, animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
      </a>
      <style jsx>{`
        .hb {
          position: relative; display: grid; grid-template-columns: 1fr; overflow: hidden; text-decoration: none; color: #18181b;
          background: #fdfaf5; border: 2px solid ${BRONZE}; border-radius: 36px;
          box-shadow: 0 30px 60px -30px rgba(120, 70, 30, 0.4); transition: transform .3s, box-shadow .3s;
        }
        .hb:hover { transform: translateY(-3px); box-shadow: 0 36px 70px -30px rgba(120, 70, 30, 0.5); }
        @media (min-width: 900px) { .hb { grid-template-columns: 0.8fr 1.2fr; } }
        .media { position: relative; aspect-ratio: 4 / 3; overflow: hidden; }
        @media (min-width: 900px) { .media { aspect-ratio: auto; min-height: 320px; } }
        .media video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .copy { padding: 28px 24px 40px; display: flex; flex-direction: column; justify-content: center; }
        @media (min-width: 900px) { .copy { padding: 44px 48px 52px; } }
        .kicker { margin: 0; font-size: 13px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; color: ${BRONZE}; }
        h2 { margin: 10px 0 0; font-size: clamp(32px, 4.6vw, 56px); line-height: .95; font-weight: 900; letter-spacing: -0.03em; }
        .sub { margin: 16px 0 0; color: #52525b; font-size: 17px; line-height: 1.5; max-width: 520px; }
        .row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 24px; }
        .cta { padding: 14px 24px; border-radius: 999px; border: 2px solid ${BRONZE}; background: #fff; font-weight: 900; transition: background .25s, color .25s; }
        .hb:hover .cta { background: ${BRONZE}; color: #fff; }
        .price { font-weight: 900; color: ${BRONZE}; font-size: 18px; }
        .dots { position: absolute; left: 0; right: 0; bottom: 14px; display: flex; justify-content: center; gap: 18px; pointer-events: none; }
        @media (min-width: 900px) { .dots { left: 40%; } }
        .dots i { width: 9px; height: 9px; border-radius: 50%; opacity: .35; animation: twinkle 1.6s ease-in-out infinite; }
        @keyframes twinkle { 50% { opacity: 1; box-shadow: 0 0 10px 2px currentColor; transform: scale(1.25); } }
        @media (prefers-reduced-motion: reduce) { .dots i { animation: none; opacity: .8; } }
      `}</style>
    </section>
  );
}
