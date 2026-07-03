"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddressAutocomplete from "../components/AddressAutocomplete";
import BookingCalendar from "../components/BookingCalendar";
import SmartButton from "../components/SmartButton";

import { useRef, useState, useEffect } from "react";
import { services } from "../../lib/services";

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
        <h2 className="text-3xl font-black tracking-tight">Booking received!</h2>
        <p className="mt-4 text-zinc-600 leading-relaxed text-lg">
          We'll confirm your appointment via <span className="font-black text-zinc-950">text or email</span> as soon as possible.
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

export default function BookingPage() {
  const photoInputRef = useRef(null);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filesCount, setFilesCount] = useState(0);
  const [address, setAddress] = useState("");
  const [booking, setBooking] = useState(null);
  const [selectedService, setSelectedService] = useState("General quote");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("service");
    if (s) setSelectedService(s);
  }, []);

  const handleSubmit = async (e) => {
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
      formData.append("paymentMethod", paymentMethod === "card" ? "Card — $50 deposit (Stripe)" : "Cash / Pay after service");
      if (booking) formData.append("booking", `${booking.date.toDateString()} at ${booking.time}`);

      const files = Array.from(photoInputRef.current?.files || []);
      const compressed = await Promise.all(files.slice(0, 10).map(compressImage));
      for (const f of compressed) formData.append("photos", f);

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      const data = await res.json();

      if (!data.success) {
        setStatus("error");
        return;
      }

      if (paymentMethod === "card") {
        const stripeRes = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email.value,
            name: form.name.value,
            service: form.service.value,
          }),
        });
        const stripeData = await stripeRes.json();
        if (stripeData.url) {
          window.location.href = stripeData.url;
          return;
        }
      }

      setStatus("success");
      setShowModal(true);
      form.reset();
      setFilesCount(0);
      setSelectedService("General quote");
      setAddress("");
      setBooking(null);
      setPaymentMethod("cash");
      if (photoInputRef.current) photoInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      {showModal && <ThankYouModal onClose={() => { setShowModal(false); setStatus(""); }} />}

      <Navbar />

      <section className="max-w-7xl mx-auto px-5 pt-32 pb-10">
        <p className="text-orange-500 font-black uppercase tracking-widest">Booking</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mt-3">
          Book a visit.<br /><span className="text-orange-500">Fast & easy.</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-600 max-w-xl leading-relaxed">
          Pick a date, describe the job, upload photos. We'll confirm your appointment and send a quote before arrival.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: perks */}
          <div className="lg:sticky lg:top-28 space-y-5">
            {[
              { icon: "📸", title: "Send photos", text: "Upload photos of the job so we can prepare the right tools and give an accurate quote." },
              { icon: "📅", title: "Pick a time slot", text: "Choose a date and time that works for you. We'll confirm within a few hours." },
              { icon: "💬", title: "We'll reach out", text: "You'll receive a text or email to confirm your booking and discuss any details." },
              { icon: "✅", title: "Job done right", text: "We show up on time, do the work cleanly, and leave your space tidy." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-[24px] p-6 border border-black/10 flex gap-5 items-start">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-black text-lg">{item.title}</p>
                  <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}

            <div className="bg-zinc-950 rounded-[24px] p-6 text-white">
              <p className="font-black text-lg">Questions?</p>
              <p className="text-zinc-400 text-sm mt-1">Call or text us directly.</p>
              <a href="tel:+19498283959" className="mt-4 inline-block bg-orange-500 text-black font-black px-6 py-3 rounded-full hover:bg-orange-400 transition">
                📞 (949) 828-3959
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-[40px] p-6 md:p-8 grid gap-4 shadow-2xl border border-black/10">
            <h2 className="text-2xl font-black">Your details</h2>

            <input name="name" type="text" placeholder="Full name" required className="input-premium" />
            <input
              name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10"
              placeholder="Phone number" required
              onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10); }}
              className="input-premium"
            />

            <div>
              <input
                name="email"
                type="email"
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

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2 block">Service</label>
              <select
                name="service"
                className="input-premium"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option>General quote</option>
                {services.map((s) => <option key={s.slug}>{s.title}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2 block">Preferred date & time</label>
              <BookingCalendar value={booking} onChange={setBooking} />
            </div>

            <textarea
              name="issue"
              placeholder="Describe the job — what needs to be done?"
              required rows={4}
              className="input-premium resize-none"
            />

            {/* ── Payment method selector ── */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 block">How would you like to pay?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "cash", icon: "✌️", label: "No payment now", sub: "Pay after the job · Cash or Venmo" },
                  { value: "card", icon: "✅", label: "Reserve with card", sub: "$50 holds your booking · Apple Pay · Card" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { setPaymentMethod(opt.value); setStatus(""); }}
                    className={`rounded-[20px] p-4 text-left border-2 transition ${
                      paymentMethod === opt.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{opt.icon}</div>
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

            <div className="bg-zinc-100 rounded-3xl p-5">
              <label className="text-sm font-black text-zinc-600">Photos (optional but helpful)</label>
              <p className="text-xs text-zinc-400 mt-1">Upload 1–5 photos so we can prepare the right tools and give an accurate quote.</p>
              <input
                ref={photoInputRef}
                name="photos" type="file" accept="image/*" multiple
                onChange={(e) => setFilesCount(e.target.files?.length || 0)}
                className="mt-3 w-full bg-zinc-950 text-white rounded-2xl px-5 py-4"
              />
              <p className="text-sm text-zinc-500 mt-3">
                {filesCount > 0 ? `${filesCount} photo${filesCount > 1 ? 's' : ''} selected` : 'Select multiple photos from your library.'}
              </p>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-orange-500 hover:bg-orange-400 text-black rounded-full py-5 font-black text-lg transition disabled:opacity-60"
            >
              {status === 'sending'
                ? 'Sending…'
                : paymentMethod === 'card'
                  ? 'Reserve with Card · $50 →'
                  : 'Request Booking →'}
            </button>

            {status === 'error' && (
              <div className="bg-red-500 text-white rounded-2xl p-4 text-center font-black">
                Something went wrong. Please try again or call us.
              </div>
            )}
          </form>
        </div>
      </section>

      <SmartButton />
      <Footer />
    </main>
  );
}
