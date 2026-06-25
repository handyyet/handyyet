const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
    <path fill="#4285F4" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.8 17.7 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4C43.1 36.8 46.1 31.1 46.1 24.5z"/>
    <path fill="#FBBC05" d="M10.7 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7-5.4A23.9 23.9 0 0 0 .1 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/>
    <path fill="#EA4335" d="M24 47c5.6 0 10.4-1.9 13.9-5l-7-5.4c-1.9 1.3-4.3 2-6.9 2-6.3 0-11.6-4.3-13.5-10.1l-7.9 6.1C7 40.3 14.8 47 24 47z"/>
  </svg>
);

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
              <a href="mailto:hello@handyyet.com" className="text-zinc-500 font-bold text-sm hover:text-zinc-950 transition">✉️ hello@handyyet.com</a>
              <span className="hidden md:block text-zinc-300">·</span>
              <span className="text-zinc-400 text-sm">📍 Orange County, CA</span>
            </div>
          </div>

          {/* Yelp + Google icons */}
          <div className="flex items-center gap-3">
            <a href="https://m.yelp.com/biz/handyyet-huntington-beach"
              target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-black text-sm hover:bg-red-600 transition shadow-sm">Y</a>
            <a href="https://maps.app.goo.gl/RfHEGR8dPZKsyz8d6?g_st=ic" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center hover:shadow-md transition shadow-sm">
              <GoogleIcon />
            </a>
          </div>
        </div>

        <div className="border-t border-black/08 mt-8 pt-6 text-center">
          <p className="text-zinc-400 text-sm">© 2026 HandyYet LLC. Snap. Solve. Repair.</p>
        </div>
      </div>
    </footer>
  );
}
