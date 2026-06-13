"use client";

import { useRef, useState } from "react";

const services = [
  "TV Mounting",
  "Furniture Assembly",
  "Smart Home",
  "Lighting",
  "Door Hardware",
  "Shelving",
  "Plumbing",
  "Painting",
];
async function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 1200;

      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
              type: "image/jpeg",
            })
          );
        },
        "image/jpeg",
        0.72
      );
    };

    reader.readAsDataURL(file);
  });
}
export default function Home() {
  const photoInputRef = useRef(null);
  const [status, setStatus] = useState("");
  const [filesCount, setFilesCount] = useState(0);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.delete("photos");

const files = photoInputRef.current?.files;

if (files && files.length > 0) {
  const selectedFiles = Array.from(files).slice(0, 5);

  for (const file of selectedFiles) {
    const compressed = await compressImage(file);
    formData.append("photos", compressed);
  }
}

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-zinc-950">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="#" className="font-black text-2xl tracking-tight">
            Handy<span className="text-orange-500">Yet</span>
          </a>

          <div className="hidden md:flex gap-7 text-sm font-semibold text-zinc-700">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#reviews">Reviews</a>
            <a href="#quote">Quote</a>
          </div>

          <a
            href="#quote"
            className="bg-zinc-950 text-white px-5 py-3 rounded-full font-bold hover:bg-orange-500 transition"
          >
            Get Quote
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 text-sm font-bold mb-6">
            ⭐ Orange County • Southern California
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            Snap.
            <br />
            Solve.
            <br />
            <span className="text-orange-500">Repair.</span>
          </h1>

          <p className="mt-8 text-xl text-zinc-600 max-w-xl">
            Send photos of the issue, get a fast estimate, and book clean,
            reliable handyman service.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#quote"
              className="bg-orange-500 text-black px-7 py-4 rounded-full font-black hover:scale-105 transition"
            >
              Send Photos
            </a>
            <a
              href="#work"
              className="bg-white border border-black/10 px-7 py-4 rounded-full font-black hover:bg-zinc-100 transition"
            >
              View Work
            </a>
          </div>
        </div>

        <div className="relative animate-fadeUp delay-100">
          <div className="rounded-[36px] overflow-hidden shadow-2xl bg-white p-3">
            <img
              src="/images/hero.jpg"
              alt="Handyman service"
              className="rounded-[28px] w-full h-[520px] object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 bg-white rounded-3xl shadow-xl p-5 border border-black/10">
            <p className="text-4xl font-black">5★</p>
            <p className="text-sm text-zinc-500 font-semibold">
              Local home service
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-orange-500 font-black uppercase tracking-wide">
              Services
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Small jobs. Clean results.
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <a
              key={service}
              href="#quote"
              className="group bg-white rounded-3xl p-6 border border-black/10 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-6">
                🛠
              </div>
              <h3 className="text-xl font-black">{service}</h3>
              <p className="text-zinc-500 mt-2">
                Fast estimate, clean install, professional finish.
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="max-w-7xl mx-auto px-5 py-16">
        <p className="text-orange-500 font-black uppercase tracking-wide">
          Recent Work
        </p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-10">
          Before. After. Done right.
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["/images/project-1.jpg", "Smart thermostat install"],
            ["/images/project-2.jpg", "Furniture assembly"],
            ["/images/project-3.jpg", "Shelving & mounting"],
          ].map(([img, title]) => (
            <div
              key={title}
              className="bg-white rounded-[32px] overflow-hidden border border-black/10 hover:shadow-xl transition"
            >
              <img src={img} alt={title} className="h-72 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-black text-xl">{title}</h3>
                <p className="text-zinc-500 mt-2">
                  Clean, reliable, photo-ready finish.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-7xl mx-auto px-5 py-16">
        <div className="bg-zinc-950 text-white rounded-[40px] p-8 md:p-14">
          <p className="text-orange-400 font-black uppercase tracking-wide">
            Reviews
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Reliable help when you need it.
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              "Fast response and very clean work.",
              "Professional, friendly, and finished everything perfectly.",
              "Easy to book. Great communication. Highly recommend.",
            ].map((text, i) => (
              <div key={i} className="bg-white/10 rounded-3xl p-6">
                <p className="text-orange-400 text-xl">★★★★★</p>
                <p className="mt-4 text-lg">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote" className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-orange-500 font-black uppercase tracking-wide">
              Get a Quote
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
              Send photos.
              <br />
              Get a quote.
            </h2>
            <p className="mt-6 text-xl text-zinc-600 max-w-xl">
              Upload photos from your phone, describe the issue, and we’ll
              respond with next steps.
            </p>
          </div>

          <form
            onSubmit={handleQuoteSubmit}
            className="bg-white rounded-[36px] p-6 md:p-8 grid gap-4 shadow-xl border border-black/10"
          >
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="bg-zinc-100 text-black rounded-2xl px-5 py-4 outline-none"
            />

            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="Phone number"
              required
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/\D/g, "")
                  .slice(0, 10);
              }}
              className="bg-zinc-100 text-black rounded-2xl px-5 py-4 outline-none"
            />

            <textarea
              name="issue"
              placeholder="Describe the issue"
              required
              rows={5}
              className="bg-zinc-100 text-black rounded-2xl px-5 py-4 outline-none resize-none"
            />

            <div>
              <label className="text-sm font-bold text-zinc-500">
                Upload photos
              </label>

              <input
                ref={photoInputRef}
                name="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFilesCount(e.target.files?.length || 0)}
                className="mt-2 w-full bg-zinc-950 text-white rounded-2xl px-5 py-4"
              />

              <p className="text-sm text-zinc-500 mt-2">
                {filesCount > 0
                  ? `${filesCount} photo${filesCount > 1 ? "s" : ""} selected`
                  : "You can select multiple photos from your library."}
              </p>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-orange-500 hover:bg-orange-400 text-black rounded-full py-5 font-black text-lg transition disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Request Quote"}
            </button>

            {status === "success" && (
              <div className="bg-green-500 text-white rounded-2xl p-4 text-center font-bold">
                Thank you. Your request is being processed.
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-500 text-white rounded-2xl p-4 text-center font-bold">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* MOBILE CTA */}
      <a
        href="#quote"
        className="fixed bottom-5 left-5 right-5 z-50 md:hidden bg-orange-500 text-black rounded-full py-5 text-center font-black shadow-2xl"
      >
        Take Photo & Get Quote
      </a>

      <footer className="border-t border-black/10 py-10 text-center text-zinc-500">
        © 2026 HandyYet LLC. Snap. Solve. Repair.
      </footer>
    </main>
  );
}