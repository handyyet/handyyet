"use client";
import { useEffect, useState, useRef } from "react";

// Mobile sticky action bar: call + quote, always one thumb away.
export default function SmartButton({ quoteHref = "/booking" }) {
  const [visible, setVisible] = useState(true);
  const scrollTimer = useRef(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      // Hide when scrolling down fast, show when stopped
      if (current > lastScroll.current + 5) setVisible(false);
      lastScroll.current = current;
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setVisible(true), 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer.current);
    };
  }, []);

  return (
    <div className={`fixed bottom-5 left-5 right-5 z-50 md:hidden flex gap-2 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <a href="tel:+19498283959" aria-label="Call HandyYet"
        className="shrink-0 w-[60px] bg-white border-2 border-[#c8763a] rounded-full grid place-items-center shadow-2xl">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#c8763a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
      </a>
      <a href={quoteHref}
        className="flex-1 bg-[#b4662f] border-2 border-[#b4662f] text-white rounded-full py-5 text-center font-black shadow-2xl">
        Send Photos &amp; Get Quote
      </a>
    </div>
  );
}
