"use client";
import { useEffect, useState, useRef } from "react";

export default function SmartButton() {
  const [visible, setVisible] = useState(true);
  const scrollTimer = useRef(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      // Hide when scrolling down fast, show when stopped
      if (current > lastScroll.current + 5) {
        setVisible(false);
      }
      lastScroll.current = current;

      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        setVisible(true);
      }, 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer.current);
    };
  }, []);

  return (
    <a href="#quote"
      className={`fixed bottom-5 left-5 right-5 z-50 md:hidden bg-orange-500 text-black rounded-full py-5 text-center font-black shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      Send Photos & Get Quote
    </a>
  );
}
