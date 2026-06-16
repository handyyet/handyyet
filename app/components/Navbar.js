export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/10">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
        <a href="/" className="text-3xl font-black tracking-tight">
          Handy<span className="text-orange-500">Yet</span>
        </a>
        <div className="hidden md:flex gap-8 font-bold text-sm text-zinc-700">
          <a href="/services" className="hover:text-orange-500">Services</a>
          <a href="/work" className="hover:text-orange-500">Work</a>
          <a href="/pricing" className="hover:text-orange-500">Pricing</a>
          <a href="/reviews" className="hover:text-orange-500">Reviews</a>
        </div>
        <a href="/#quote" className="bg-black text-white px-6 py-3 rounded-full font-black hover:bg-orange-500 hover:text-black transition">
          Get Quote
        </a>
      </div>
    </nav>
  );
}