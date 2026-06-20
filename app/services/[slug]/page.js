"use client";

import { notFound, useParams } from "next/navigation";
import { services } from "../../../lib/services";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";

// ─── Photo Modal (mobile tap) ──────────────────────────────────────────────────
function PhotoModal({ image, serviceTitle, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const quoteUrl = `/#quote?service=${encodeURIComponent(serviceTitle)}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center md:items-center px-0 md:px-5"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-lg rounded-t-[36px] md:rounded-[36px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div className="relative">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/50 text-white rounded-full font-black text-lg flex items-center justify-center backdrop-blur-sm"
          >
            ×
          </button>
        </div>
        {/* Info */}
        <div className="p-7">
          <p className="text-orange-500 font-black text-xl leading-snug">{image.title}</p>
          <p className="text-zinc-600 mt-3 leading-relaxed">{image.desc}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="bg-orange-500 text-black text-xl font-black px-5 py-2.5 rounded-full">
              {image.price}
            </span>
            <a
              href={quoteUrl}
              onClick={onClose}
              className="bg-zinc-950 text-white text-sm font-black px-5 py-2.5 rounded-full hover:bg-orange-500 hover:text-black transition"
            >
              Book this →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Flip Card Component ───────────────────────────────────────────────────────
function FlipCard({ image, serviceTitle }) {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Handyman → plain image, no interaction
  if (!image.title) {
    return (
      <img
        src={image.src}
        alt="Work photo"
        className="rounded-[24px] h-44 md:h-72 w-full object-cover object-center bg-zinc-200 border border-black/10"
      />
    );
  }

  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const handleClick = () => {
    if (isTouchDevice) {
      setModalOpen(true);
    } else {
      setFlipped((f) => !f);
    }
  };

  return (
    <>
      {modalOpen && <PhotoModal image={image} serviceTitle={serviceTitle} onClose={() => setModalOpen(false)} />}

      <div
        className="h-44 md:h-72 w-full cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={handleClick}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) setFlipped(true);
        }}
        onMouseLeave={() => {
          if (window.matchMedia("(hover: hover)").matches) setFlipped(false);
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            className="absolute inset-0 rounded-[24px] overflow-hidden border border-black/10"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover object-center bg-zinc-200"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm md:hidden">
              Tap for info
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm hidden md:block">
              Hover for info
            </div>
          </div>

          {/* Back (desktop only) */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 rounded-[24px] bg-zinc-950 border border-black/10 flex flex-col justify-between p-6"
          >
            <div>
              <p className="text-orange-500 font-black text-base leading-snug">{image.title}</p>
              <p className="text-zinc-300 text-sm mt-2 leading-relaxed">{image.desc}</p>
            </div>
            <div className="mt-2 inline-block bg-orange-500 text-black text-sm font-black px-3 py-1.5 rounded-full">
              {image.price}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Thank You Modal ───────────────────────────────────────────────────────────
function ThankYouModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-5"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[40px] p-8 md:p-12 max-w-md w-full shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-3xl font-black tracking-tight">Thank you!</h2>
        <p className="mt-4 text-zinc-600 leading-relaxed text-lg">
          Your request has been received. We'll reach out via <span className="font-black text-zinc-950">text or email</span> shortly to confirm details and schedule your visit.
        </p>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-orange-500 hover:bg-orange-400 text-black rounded-full py-4 font-black text-lg transition"
        >
          Got it →
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ServicePage() {
  const params = useParams();
  const slug = params?.slug;
  const service = services.find((item) => item.slug === slug);

  const [showModal, setShowModal] = useState(false);

  if (!service) {
    notFound();
    return null;
  }

  const isHandyman = slug === "handyman-repairs";
  const ctaLabel = isHandyman ? "Book Now" : "Get Quote";

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      {showModal && <ThankYouModal onClose={() => setShowModal(false)} />}

      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 pt-28 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-orange-500 font-black uppercase tracking-widest text-sm">{service.title}</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mt-3">{service.hero}</h1>
          <p className="mt-6 text-lg text-zinc-600 leading-relaxed">{service.description}</p>
          <p className="mt-5 text-3xl font-black text-orange-500">{service.price}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`/#quote?service=${encodeURIComponent(service.title)}`} className="bg-orange-500 text-black px-7 py-4 rounded-full font-black shadow-xl hover:scale-105 transition">{ctaLabel}</a>
            <a href="/services" className="bg-white border border-black/10 px-7 py-4 rounded-full font-black hover:bg-zinc-100 transition">All Services</a>
          </div>
        </div>
        <div className="bg-white rounded-[36px] p-2.5 shadow-2xl border border-black/10">
          <img src={service.heroImage} alt={service.title}
            className="rounded-[28px] w-full h-[380px] md:h-[480px] object-cover object-center bg-zinc-200" />
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

      {/* Gallery with Flip Cards */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Gallery</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-2">Example work.</h2>
        {!isHandyman && (
          <p className="text-zinc-400 text-sm font-bold mb-6">
            <span className="md:hidden">Tap a photo to see details and price.</span>
            <span className="hidden md:inline">Hover over a photo to see details and price.</span>
          </p>
        )}
        {isHandyman && <div className="mb-6" />}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {service.images.map((img, i) => (
            <FlipCard key={i} image={img} serviceTitle={service.title} />
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
                {["No phone calls", "Fast response", isHandyman ? "$70/hr — no surprises" : "Fair pricing"].map(f => (
                  <span key={f} className="bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-full">✓ {f}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a href={`/#quote?service=${encodeURIComponent(service.title)}`} className="bg-orange-500 text-black px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-orange-400 hover:scale-105 transition shadow-xl">
                {ctaLabel} →
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
