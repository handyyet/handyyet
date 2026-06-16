"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/pricing", label: "Pricing" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f6f3ee]/90 backdrop-blur border-b border-black/05">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-black">Handy<span className="text-orange-500">Yet</span></a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className="font-bold text-zinc-600 hover:text-zinc-950 transition">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="/#quote" className="hidden md:inline-flex bg-zinc-950 text-white px-5 py-2.5 rounded-full font-black text-sm hover:bg-zinc-800 transition">Get Quote</a>
            {/* Burger */}
            <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white border border-black/10">
              <span className={`block w-5 h-0.5 bg-zinc-950 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-zinc-950 transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-zinc-950 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#f6f3ee] flex flex-col pt-20 px-5 pb-10" onClick={() => setOpen(false)}>
          <div className="flex flex-col gap-2 mt-4">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-4xl font-black py-4 border-b border-black/08 hover:text-orange-500 transition">
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <a href="/#quote" className="bg-orange-500 text-black rounded-full py-5 text-center font-black text-xl">Get Quote →</a>
            <div className="flex items-center justify-center gap-6 pt-4">
              <a href="tel:+19498283959" className="font-bold text-zinc-600">📞 (949) 828-3959</a>
            </div>
            <a href="mailto:admin@handyyet.com" className="text-center text-zinc-400 font-bold text-sm">admin@handyyet.com</a>
          </div>
        </div>
      )}
    </>
  );
}
