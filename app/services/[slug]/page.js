import { notFound } from "next/navigation";
import { services } from "../../../lib/services";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | HandyYet`,
    description: service.description,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-orange-500 font-black uppercase tracking-widest">{service.title}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">{service.hero}</h1>
          <p className="mt-8 text-xl text-zinc-600 leading-relaxed max-w-xl">{service.description}</p>
          <p className="mt-6 text-4xl font-black text-orange-500">{service.price}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/#quote" className="bg-orange-500 text-black px-8 py-5 rounded-full font-black shadow-xl hover:scale-105 transition">Get Quote</a>
            <a href="/services" className="bg-white border border-black/10 px-8 py-5 rounded-full font-black hover:bg-zinc-100 transition">All Services</a>
          </div>
        </div>
        <div className="bg-white rounded-[40px] p-3 shadow-2xl border border-black/10 rotate-1 hover:rotate-0 transition duration-500">
          <img src={service.heroImage} alt={`${service.title} example`} className="rounded-[32px] w-full h-[520px] object-cover bg-zinc-200" />
        </div>
      </section>

      {/* Job info cards — light */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white rounded-[28px] p-7 border border-black/10">
            <p className="text-3xl">⏱️</p>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mt-4">Estimated time</p>
            <p className="text-2xl font-black mt-2">{service.time}</p>
          </div>
          <div className="bg-white rounded-[28px] p-7 border border-black/10">
            <p className="text-3xl">📊</p>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mt-4">Difficulty</p>
            <p className="text-2xl font-black mt-2">{service.difficulty}</p>
          </div>
          <div className="bg-white rounded-[28px] p-7 border border-black/10">
            <p className="text-3xl">📦</p>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mt-4">Materials</p>
            <p className="text-2xl font-black mt-2">{service.materials}</p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">What's included</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-8">Everything you need.</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {service.bullets.map((item) => (
            <div key={item} className="bg-white rounded-[28px] p-6 border border-black/10 hover:-translate-y-1 hover:shadow-xl transition">
              <div className="text-orange-500 text-2xl font-black">✓</div>
              <p className="font-black mt-3 text-lg">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After */}
      {service.beforeAfter && (
        <section className="max-w-7xl mx-auto px-5 pb-20">
          <p className="text-orange-500 font-black uppercase tracking-widest">Before & After</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-8">See the difference.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative bg-white rounded-[36px] overflow-hidden border border-black/10 shadow-sm">
              <img src={service.beforeAfter.before} alt="Before" className="w-full h-96 object-cover" />
              <div className="absolute top-5 left-5 bg-zinc-950 text-white px-5 py-2 rounded-full font-black text-sm">Before</div>
            </div>
            <div className="relative bg-white rounded-[36px] overflow-hidden border border-black/10 shadow-sm">
              <img src={service.beforeAfter.after} alt="After" className="w-full h-96 object-cover" />
              <div className="absolute top-5 left-5 bg-orange-500 text-black px-5 py-2 rounded-full font-black text-sm">After</div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">Gallery</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-8">Example work.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {service.images.map((img, i) => (
            <img key={img} src={img} alt={`${service.title} example ${i + 1}`} className="rounded-[32px] h-72 w-full object-cover bg-zinc-200 border border-black/10 hover:-translate-y-2 hover:shadow-2xl transition duration-300" />
          ))}
        </div>
      </section>

      {/* Service-specific reviews */}
      {service.reviews && (
        <section className="max-w-7xl mx-auto px-5 pb-20">
          <p className="text-orange-500 font-black uppercase tracking-widest">Reviews</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-8">What clients say.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {service.reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-[28px] p-7 border border-black/10">
                <p className="text-orange-500 text-xl">★★★★★</p>
                <p className="mt-4 text-zinc-700 leading-relaxed text-lg">"{review.text}"</p>
                <p className="mt-5 text-zinc-400 text-sm font-bold">{review.date} · Verified client</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs && (
        <section className="max-w-7xl mx-auto px-5 pb-20">
          <p className="text-orange-500 font-black uppercase tracking-widest">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-8">Common questions.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-[28px] p-7 border border-black/10">
                <p className="font-black text-lg">{faq.q}</p>
                <p className="text-zinc-500 mt-3 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-28">
        <div className="bg-orange-500 rounded-[44px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Ready to book?</h2>
            <p className="mt-4 text-black/70 text-xl">Send photos and get a fast quote — no phone calls needed.</p>
          </div>
          <a href="/#quote" className="bg-zinc-950 text-white px-10 py-6 rounded-full font-black text-xl whitespace-nowrap hover:scale-105 transition shadow-xl">
            Send Photos →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
