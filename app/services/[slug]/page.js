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
  return { title: `${service.title} | HandyYet`, description: service.description };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 pt-28 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-orange-500 font-black uppercase tracking-widest text-sm">{service.title}</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mt-3">{service.hero}</h1>
          <p className="mt-6 text-lg text-zinc-600 leading-relaxed">{service.description}</p>
          <p className="mt-5 text-3xl font-black text-orange-500">{service.price}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/#quote" className="bg-orange-500 text-black px-7 py-4 rounded-full font-black shadow-xl hover:scale-105 transition">Get Quote</a>
            <a href="/services" className="bg-white border border-black/10 px-7 py-4 rounded-full font-black hover:bg-zinc-100 transition">All Services</a>
          </div>
        </div>
        <div className="bg-white rounded-[36px] p-2.5 shadow-2xl border border-black/10">
          <img src={service.heroImage} alt={service.title}
            className="rounded-[28px] w-full h-[380px] md:h-[480px] object-cover object-center bg-zinc-200" />
        </div>
      </section>

      {/* Info cards */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          {[
            { icon: "⏱️", label: "Estimated time", value: service.time },
            { icon: "📊", label: "Difficulty", value: service.difficulty },
            { icon: "📦", label: "Materials", value: service.materials },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-[24px] p-4 md:p-7 border border-black/10 flex flex-col gap-2">
              <p className="text-2xl">{item.icon}</p>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 leading-tight">{item.label}</p>
              <p className="text-base md:text-xl font-black leading-tight">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bullets */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <p className="text-orange-500 font-black uppercase tracking-widest text-sm">What's included</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-6">Everything you need.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {service.bullets.map((item) => (
            <div key={item} className="bg-white rounded-[20px] p-5 border border-black/10 hover:-translate-y-1 hover:shadow-xl transition">
              <div className="text-orange-500 text-xl font-black">✓</div>
              <p className="font-black mt-2 text-sm md:text-base leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After */}
      {service.beforeAfter && (
        <section className="max-w-7xl mx-auto px-5 pb-16">
          <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Before & After</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-6">See the difference.</h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="relative bg-white rounded-[28px] overflow-hidden border border-black/10">
              <img src={service.beforeAfter.before} alt="Before" className="w-full h-52 md:h-96 object-cover object-center" />
              <div className="absolute top-3 left-3 bg-zinc-950 text-white px-4 py-1.5 rounded-full font-black text-xs md:text-sm">Before</div>
            </div>
            <div className="relative bg-white rounded-[28px] overflow-hidden border border-black/10">
              <img src={service.beforeAfter.after} alt="After" className="w-full h-52 md:h-96 object-cover object-center" />
              <div className="absolute top-3 left-3 bg-orange-500 text-black px-4 py-1.5 rounded-full font-black text-xs md:text-sm">After</div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Gallery</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-6">Example work.</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {service.images.map((img, i) => (
            <img key={img} src={img} alt={`${service.title} ${i + 1}`}
              className="rounded-[24px] h-44 md:h-72 w-full object-cover object-center bg-zinc-200 border border-black/10 hover:-translate-y-1 hover:shadow-xl transition duration-300" />
          ))}
        </div>
      </section>

      {/* Reviews */}
      {service.reviews && (
        <section className="max-w-7xl mx-auto px-5 pb-16">
          <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Reviews</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-6">What clients say.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-[24px] p-6 border border-black/10">
                <p className="text-orange-500">★★★★★</p>
                <p className="mt-3 text-zinc-700 leading-relaxed">"{review.text}"</p>
                <p className="mt-4 text-zinc-400 text-sm font-bold">{review.date} · Verified client</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs && (
        <section className="max-w-7xl mx-auto px-5 pb-16">
          <p className="text-orange-500 font-black uppercase tracking-widest text-sm">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-6">Common questions.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-[24px] p-6 border border-black/10">
                <p className="font-black">{faq.q}</p>
                <p className="text-zinc-500 mt-2 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="relative bg-zinc-950 rounded-[36px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#ff6a0030,transparent_60%)]" />
          <div className="relative p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Get Started</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-2">Ready to book?</h2>
              <p className="mt-3 text-zinc-400 text-lg">Send photos — we'll reply with a quote fast.</p>
              <div className="flex flex-wrap gap-3 mt-5">
                {["No phone calls", "Fast response", "Fair pricing"].map(f => (
                  <span key={f} className="bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-full">✓ {f}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a href="/#quote" className="bg-orange-500 text-black px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-orange-400 hover:scale-105 transition shadow-xl">
                Send Photos →
              </a>
              <a href="tel:+19498283959" className="bg-white/10 text-white px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-white/20 transition">
                📞 (949) 828-3959
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
