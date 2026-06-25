"use client";
import { useState, useEffect } from "react";

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
    <path fill="#4285F4" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.8 17.7 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4C43.1 36.8 46.1 31.1 46.1 24.5z"/>
    <path fill="#FBBC05" d="M10.7 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7-5.4A23.9 23.9 0 0 0 .1 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/>
    <path fill="#EA4335" d="M24 47c5.6 0 10.4-1.9 13.9-5l-7-5.4c-1.9 1.3-4.3 2-6.9 2-6.3 0-11.6-4.3-13.5-10.1l-7.9 6.1C7 40.3 14.8 47 24 47z"/>
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/pricing", label: "Pricing" },
    { href: "/reviews", label: "Reviews" },
    { href: "/booking", label: "Booking" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#f6f3ee]/95 backdrop-blur-md shadow-sm" : "bg-[#f6f3ee]/80 backdrop-blur-sm"} border-b border-black/05`}>
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-black tracking-tight">Handy<span className="text-orange-500">Yet</span></a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <a key={l.href} href={l.href} className="font-semibold text-sm text-zinc-500 hover:text-zinc-950 transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+19498283959" className="text-sm font-bold text-zinc-500 hover:text-zinc-950 transition">(949) 828-3959</a>
            <a href="https://g.page/r/Caqs8MHefRFaEBM/review" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 bg-white hover:shadow-md transition"
              title="Leave us a Google Review">
              <GoogleIcon />
            </a>
            <a href="/booking" className="bg-zinc-950 text-white px-5 py-2.5 rounded-full font-black text-sm hover:bg-orange-500 transition-colors">Book Now</a>
          </div>

          {/* Burger */}
          <button onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-white border border-black/10 shadow-sm">
            <span className={`block w-[18px] h-[2px] bg-zinc-950 rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-zinc-950 rounded-full transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-zinc-950 rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`fixed inset-0 z-40 bg-[#f6f3ee] flex flex-col transition-all duration-500 ease-in-out ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="h-16 flex items-center px-5 border-b border-black/05">
          <a href="/" className="text-2xl font-black">Handy<span className="text-orange-500">Yet</span></a>
        </div>
        <div className="flex flex-col px-5 pt-6 flex-1">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`text-3xl font-bold py-4 border-b border-black/06 text-zinc-800 hover:text-orange-500 transition-all duration-300 tracking-tight ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="px-5 pb-10 flex flex-col gap-3">
          <a href="/booking" onClick={() => setOpen(false)}
            className="bg-orange-500 text-black rounded-full py-5 text-center font-black text-xl hover:bg-orange-400 transition">
            Book Now →
          </a>
          <a href="https://g.page/r/Caqs8MHefRFaEBM/review" target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-white border border-black/10 rounded-full py-4 text-center font-black text-base hover:shadow-md transition">
            <GoogleIcon />
            Leave a Google Review
          </a>
          <div className="flex flex-col items-center gap-1 pt-2">
            <a href="tel:+19498283959" className="font-bold text-zinc-600">📞 (949) 828-3959</a>
            <a href="mailto:support@handyyet.com" className="text-zinc-400 font-bold text-sm">support@handyyet.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
