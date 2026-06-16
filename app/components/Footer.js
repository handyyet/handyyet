export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-14 bg-[#f6f3ee]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="/" className="text-2xl font-black">Handy<span className="text-orange-500">Yet</span></a>
            <div className="flex gap-3 mt-5">
              <a href="https://www.yelp.com/biz/handyyet" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-black text-sm hover:bg-red-600 transition">Y</a>
              <a href="https://g.co/kgs/handyyet" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center font-black text-sm hover:bg-zinc-100 transition">G</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-black text-sm uppercase tracking-widest text-zinc-400 mb-4">Navigation</p>
            <div className="flex flex-col gap-3">
              {[["Services", "/services"], ["Our Work", "/work"], ["Pricing", "/pricing"], ["Reviews", "/reviews"]].map(([label, href]) => (
                <a key={href} href={href} className="font-bold text-zinc-600 hover:text-zinc-950 transition">{label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-black text-sm uppercase tracking-widest text-zinc-400 mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="tel:+19498283959" className="font-bold text-zinc-600 hover:text-zinc-950 transition">📞 (949) 828-3959</a>
              <a href="mailto:admin@handyyet.com" className="font-bold text-zinc-600 hover:text-zinc-950 transition">✉️ admin@handyyet.com</a>
              <p className="text-zinc-500">📍 Orange County, CA</p>
            </div>
          </div>
        </div>

        <div className="border-t border-black/08 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 text-sm">© 2026 HandyYet LLC. Snap. Solve. Repair.</p>
          <div className="flex gap-6">
            <a href="https://www.yelp.com/biz/handyyet" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-zinc-400 hover:text-red-500 transition">Yelp</a>
            <a href="https://g.co/kgs/handyyet" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-zinc-400 hover:text-zinc-950 transition">Google</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
