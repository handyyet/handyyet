import { services } from "../../lib/services";

function Navbar() {
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/10"><div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between"><a href="/" className="text-3xl font-black">Handy<span className="text-orange-500">Yet</span></a><a href="/#quote" className="bg-black text-white px-6 py-3 rounded-full font-black">Get Quote</a></div></nav>;
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">HandyYet Services</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">Home services<br />made simple.</h1>
        <p className="mt-8 text-xl text-zinc-600 max-w-2xl leading-relaxed">Choose a service, send photos, and get a fast quote for clean, reliable handyman work.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {services.map((service) => (
            <a href={`/services/${service.slug}`} key={service.slug} className="group bg-white rounded-[32px] p-7 border border-black/10 hover:-translate-y-2 hover:shadow-2xl transition duration-300">
              <div className="text-5xl">{service.icon}</div><h2 className="text-2xl font-black mt-6">{service.title}</h2><p className="mt-3 text-zinc-500 leading-relaxed">{service.short}</p><p className="mt-5 text-orange-500 font-black">{service.price}</p><div className="mt-6 font-black text-orange-500">Learn more →</div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
