"use client";

import { useRef, useState } from "react";

export default function Home() {
  const photoInputRef = useRef(null);
const [status, setStatus] = useState("");
const handleQuoteSubmit = async (e) => {
  e.preventDefault();

  setStatus("sending");

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const res = await fetch("/api/quote", {
  method: "POST",
  body: formData,
});

    const data = await res.json();

    if (data.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  } catch (error) {
    setStatus("error");
  }
};
  const openQuoteCamera = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      photoInputRef.current?.click();
    }, 600);
  };

  const services = [
    "Plumbing Repairs",
    "Door & Hardware",
    "Shelving & Mounting",
    "Furniture Assembly",
    "Lighting Fixtures",
    "Painting & Finish Work",
  ];

  const projects = [
    {
      title: "Wood Wall + LED Shelves",
      text: "Clean install with premium finish.",
      img: "/images/install shelves and LED lights with wood wall.png",
    },
    {
      title: "Furniture Assembly",
      text: "Fast, clean, reliable setup.",
      img: "/images/assembly desk.jpg",
    },
    {
      title: "Smart Thermostat",
      text: "Modern upgrade, clean install.",
      img: "/images/thermostat.png",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img
            src="/images/logo.PNG"
            alt="HandyYet Logo"
            className="h-20 md:h-24 w-auto"
          />

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#quote">Quote</a>
          </div>

          <button
            onClick={openQuoteCamera}
            className="bg-orange-500 hover:bg-orange-400 text-black font-bold px-6 py-3 rounded-full transition"
          >
            Get a Quote
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 mb-8">
            📍 Orange County • Southern California
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-8">
            Snap.
            <br />
            Solve.
            <br />
            <span className="text-orange-500">Repair.</span>
          </h1>

          <p className="text-gray-400 text-xl max-w-xl mb-10">
            Upload photos of the issue, get a fast estimate, and book clean,
            reliable handyman service.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={openQuoteCamera}
              className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded-full font-bold transition"
            >
              Take Photos
            </button>

            <a
              href="#projects"
              className="border border-white/10 hover:border-white/30 px-8 py-4 rounded-full font-semibold transition"
            >
              View Work
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4">
              <p className="text-2xl font-bold text-orange-500">Fast</p>
              <p className="text-sm text-gray-400">Photo estimates</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4">
              <p className="text-2xl font-bold text-orange-500">Clean</p>
              <p className="text-sm text-gray-400">Professional work</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4">
              <p className="text-2xl font-bold text-orange-500">Local</p>
              <p className="text-sm text-gray-400">Orange County</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-orange-500/20 blur-3xl rounded-full" />
          <div className="relative bg-zinc-900 border border-white/10 rounded-[36px] overflow-hidden shadow-2xl">
            <img
              src="/images/install shelves and LED lights with wood wall.png"
              alt="HandyYet project"
              className="w-full h-[520px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-orange-500 uppercase text-sm mb-4">How it works</p>
        <h2 className="text-4xl md:text-6xl font-black mb-12">
          Simple repair process.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["01", "Snap photos", "Take or upload photos of the issue."],
            ["02", "Get estimate", "We review details and send next steps."],
            ["03", "Book repair", "Clean, reliable work at your home."],
          ].map(([num, title, text]) => (
            <div
              key={num}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8"
            >
              <p className="text-orange-500 text-4xl font-black mb-6">{num}</p>
              <h3 className="text-2xl font-bold mb-3">{title}</h3>
              <p className="text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-orange-500 uppercase text-sm mb-4">Services</p>
        <h2 className="text-4xl md:text-6xl font-black mb-12">
          Small repairs. Done right.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service}
              className="group bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-3xl p-7 transition"
            >
              <div className="text-3xl mb-5">✓</div>
              <h3 className="text-2xl font-bold mb-3">{service}</h3>
              <p className="text-gray-400">
                Clean, detail-focused handyman service with quick communication.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-orange-500 uppercase text-sm mb-4">Recent work</p>
        <h2 className="text-4xl md:text-6xl font-black mb-12">
          Real work. Real results.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote" className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-orange-500 rounded-[40px] p-8 md:p-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-black leading-none mb-8">
              Send photos.
              <br />
              Get a quote.
            </h2>

            <p className="text-black/80 text-xl max-w-lg">
              Take photos directly from your phone and tell us what needs fixing.
              We’ll respond with next steps.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-6 md:p-8">
            <form onSubmit={handleQuoteSubmit} className="grid gap-4">
              <input
              name="name"
                type="text"
                placeholder="Your name"
                className="bg-zinc-100 text-black placeholder:text-gray-400 rounded-2xl px-5 py-4 outline-none"
              />

              <input
  name="photos"
  type="tel"
  inputMode="numeric"
  pattern="[0-9]{10}"
  maxLength="10"
  placeholder="Phone number"
  required
  onInput={(e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
  }}
  className="bg-zinc-100 text-black placeholder:text-gray-400 rounded-2xl px-5 py-4 outline-none"
/>

              <textarea
              name="issue"
                placeholder="Describe the issue"
                className="bg-zinc-100 text-black placeholder:text-gray-400 rounded-2xl px-5 py-4 outline-none min-h-[140px]"
              />

              <div className="space-y-3">
                <label className="text-sm text-gray-500">
                  Upload photos of the issue
                </label>

                <input
                  ref={photoInputRef}
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full bg-zinc-900 text-white border border-white/10 rounded-2xl px-4 py-4"
                />

                <p className="text-xs text-gray-500">
                  Tap “Take Photos” or any quote button to open camera on mobile.
                </p>
              </div>

              <button
  type="submit"
  className="bg-black hover:bg-zinc-800 text-white py-5 rounded-full font-bold text-xl"
>
  Request Quote
</button>

{status === "success" && (
  <div className="bg-green-500 text-white rounded-2xl p-4 text-center font-semibold">
    Thank you for contacting HandyYet. Your request is being processed.
  </div>
)}

{status === "error" && (
  <div className="bg-red-500 text-white rounded-2xl p-4 text-center font-semibold">
    Something went wrong. Please try again.
  </div>
)}
            </form>
          </div>
        </div>
      </section>

      {/* MOBILE FLOATING CTA */}
      <button
        onClick={openQuoteCamera}
        className="fixed bottom-5 left-5 right-5 z-50 md:hidden bg-orange-500 text-black font-black py-4 rounded-full shadow-2xl"
      >
        Take Photo & Get Quote
      </button>

      <footer className="border-t border-white/10 py-10 text-center text-gray-500">
        © 2026 HandyYet LLC. Snap. Solve. Repair.
      </footer>
    </main>
  );
}