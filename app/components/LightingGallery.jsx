"use client";

import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/images/lighting-front-yard.jpg", title: "Front Yard" },
  { src: "/images/lighting-pool-area.jpg", title: "Pool Area" },
  { src: "/images/lighting-garden-beds.jpg", title: "Garden Beds" },
  { src: "/images/lighting-side-yard.jpg", title: "Side Yard" },
  { src: "/images/lighting-backyard-garden.jpg", title: "Backyard Garden & Pool" },
];

// Clickable areas over the 2x2 collage (percent of the collage image)
const TILE_W = 49.26;
const TILE_H = 42.13;
const hotspots = [
  { i: 0, left: 0.5, top: 14.6 },
  { i: 1, left: 50.25, top: 14.6 },
  { i: 2, left: 0.5, top: 57.3 },
  { i: 3, left: 50.25, top: 57.3 },
];

const BTN =
  "flex items-center justify-center rounded-full bg-white border-2 border-[#c8763a] text-zinc-950 font-black shadow-[0_10px_24px_-8px_rgba(200,118,58,0.45)] hover:bg-[#c8763a] hover:text-white transition";

export default function LightingGallery() {
  const [open, setOpen] = useState(null);
  const touchX = useRef(null);

  const close = () => setOpen(null);
  const next = () => setOpen((i) => (i + 1) % photos.length);
  const prev = () => setOpen((i) => (i - 1 + photos.length) % photos.length);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="grid md:grid-cols-[2fr_1fr] gap-5 mt-8 items-start">
        {/* Collage with 4 clickable tiles */}
        <figure className="relative bg-white rounded-[28px] overflow-hidden border border-black/10 shadow-sm">
          <img
            src="/images/work-landscape-lighting.jpg"
            alt="Landscape lighting replacement: front yard, pool, garden beds and side yard"
            loading="lazy"
            className="w-full h-auto block"
          />
          {hotspots.map((h) => (
            <button
              key={h.i}
              type="button"
              onClick={() => setOpen(h.i)}
              aria-label={`View ${photos[h.i].title} full size`}
              className="absolute cursor-zoom-in rounded-sm transition hover:bg-white/10 hover:ring-4 hover:ring-[#c8763a]/70 focus-visible:ring-4 focus-visible:ring-[#c8763a] outline-none"
              style={{ left: `${h.left}%`, top: `${h.top}%`, width: `${TILE_W}%`, height: `${TILE_H}%` }}
            />
          ))}
        </figure>

        {/* Backyard garden */}
        <button
          type="button"
          onClick={() => setOpen(4)}
          aria-label="View Backyard Garden & Pool full size"
          className="group bg-white rounded-[28px] overflow-hidden border border-black/10 shadow-sm cursor-zoom-in text-left"
        >
          <img
            src="/images/work-garden-lighting.jpg"
            alt="Backyard garden and pool landscape lighting replacement"
            loading="lazy"
            className="w-full h-auto block transition duration-300 group-hover:scale-[1.02]"
          />
        </button>
      </div>
      <p className="text-zinc-500 text-sm mt-4">Tap any photo to view full size.</p>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#fdfaf5]/95 backdrop-blur-sm flex flex-col"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (dx > 50) prev();
            if (dx < -50) next();
            touchX.current = null;
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-black text-zinc-950">
              {photos[open].title}
              <span className="text-zinc-400 font-bold ml-3">
                {open + 1} / {photos.length}
              </span>
            </p>
            <button type="button" onClick={close} aria-label="Close" className={`${BTN} w-11 h-11 text-xl`}>
              ×
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-3 md:px-20 pb-[max(1.25rem,env(safe-area-inset-bottom))] min-h-0">
            <img
              src={photos[open].src}
              alt={photos[open].title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className={`${BTN} hidden md:flex absolute left-5 w-12 h-12 text-2xl`}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className={`${BTN} hidden md:flex absolute right-5 w-12 h-12 text-2xl`}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
