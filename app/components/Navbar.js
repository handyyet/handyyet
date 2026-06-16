"use client";
import { useState, useEffect } from "react";

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
            <a href="/#quote" className="bg-zinc-950 text-white px-5 py-2.5 rounded-full font-black text-sm hover:bg-orange-500 transition-colors">Get Quote</a>
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
          <a href="/#quote" onClick={() => setOpen(false)}
            className="bg-orange-500 text-black rounded-full py-5 text-center font-black text-xl hover:bg-orange-400 transition">
            Get Quote →
          </a>
          <div className="flex flex-col items-center gap-1 pt-2">
            <a href="tel:+19498283959" className="font-bold text-zinc-600">📞 (949) 828-3959</a>
            <a href="mailto:admin@handyyet.com" className="text-zinc-400 font-bold text-sm">admin@handyyet.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
