// Trust signals shown across the site. Server-safe (no hooks).
const Shield = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8763a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const Medal = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8763a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" />
  </svg>
);
const Star = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#c8763a" aria-hidden="true">
    <path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.4L12 17.4l-5.7 3 1.1-6.4-4.6-4.5 6.4-.9z" />
  </svg>
);

const PILL = "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-zinc-950 shadow-sm";

export default function TrustBar({ className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <span className={`${PILL} border-2 border-[#c8763a]`}><Shield /> Insured handyman</span>
      <span className={`${PILL} border-2 border-[#c8763a]/40`}><Medal /> Best of Huntington Beach 2026</span>
      <span className={`${PILL} border-2 border-[#c8763a]/40`}><Star /> 220+ five-star reviews</span>
    </div>
  );
}
