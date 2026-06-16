export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-10 bg-[#f6f3ee]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand + contacts */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="/" className="text-2xl font-black">Handy<span className="text-orange-500">Yet</span></a>
            <div className="flex flex-col md:flex-row items-center gap-3 mt-1">
              <a href="tel:+19498283959" className="text-zinc-500 font-bold text-sm hover:text-zinc-950 transition">📞 (949) 828-3959</a>
              <span className="hidden md:block text-zinc-300">·</span>
              <a href="mailto:admin@handyyet.com" className="text-zinc-500 font-bold text-sm hover:text-zinc-950 transition">✉️ admin@handyyet.com</a>
              <span className="hidden md:block text-zinc-300">·</span>
              <span className="text-zinc-400 text-sm">📍 Orange County, CA</span>
            </div>
          </div>

          {/* Yelp + Google icons */}
          <div className="flex items-center gap-3">
            <a href="https://www.yelp.com/search?find_desc=handyyet&find_loc=Orange+County%2C+CA" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-black text-sm hover:bg-red-600 transition shadow-sm">Y</a>
            <a href="https://www.google.com/search?q=handyyet+orange+county" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center font-black text-sm hover:bg-zinc-100 transition shadow-sm">G</a>
          </div>
        </div>

        <div className="border-t border-black/08 mt-8 pt-6 text-center">
          <p className="text-zinc-400 text-sm">© 2026 HandyYet LLC. Snap. Solve. Repair.</p>
        </div>
      </div>
    </footer>
  );
}
