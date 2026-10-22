'use client';
import { useEffect, useState } from 'react';

// Freshest client reviews, shown until (and if) Google returns live ones
const FALLBACK = [
  { author: 'Verified client', service: 'Electrical', when: 'Oct 17, 2026', text: 'I had a very difficult chandelier to install with a mess of cut wires, and he went above and beyond to get everything working perfectly. He took the chandelier apart, carefully rewired everything, and made sure every detail was just right. He also installed a dimmer switch for me!' },
  { author: 'Verified client', service: 'Plumbing', when: 'Oct 11, 2026', text: 'This was my second time booking Nikita, and once again, he exceeded every expectation. My baby was napping, and he made a deliberate effort to keep noise levels down throughout the entire job, which was incredibly considerate.' },
  { author: 'Verified client', service: 'Sealing & Caulking', when: 'Oct 10, 2026', text: 'Nikita was great! He replaced the caulking on my shower and hung lights and a shelf. He works quickly but meticulously. Highly recommend.' },
  { author: 'Verified client', service: 'Electrical', when: 'Oct 9, 2026', text: 'Nikita replaced a broken outdoor light set for me. Clear communication. Very professional and organized. I highly recommend!' },
  { author: 'Verified client', service: 'Plumbing', when: 'Oct 4, 2026', text: 'Nikita was punctual and fast! He knew exactly what to do and he cleaned up afterwards. Will book again for sure.' },
  { author: 'Verified client', service: 'General Mounting', when: 'Oct 6, 2026', text: 'Nikita is amazing, we highly recommend him and he always does quality work.' },
];

const G = () => (
  <svg viewBox="0 0 48 48" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path fill="#4285F4" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.8 17.7 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4C43.1 36.8 46.1 31.1 46.1 24.5z"/>
    <path fill="#FBBC05" d="M10.7 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7-5.4A23.9 23.9 0 0 0 .1 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/>
    <path fill="#EA4335" d="M24 47c5.6 0 10.4-1.9 13.9-5l-7-5.4c-1.9 1.3-4.3 2-6.9 2-6.3 0-11.6-4.3-13.5-10.1l-7.9 6.1C7 40.3 14.8 47 24 47z"/>
  </svg>
);

export default function GoogleReviews() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/google-reviews').then((r) => r.json()).then(setData).catch(() => setData({ reviews: [] }));
  }, []);

  const live = data?.reviews?.length ? data.reviews : null;
  // Google gives up to 5 reviews; top up with fresh ones so the grid stays full
  const list = live ? [...live, ...FALLBACK].slice(0, 6) : FALLBACK;

  return (
    <div>
      {live && (
        <a href={data.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-5 bg-white border border-black/10 rounded-full px-4 py-2 text-sm font-black hover:shadow-md transition">
          <G /> {data.rating?.toFixed(1)} ★ on Google · {data.count} reviews
        </a>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((r, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 border border-black/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {r.photo
                  ? <img src={r.photo} alt="" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                  : <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 grid place-items-center text-xs font-black">{(r.author || 'V')[0]}</span>}
                <span className="font-black text-sm truncate">{r.author}</span>
              </div>
              <span className="text-zinc-400 text-xs font-bold whitespace-nowrap">{r.when}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-orange-500 tracking-wider">{'★'.repeat(r.rating || 5)}</span>
              {r.photo !== undefined && r.date && <G />}
              {r.service && <span className="text-xs font-black bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full">{r.service}</span>}
            </div>
            <p className="mt-3 text-zinc-700 leading-snug text-[15px] flex-1">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
