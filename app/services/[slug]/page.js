import { services } from "../../../lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function Navbar() {
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/10"><div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between"><a href="/" className="text-3xl font-black">Handy<span className="text-orange-500">Yet</span></a><a href="/#quote" className="bg-black text-white px-6 py-3 rounded-full font-black">Get Quote</a></div></nav>;
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <main className="p-10">Service not found</main>;
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-orange-500 font-black uppercase tracking-widest">{service.title}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">{service.hero}</h1>
          <p className="mt-8 text-xl text-zinc-600 leading-relaxed max-w-xl">{service.description}</p>
          <p className="mt-6 text-4xl font-black text-orange-500">{service.price}</p>
          <div className="mt-8 flex gap-4"><a href="/#quote" className="bg-orange-500 text-black px-8 py-5 rounded-full font-black">Get Quote</a><a href="/services" className="bg-white border border-black/10 px-8 py-5 rounded-full font-black">All Services</a></div>
        </div>
        <div className="bg-white rounded-[40px] p-3 shadow-2xl border border-black/10"><img src={service.images[0]} alt={service.title} className="rounded-[32px] w-full h-[520px] object-cover bg-zinc-200" /></div>
      </section>
      <section className="max-w-7xl mx-auto px-5 py-20"><div className="grid md:grid-cols-4 gap-5">{service.bullets.map((item) => <div key={item} className="bg-white rounded-[28px] p-6 border border-black/10 font-black">✓ {item}</div>)}</div></section>
      <section className="max-w-7xl mx-auto px-5 py-20"><h2 className="text-5xl md:text-7xl font-black tracking-tight mb-12">Example work.</h2><div className="grid md:grid-cols-3 gap-5">{service.images.map((img) => <img key={img} src={img} alt={service.title} className="rounded-[32px] h-80 w-full object-cover bg-zinc-200 border border-black/10" />)}</div></section>
    </main>
  );
}
