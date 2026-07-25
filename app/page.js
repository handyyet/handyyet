"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddressAutocomplete from "./components/AddressAutocomplete";
import BookingCalendar from "./components/BookingCalendar";
import ScrollReveal from "./components/ScrollReveal";
import SmartButton from "./components/SmartButton";

import { useRef, useState, useEffect } from "react";
import { services, reviews, pricing } from "../lib/services";

// Premium outline treatment — replaces flat black/orange fills
const BTN_OUTLINE =
  "border-2 border-[#c8763a] text-zinc-950 bg-white " +
  "hover:bg-[#c8763a] hover:text-white hover:border-[#c8763a] " +
  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_24px_-8px_rgba(200,118,58,0.45)] " +
  "transition-all duration-300";

// ─── Premium animation hook ────────────────────────────────────────────────────
function usePremiumReveal() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.92); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes slideRight {
        from { opacity: 0; transform: translateX(-32px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .anim-fade-up   { opacity:0; animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) forwards; }
      .anim-fade-in   { opacity:0; animation: fadeIn   0.6s ease forwards; }
      .anim-scale-in  { opacity:0; animation: scaleIn  0.7s cubic-bezier(.22,1,.36,1) forwards; }
      .anim-slide-r   { opacity:0; animation: slideRight 0.6s cubic-bezier(.22,1,.36,1) forwards; }

      [data-reveal] { opacity:0; transform: translateY(36px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
      [data-reveal].revealed { opacity:1; transform: translateY(0); }
      [data-reveal][data-scale] { transform: scale(0.93); }
      [data-reveal][data-scale].revealed { transform: scale(1); }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => { observer.disconnect(); document.head.removeChild(style); };
  }, []);
}

// ─── Thank You Modal ───────────────────────────────────────────────────────────
function ThankYouModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div className="bg-white rounded-[40px] p-8 md:p-12 max-w-md w-full shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-[3px] bg-orange-500 mx-auto mb-6 rounded-full" />
        <h2 className="text-3xl font-black tracking-tight">Thank you!</h2>
        <p className="mt-4 text-zinc-600 leading-relaxed text-lg">
          Your request has been received. We'll reach out via <span className="font-black text-zinc-950">text or email</span> shortly to confirm details and schedule your visit.
        </p>
        <button onClick={onClose} className={`mt-8 w-full ${BTN_OUTLINE} rounded-full py-4 font-black text-lg`}>
          Got it →
        </button>
      </div>
    </div>
  );
}

async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => { img.src = e.target.result; };
    reader.onerror = reject;
    img.onerror = reject;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 1280;
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        resolve(new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" }));
      }, "image/jpeg", 0.7);
    };
    reader.readAsDataURL(file);
  });
}

export default function Home() {
  const photoInputRef = useRef(null);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filesCount, setFilesCount] = useState(0);
  const [address, setAddress] = useState("");
  const [booking, setBooking] = useState(null);
  const [selectedService, setSelectedService] = useState("General quote");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  usePremiumReveal();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("service");
    if (s) setSelectedService(s);
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (paymentMethod === "card" && !form.email.value.trim()) {
      setStatus("email-required");
      form.email.focus();
      return;
    }
    setStatus("sending");
    try {
      const formData = new FormData();
      formData.append("name", form.name.value);
      formData.append("phone", form.phone.value);
      formData.append("address", form.address.value);
      formData.append("service", form.service.value);
      if (form.email.value) formData.append("email", form.email.value);
      formData.append("issue", form.issue.value);
      formData.append("paymentMethod", paymentMethod === "card" ? "Card — $50 deposit (Stripe)" : "Pay after service — any method");
      if (booking) formData.append("booking", `${booking.date.toDateString()} at ${booking.time}`);
      const files = Array.from(photoInputRef.current?.files || []);
      const compressedFiles = await Promise.all(files.slice(0, 10).map((file) => compressImage(file)));
      for (const compressed of compressedFiles) formData.append("photos", compressed);
      const res = await fetch("/api/quote", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        if (paymentMethod === "card") {
          const stripeRes = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email.value, name: form.name.value, service: form.service.value }),
          });
          const stripeData = await stripeRes.json();
          if (stripeData.url) { window.location.href = stripeData.url; return; }
        }
        setStatus("success");
        setShowModal(true);
        form.reset();
        setFilesCount(0);
        setSelectedService("General quote");
        setPaymentMethod("cash");
        if (photoInputRef.current) photoInputRef.current.value = "";
      } else { setStatus("error"); }
    } catch (err) { console.error(err); setStatus("error"); }
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950 overflow-hidden">
      {showModal && <ThankYouModal onClose={() => { setShowModal(false); setStatus(""); }} />}

      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative pt-36 md:pt-44 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ff6a0026,transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="anim-fade-up font-black tracking-tight" style={{ animationDelay: "0ms" }}>
              {/* Mobile: single line, scales with viewport, tighter tracking to fit bigger size */}
              <span className="sm:hidden block text-[8vw] leading-[0.95] tracking-tighter whitespace-nowrap">
                Snap. Solve. <span className="text-orange-500">Repair.</span>
              </span>
              {/* Tablet/desktop: original stacked display size */}
              <span className="hidden sm:block text-7xl md:text-9xl leading-[0.9]">
                Snap.<br />Solve.<br /><span className="text-orange-500">Repair.</span>
              </span>
            </h1>
            <p className="anim-fade-up mt-8 text-xl md:text-2xl text-zinc-600 max-w-xl leading-relaxed"
              style={{ animationDelay: "120ms" }}>
              Hi, I'm Nikita — a handyman for TV mounting, furniture assembly, plumbing, electrical, and smart home setup.
            </p>
          </div>
          <div className="relative anim-scale-in flex flex-col items-center" style={{ animationDelay: "180ms" }}>
            <img src="/images/nikita-portrait.png" alt="Nikita, owner and handyman at HandyYet"
              className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ─── RECENT WORK (before services) ─── */}
      <section id="work" className="max-w-7xl mx-auto px-5 py-20">
        <div data-reveal>
          <p className="text-orange-500 font-black uppercase tracking-widest">Recent Work</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3 mb-12">Real work.<br />Clean results.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { img: "/images/work-shower-fixture.jpg", title: "Shower Valve & Fixture Install", text: "Replaced the shower valve and installed a new brass handset — clean, finished result." },
            { img: "/images/work-ceiling-fan.jpg", title: "Ceiling Fan Installation", text: "Wired and mounted a new ceiling fan from a bare junction box." },
            { img: "/images/work-closet-shelving.jpg", title: "Custom Closet Shelving", text: "Built and installed a full 4-shelf system in a custom nook." },
          ].map((item, i) => (
            <div key={item.img} data-reveal data-scale style={{ transitionDelay: `${i * 80}ms` }}
              className="bg-white rounded-[36px] overflow-hidden border border-black/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-500 h-full group">
              <div className="overflow-hidden">
                <img src={item.img} alt={item.title}
                  className="w-full aspect-[1360/1010] object-cover bg-zinc-200 group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 text-zinc-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="max-w-7xl mx-auto px-5 py-20">
        <div data-reveal>
          <p className="text-orange-500 font-black uppercase tracking-widest">Services</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3 mb-12">One call.<br />Many fixes.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <div key={service.slug} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <a href={`/services/${service.slug}`}
                className="group bg-white rounded-[32px] p-7 border border-black/10 hover:-translate-y-3 hover:shadow-2xl hover:border-orange-200 transition duration-400 block h-full">
                <h3 className="text-2xl font-black mt-1">{service.title}</h3>
                <p className="mt-3 text-zinc-500 leading-relaxed">{service.short}</p>
                <p className="mt-5 text-orange-500 font-black">{service.price}</p>
                <div className="mt-6 font-black text-orange-500 group-hover:translate-x-2 transition duration-300">Learn more →</div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="max-w-7xl mx-auto px-5 py-20">
        <div data-reveal className="flex items-end justify-between mt-3 mb-10 flex-wrap gap-4">
          <div>
            <p className="text-orange-500 font-black uppercase tracking-widest">Reviews</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mt-3">125 reviews.<br /><span className="text-orange-500">All 5 stars.</span></h2>
          </div>
          <a href="/reviews" className="bg-white border border-black/10 px-6 py-4 rounded-full font-black hover:bg-[#fdf3ea] hover:border-[#c8763a]/40 hover:shadow-lg transition duration-300">See all →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { text: "This is the 2nd time Nikita did such an outstanding job on a challenging task. He came up with an excellent rescue plan for our shelves and made sure they could safely hold the weight. The shelves look stunning.", service: "General Mounting", date: "Jul 17, 2026" },
            { text: "Nikita showed up on time/early and worked hard. He completed 3 separate sink faucets and changed a hose bib in just over 2 hours. Great communication. Would definitely hire him again!", service: "Plumbing", date: "Jul 10, 2026" },
            { text: "Nikita's attention to detail is flawless. He completed numerous tasks for me and all were done perfectly. He left his work area clean and I would highly recommend.", service: "Electrical", date: "Jul 24, 2026" },
            { text: "Sooo great! Installed 2 of my TVs perfectly and was so efficient. Luckily he was available same day and came on time. Thank you again!", service: "TV Mounting", date: "Jul 9, 2026" },
            { text: "I've hired many handymen and technicians over the years and Nikita is in the top five for skills and professionalism.", service: "General Mounting", date: "Jul 24, 2026" },
            { text: "Thank you for your help unloading my truck! It took less time than expected and you were great! Thank you!", service: "Heavy Lifting & Loading", date: "Jul 4, 2026" },
          ].map((review, i) => (
            <div key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }}
              className="bg-white rounded-[24px] p-6 border border-black/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-400 flex flex-col">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs font-black bg-orange-100 text-orange-700 px-3 py-1 rounded-full">{review.service}</span>
                <span className="text-zinc-400 text-xs font-bold">{review.date}</span>
              </div>
              <p className="text-orange-500 mt-4 tracking-wider">★★★★★</p>
              <p className="mt-3 text-zinc-700 leading-snug text-[15px] flex-1">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section id="quote" className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-28" data-reveal>
            <p className="text-orange-500 font-black uppercase tracking-widest">Get a Quote</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">Send photos.<br />Get a fast quote.</h2>
            <p className="mt-6 text-xl text-zinc-600 max-w-xl leading-relaxed">
              Upload photos, describe the issue, and we'll contact you with a fast estimate. Serving Huntington Beach and all of Orange County, CA.
            </p>
            <div className="mt-8 grid gap-4 max-w-md">
              {['No long phone calls', 'Photo-based estimates', 'Fast response in Orange County'].map((item, i) => (
                <div key={item} data-reveal style={{ transitionDelay: `${i * 80}ms` }}
                  className="bg-white rounded-2xl p-4 border border-black/10 font-bold hover:shadow-md transition duration-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div data-reveal data-scale>
            <form onSubmit={handleQuoteSubmit} className="bg-white rounded-[40px] p-6 md:p-8 grid gap-4 shadow-2xl border border-black/10">
              <input name="name" type="text" placeholder="Your name" required className="input-premium" />
              <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10" placeholder="Phone number" required
                onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10); }} className="input-premium" />
              <div>
                <input name="email" type="email"
                  placeholder={paymentMethod === "card" ? "Email (required for card payment)" : "Email (optional)"}
                  required={paymentMethod === "card"}
                  className={`input-premium w-full transition ${paymentMethod === "card" ? "ring-2 ring-orange-400" : ""}`}
                />
                {status === "email-required" && (
                  <p className="text-orange-600 text-xs font-black mt-1">Email is required for card payment.</p>
                )}
              </div>
              <AddressAutocomplete value={address} onChange={setAddress} className="input-premium" />
              <input type="hidden" name="address" value={address} />
              <select name="service" className="input-premium" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                <option>General quote</option>
                {services.map((service) => <option key={service.slug}>{service.title}</option>)}
              </select>
              <BookingCalendar value={booking} onChange={setBooking} />
              <textarea name="issue" placeholder="Describe the issue" required rows={5} className="input-premium resize-none" />
              <div className="bg-zinc-100 rounded-3xl p-5">
                <label className="text-sm font-black text-zinc-600">Upload photos</label>
                <input ref={photoInputRef} name="photos" type="file" accept="image/*" multiple
                  onChange={(e) => setFilesCount(e.target.files?.length || 0)}
                  className="mt-3 w-full bg-white border-2 border-[#c8763a]/40 text-zinc-900 rounded-2xl px-5 py-4 focus:border-[#c8763a] transition" />
                <p className="text-sm text-zinc-500 mt-3">
                  {filesCount > 0 ? `${filesCount} photo${filesCount > 1 ? 's' : ''} selected` : 'Select multiple photos from your library.'}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  We'll use them to prepare your estimate accurately.
                </p>
              </div>
              {/* Payment selector */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 block">How would you like to pay?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "cash", label: "No payment now", sub: "Pay after the job · Any method" },
                    { value: "card", label: "Reserve with card", sub: "$50 holds your booking · Apple Pay · Card" },
                  ].map((opt) => (
                    <button key={opt.value} type="button"
                      onClick={() => { setPaymentMethod(opt.value); setStatus(""); }}
                      className={`rounded-[20px] p-4 text-left border-2 transition ${
                        paymentMethod === opt.value
                          ? "border-orange-500 bg-orange-50"
                          : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                      }`}>
                      <div className="font-black text-sm text-zinc-900">{opt.label}</div>
                      <div className="text-xs text-zinc-500 mt-0.5 leading-snug">{opt.sub}</div>
                    </button>
                  ))}
                </div>
                {paymentMethod === "card" && (
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    A $50 deposit secures your booking and goes toward your final bill. No surprises — we'll confirm everything before we arrive.
                  </p>
                )}
              </div>

              <button type="submit" disabled={status === 'sending'}
                className={`${BTN_OUTLINE} rounded-full py-5 font-black text-lg hover:scale-[1.02] disabled:opacity-60`}>
                {status === 'sending' ? 'Sending…' : paymentMethod === 'card' ? 'Reserve with Card · $50 →' : 'Request Quote'}
              </button>
              {status === 'error' && (
                <div className="bg-red-500 text-white rounded-2xl p-4 text-center font-black">Something went wrong. Please try again.</div>
              )}
            </form>
          </div>
        </div>
      </section>

      <SmartButton />
      <Footer />
    </main>
  );
}
