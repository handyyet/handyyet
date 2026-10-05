"use client";

import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/images/lighting-front-yard.jpg", title: "Front Yard" },
  { src: "/images/lighting-pool-area.jpg", title: "Pool Area" },
  { src: "/images/lighting-garden-beds.jpg", title: "Garden Beds" },
  { src: "/images/lighting-side-yard.jpg", title: "Side Yard" },
  { src: "/images/lighting-backyard-garden.jpg", title: "Backyard Garden & Pool" },
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
      <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-5 mt-8">
        {photos.map((p, i) => {
          const feature = i === photos.length - 1;
          return (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View ${p.title} full size`}
              className={`group relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-black/10 shadow-sm bg-zinc-200 cursor-zoom-in outline-none focus-visible:ring-4 focus-visible:ring-[#c8763a] ${
                feature ? "col-span-2 md:col-span-1 md:col-start-3 md:row-start-1 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <img
                src={p.src}
                alt={`Landscape lighting replacement: ${p.title}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute left-3 bottom-3 md:left-4 md:bottom-4 bg-white border-2 border-[#c8763a] text-zinc-950 text-xs md:text-sm font-black px-3 py-1 rounded-full shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)]">
                {p.title}
              </span>
            </button>
          );
        })}
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
