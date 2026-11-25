"use client";

import GoogleReviews from "../components/GoogleReviews";
import HolidayBanner from "../components/HolidayBanner";
import ScrollStory from '../components/ScrollStory';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddressAutocomplete from "./components/AddressAutocomplete";
import BookingCalendar from "./components/BookingCalendar";
import ScrollReveal from "./components/ScrollReveal";
import ServicesShowcase from '../components/ServicesShowcase';
import SmartButton from "./components/SmartButton";
import TrustBar from "./components/TrustBar";

import { useRef, useState, useEffect } from "react";
import { services, reviews, pricing } from "../lib/services";

// Premium outline treatment — replaces flat black/orange fills
const BTN_OUTLINE =
  "border-2 border-[#c8763a] text-zinc-950 bg-white " +
  "hover:bg-[#c8763a] hover:text-white hover:border-[#c8763a] " +
  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_24px_-8px_rgba(200,118,58,0.45)] " +
  "transition-all duration-300";

// Main action: solid bronze (dark enough for white text)
const BTN_PRIMARY =
  "bg-[#b4662f] text-white border-2 border-[#b4662f] hover:bg-[#9a5524] hover:border-[#9a5524] " +
  "hover:shadow-[0_10px_24px_-8px_rgba(200,118,58,0.6)] transition-all duration-300";

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

// ─── "Get my price" popup: add photos, send now, or go to the full booking form ───
function QuickPhotoModal({ issue, phone, onClose, onSent }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const addFiles = (list) => setFiles((prev) => [...prev, ...Array.from(list || [])].slice(0, 10));
  const removeFile = (i) => setFiles((prev) => prev.filter((_, k) => k !== i));

  const bookingHref = `/booking?${new URLSearchParams({ issue, phone }).toString()}`;

  const send = async () => {
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("name", name || "Not provided");
      fd.append("phone", phone);
      fd.append("service", "General quote");
      fd.append("issue", issue);
      fd.append("paymentMethod", "Pay after service — any method");
      const compressed = await Promise.all(files.map((f) => compressImage(f)));
      compressed.forEach((f) => fd.append("photos", f));
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) onSent(); else setStatus("error");
    } catch (err) { console.error(err); setStatus("error"); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:px-5"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="qp-title"
        className="bg-white w-full sm:max-w-lg rounded-t-[32px] sm:rounded-[36px] p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="qp-title" className="text-3xl font-black tracking-tight leading-tight">Add a couple of photos</h2>
            <p className="mt-2 text-zinc-600 leading-relaxed">Photos let Nikita give you an exact price instead of a guess. Two or three are enough.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close"
            className="shrink-0 w-11 h-11 rounded-full border border-black/10 grid place-items-center text-xl font-black hover:bg-zinc-50">×</button>
        </div>

        {issue && (
          <div className="mt-5 rounded-2xl bg-[#fdf3ea] px-4 py-3 text-sm">
            <span className="font-black">Your request:</span> <span className="text-zinc-700">{issue}</span>
          </div>
        )}

        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" id="qp-photos"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
        <label htmlFor="qp-photos"
          className="mt-5 flex flex-col items-center justify-center gap-2 rounded-[24px] border-2 border-dashed border-[#c8763a] bg-[#fdfaf5] px-5 py-7 text-center cursor-pointer hover:bg-[#fdf3ea] transition">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#c8763a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="6" width="18" height="14" rx="3" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" />
          </svg>
          <span className="font-black text-lg">Take or upload photos</span>
          <span className="text-sm text-zinc-600">Camera or photo library · up to 10</span>
        </label>

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <div key={src} className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100">
                <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeFile(i)} aria-label={`Remove photo ${i + 1}`}
                  className="absolute top-1 right-1 w-7 h-7 rounded-full bg-white/95 text-sm font-black grid place-items-center shadow">×</button>
              </div>
            ))}
          </div>
        )}

        <label className="mt-5 flex flex-col gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-600">Your name (optional)
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First name"
            className="input-premium normal-case tracking-normal font-medium text-base" />
        </label>

        <button type="button" onClick={send} disabled={status === "sending"}
          className="mt-6 w-full bg-[#b4662f] text-white border-2 border-[#b4662f] hover:bg-[#9a5524] hover:border-[#9a5524] transition rounded-full py-5 font-black text-lg disabled:opacity-60">
          {status === "sending" ? "Sending…" : files.length ? `Send ${files.length} photo${files.length > 1 ? "s" : ""} & get my price` : "Continue without photos"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-center font-black text-red-700">Something went wrong. Please try again or call us.</p>
        )}

        <div className="mt-6 pt-5 border-t border-black/10 grid gap-3">
          <a href={bookingHref}
            className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#c8763a]/40 px-5 py-4 hover:border-[#c8763a] hover:bg-[#fdf3ea] transition">
            <span><span className="block font-black">Add more details &amp; pick a time</span><span className="block text-sm text-zinc-600">Full booking form: address, date, payment</span></span>
            <span className="font-black text-[#9a5524]" aria-hidden="true">→</span>
          </a>
          <a href="tel:+19498283959"
            className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#c8763a]/40 px-5 py-4 hover:border-[#c8763a] hover:bg-[#fdf3ea] transition">
            <span><span className="block font-black">Rather explain by phone?</span><span className="block text-sm text-zinc-600">Call (949) 828-3959, Mon–Sat 8am–8pm</span></span>
            <span className="font-black text-[#9a5524]" aria-hidden="true">→</span>
          </a>
        </div>
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

  // Short hero form: open the photo popup with what they typed
  const [quick, setQuick] = useState(null); // { issue, phone } while the popup is open
  const handleQuickStart = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    setQuick({ issue: f.quickIssue.value.trim(), phone: f.quickPhone.value.trim() });
  };

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
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950 overflow-x-clip">
      {showModal && <ThankYouModal onClose={() => { setShowModal(false); setStatus(""); }} />}
      {quick && (
        <QuickPhotoModal
          issue={quick.issue}
          phone={quick.phone}
          onClose={() => setQuick(null)}
          onSent={() => { setQuick(null); setShowModal(true); document.querySelector("#quick-form")?.reset(); }}
        />
      )}

      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative pt-24 md:pt-32 pb-10 md:pb-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ff6a0020,transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-5 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <TrustBar className="anim-fade-up" />
            <h1 className="anim-fade-up mt-6 font-black tracking-[-0.045em] text-[13vw] sm:text-7xl lg:text-[88px] leading-[0.92]" style={{ animationDelay: "80ms" }}>
              Your whole fix-it list.<br /><span className="text-[#c8763a]">One visit.</span>
            </h1>
            <p className="anim-fade-up mt-6 text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl" style={{ animationDelay: "160ms" }}>
              Electrical, plumbing, TV mounting, assembly and repairs across Huntington Beach and Orange County. Send a photo, get a clear price, and Nikita shows up on time.
            </p>
            <div className="anim-fade-up mt-8 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "240ms" }}>
              <a href="#quote" className={`${BTN_PRIMARY} px-8 py-5 rounded-full font-black text-lg text-center`}>Send photos, get a quote</a>
              <a href="tel:+19498283959" className={`${BTN_OUTLINE} px-8 py-5 rounded-full font-black text-lg text-center`}>Call (949) 828-3959</a>
            </div>
            <dl className="anim-fade-up mt-9 grid grid-cols-3 gap-4 max-w-lg" style={{ animationDelay: "320ms" }}>
              {[["220+", "five-star reviews"], ["$90/hr", "clear hourly rate"], ["8+ yrs", "repair experience"]].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-2xl md:text-3xl font-black tracking-tight">{v}</dd>
                  <dd className="text-xs md:text-sm text-zinc-600 font-semibold">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="anim-scale-in grid grid-cols-2 gap-3 md:gap-4" style={{ animationDelay: "120ms" }}>
            <figure className="relative row-span-2 rounded-[28px] overflow-hidden border-2 border-[#c8763a] min-h-[340px] md:min-h-[480px]">
              <img src="/reel/story-fountain-after.jpg" alt="Resurfaced backyard fountain pool in bright blue" className="absolute inset-0 w-full h-full object-cover" />
              <figcaption className="absolute left-3 bottom-3 bg-white rounded-full px-3 py-1.5 text-xs md:text-sm font-black">Fountain resurfacing</figcaption>
            </figure>
            <figure className="relative rounded-[22px] overflow-hidden min-h-[160px] md:min-h-[232px]">
              <img src="/reel/story-mirror-after.jpg" alt="Backlit LED mirror over a bathroom vanity" className="absolute inset-0 w-full h-full object-cover" />
              <figcaption className="absolute left-3 bottom-3 bg-white rounded-full px-3 py-1.5 text-xs font-black">LED mirror</figcaption>
            </figure>
            <figure className="relative rounded-[22px] overflow-hidden min-h-[160px] md:min-h-[232px]">
              <img src="/reel/story-lights-after.jpg" alt="Living room with new slim recessed lights" className="absolute inset-0 w-full h-full object-cover" />
              <figcaption className="absolute left-3 bottom-3 bg-white rounded-full px-3 py-1.5 text-xs font-black">Recessed lights</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ─── QUICK QUOTE STRIP ─── */}
      <section className="max-w-7xl mx-auto px-5 pb-12">
        <form id="quick-form" onSubmit={handleQuickStart}
          className="bg-white border-2 border-[#c8763a] rounded-[28px] p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-end shadow-[0_24px_50px_-30px_rgba(120,70,30,.45)]">
          <label className="flex-[2] flex flex-col gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-600">What needs fixing?
            <input name="quickIssue" type="text" required placeholder="e.g. Mount a TV, fix a leaking faucet" className="input-premium normal-case tracking-normal font-medium text-base" />
          </label>
          <label className="flex-1 flex flex-col gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-600">Phone
            <input name="quickPhone" type="tel" inputMode="numeric" maxLength="10" placeholder="10 digits" required pattern="[0-9]{10}"
              onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 10); }}
              className="input-premium normal-case tracking-normal font-medium text-base" />
          </label>
          <button type="submit" className={`${BTN_PRIMARY} px-8 py-4 rounded-full font-black text-base md:mb-[2px]`}>Get my price →</button>
        </form>
        <p className="mt-3 text-sm text-zinc-600 font-semibold text-center md:text-left">Usually a reply within the hour, 8am–8pm, Mon–Sat. No call center, no spam.</p>
      </section>

<HolidayBanner />

      {/* ─── SERVICES + PRICES ─── */}
      <section id="services" className="max-w-7xl mx-auto px-5 py-16 md:py-20">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#9a5524] font-black uppercase tracking-widest">Services &amp; starting prices</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3 leading-[0.95]">Know the price<br />before I arrive.</h2>
          </div>
          <a href="/services" className="font-black text-[#9a5524] hover:text-zinc-950 transition">All services →</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <a key={s.slug} href={`/services/${s.slug}`} data-reveal style={{ transitionDelay: `${i * 50}ms` }}
              className="group bg-white rounded-[24px] p-6 border border-[#ead9c6] hover:border-[#c8763a] hover:-translate-y-1 hover:shadow-xl transition duration-300 flex flex-col">
              <h3 className="text-xl font-black">{s.title}</h3>
              <p className="mt-2 text-zinc-600 leading-snug text-[15px] flex-1">{s.short}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-black text-[#9a5524]">{s.price}</span>
                <span className="text-[#c8763a] font-black group-hover:translate-x-1 transition" aria-hidden="true">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-[#efe3d4]/60">
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-20">
          <h2 data-reveal className="text-4xl md:text-6xl font-black tracking-tight mb-10">Three steps. No surprises.</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Snap", "Text or upload photos of everything on your list. One message is enough."],
              ["Solve", "Get a clear price and a time slot. Parts are picked up before the visit."],
              ["Repair", "Done in one visit, area cleaned up, photos of the finished work sent to you."],
            ].map(([t, d], i) => (
              <div key={t} data-reveal style={{ transitionDelay: `${i * 80}ms` }} className="bg-white rounded-[24px] p-7 border border-[#ead9c6]">
                <div className="w-11 h-11 rounded-full border-2 border-[#c8763a] grid place-items-center font-black text-[#9a5524]">{i + 1}</div>
                <h3 className="mt-5 text-2xl font-black">{t}</h3>
                <p className="mt-2 text-zinc-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollStory />

      {/* ─── RECENT WORK ─── */}
      <section id="work" className="max-w-7xl mx-auto px-5 py-16 md:py-20">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#9a5524] font-black uppercase tracking-widest">Real jobs, real photos</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">Before. After.</h2>
          </div>
          <a href="/work" className="font-black text-[#9a5524] hover:text-zinc-950 transition">See all work →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { img: "/images/work-recessed-lights.jpg", title: "Recessed Lighting", text: "Old ceiling fixtures out, slim LED recessed lights in across the living room and kitchen." },
            { img: "/images/work-led-mirror.jpg", title: "LED Backlit Mirror", text: "Removed the dated 4-bulb vanity light and mounted and wired a large backlit mirror." },
            { img: "/images/work-metal-door-awning.jpg", title: "Metal Door Awning", text: "Standing-seam metal awning on steel brackets over the front entry." },
            { img: "/images/work-ceiling-fan-replacement.jpg", title: "Ceiling Fan Replacement", text: "Swapped a dead 6-blade fan for a modern 3-blade wood fan with remote." },
            { img: "/images/work-smart-toilet.jpg", title: "Smart Toilet Installation", text: "Removed the old toilet, prepped the flange and installed a new tankless smart toilet." },
            { img: "/images/work-undermount-sink.jpg", title: "Bathroom Sink Replacement", text: "Replaced a cracked undermount sink under a marble top and reconnected the drain." },
          ].map((item, i) => (
            <div key={item.img} data-reveal data-scale style={{ transitionDelay: `${i * 80}ms` }}
              className="bg-white rounded-[32px] overflow-hidden border border-[#ead9c6] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-500 h-full group">
              <div className="overflow-hidden">
                <img src={item.img} alt={item.title} loading="lazy"
                  className="w-full aspect-[1360/1010] object-cover bg-zinc-200 group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-2 text-zinc-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ONE VISIT SAVINGS ─── */}
      <section className="max-w-7xl mx-auto px-5 py-16 md:py-20">
        <div data-reveal>
          <p className="text-[#9a5524] font-black uppercase tracking-widest">Why one visit</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3 mb-12">One call.<br />Many fixes.</h2>
        </div>
        <div data-reveal>
          <ServicesShowcase services={services} />
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="max-w-7xl mx-auto px-5 py-20">
        <div data-reveal className="flex items-end justify-between mt-3 mb-10 flex-wrap gap-4">
          <div>
            <p className="text-orange-500 font-black uppercase tracking-widest">Reviews</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mt-3">220+ reviews.<br /><span className="text-orange-500">All 5 stars.</span></h2>
          </div>
          <a href="/reviews" className="bg-white border border-black/10 px-6 py-4 rounded-full font-black hover:bg-[#fdf3ea] hover:border-[#c8763a]/40 hover:shadow-lg transition duration-300">See all →</a>
        </div>
        <GoogleReviews />
      </section>

      {/* ─── WHY + AREA ─── */}
      <section id="area" className="max-w-7xl mx-auto px-5 py-16 md:py-20 grid lg:grid-cols-2 gap-8">
        <div data-reveal>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1]">Why homeowners call HandyYet</h2>
          <ul className="mt-8 grid gap-4">
            {[
              ["Insured LLC.", "General liability coverage on every job."],
              ["One person, start to finish.", "The person you text is the person who shows up."],
              ["Many jobs, one trip.", "No separate trip fee for each small fix."],
              ["Clean work.", "Floors covered, dust vacuumed, old parts hauled away."],
            ].map(([b, t]) => (
              <li key={b} className="flex gap-3 text-lg leading-snug">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#c8763a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-0.5"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                <span><strong className="font-black">{b}</strong> <span className="text-zinc-700">{t}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="bg-white border-2 border-[#c8763a] rounded-[28px] p-7 md:p-9">
          <h3 className="text-2xl font-black">Service area</h3>
          <p className="mt-2 text-zinc-600">Based in Huntington Beach, serving Orange County and Long Beach.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Huntington Beach", "Newport Beach", "Costa Mesa", "Irvine", "Fountain Valley", "Westminster", "Garden Grove", "Long Beach"].map((c) => (
              <span key={c} className="px-4 py-2 rounded-full border border-[#e2cdb6] font-bold text-sm">{c}</span>
            ))}
          </div>
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

      <SmartButton quoteHref="#quote" />
      <Footer />
    </main>
  );
}
