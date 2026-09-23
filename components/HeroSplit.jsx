'use client';

// Two-column hero on desktop (text left, phone right), stacked on mobile
export default function HeroSplit({ children }) {
  return (
    <div className="hero-split">
      {children}
      <style jsx>{`
        .hero-split {
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .hero-split {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
            gap: 48px;
          }
        }
      `}</style>
    </div>
  );
}
