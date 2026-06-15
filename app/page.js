"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const services = [
  {
    icon: "📺",
    title: "TV Mounting",
    text: "Clean installations with cable management.",
    link: "/services/tv-mounting",
  },
  {
    icon: "🪑",
    title: "Furniture Assembly",
    text: "Fast and precise furniture setup.",
    link: "/services/furniture-assembly",
  },
  {
    icon: "🏠",
    title: "Smart Home",
    text: "Thermostats, cameras and smart devices.",
    link: "/services/smart-home",
  },
  {
    icon: "🔧",
    title: "Handyman Repairs",
    text: "General repairs and home fixes.",
    link: "/services/handyman-repairs",
  },
];
const reviews = [
  {
    name: "Michael R.",
    text: "Very professional and clean work. Mounted my TV perfectly.",
  },
  {
    name: "Sarah T.",
    text: "Fast response and fair pricing. Highly recommend HandyYet.",
  },
  {
    name: "Daniel K.",
    text: "Installed smart thermostat and fixed several issues same day.",
  },
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

      const maxWidth = 500;

      const scale = Math.min(maxWidth / img.width, 1);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob], `photo-${Date.now()}.jpg`, {
              type: "image/jpeg",
            })
          );
        },
        "image/jpeg",
        0.3
      );
    };

    reader.readAsDataURL(file);
  });
}

export default function Home() {
  const photoInputRef = useRef(null);

  const [status, setStatus] = useState("");
  const [filesCount, setFilesCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const form = e.currentTarget;

      const name = form.name.value;
      const phone = form.phone.value;
      const issue = form.issue.value;

      const files = Array.from(photoInputRef.current?.files || []);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("issue", issue);

      for (const file of files.slice(0, 10)) {
        const compressed = await compressImage(file);

        formData.append("photos", compressed);
      }

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");

        form.reset();

        if (photoInputRef.current) {
          photoInputRef.current.value = "";
        }

        setFilesCount(0);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.log(err);

      setStatus("error");
    }
  };
    return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950 overflow-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="#" className="text-3xl font-black tracking-tight">
            Handy<span className="text-orange-500">Yet</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-700">
            <a href="#services" className="hover:text-orange-500 transition">
              Services
            </a>
            <a href="#work" className="hover:text-orange-500 transition">
              Work
            </a>
            <a href="#reviews" className="hover:text-orange-500 transition">
              Reviews
            </a>
            <a href="#quote" className="hover:text-orange-500 transition">
              Quote
            </a>
          </div>

          <a
            href="#quote"
            className="bg-zinc-950 text-white px-6 py-3 rounded-full font-black hover:bg-orange-500 hover:text-black transition"
          >
            Get Quote
          </a>
        </div>
      </nav>

      {/* HERO */}
      <motion.section
  initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative pt-32 pb-20 md:pt-40 md:pb-28"
>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ff6a0020,transparent_35%),radial-gradient(circle_at_bottom_left,#00000010,transparent_30%)]" />

        <div className="relative max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fadeUp">
            <div className="inline-flex items-center gap-2 bg-white border border-black/10 shadow-sm rounded-full px-4 py-2 text-sm font-black mb-7">
              <span>⭐</span> Orange County • Southern California
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
              Home repairs
              <br />
              made
              <span className="text-orange-500"> simple.</span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-zinc-600 max-w-xl leading-relaxed">
              Send photos, describe the issue, and get a fast quote from a
              reliable handyman service.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#quote"
                className="bg-orange-500 text-black px-8 py-5 rounded-full font-black shadow-xl hover:scale-105 transition"
              >
                Send Photos
              </a>

              <a
                href="#services"
                className="bg-white text-zinc-950 border border-black/10 px-8 py-5 rounded-full font-black hover:bg-zinc-100 transition"
              >
                View Services
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              {["Fast quotes", "Clean work", "Photo updates"].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl p-4 border border-black/10 shadow-sm"
                >
                  <p className="font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fadeUp">
            <div className="bg-white rounded-[44px] p-3 shadow-2xl border border-black/10 rotate-1 hover:rotate-0 transition duration-500">
              <div className="rounded-[36px] overflow-hidden bg-zinc-200 aspect-[4/5]">
                <img
                  src="/images/hero.jpg"
                  alt="HandyYet home service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-2 md:-left-8 bg-zinc-950 text-white rounded-3xl p-5 shadow-xl">
              <p className="text-4xl font-black text-orange-400">5★</p>
              <p className="font-bold text-sm">Reliable local service</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-12">
          <p className="text-orange-500 font-black uppercase tracking-widest">
            Services
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">
            One call.
            <br />
            Many fixes.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
  <a
    href={service.link}
    key={service.title}
    className="group bg-white rounded-[32px] p-7 border border-black/10 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
  >
    <div className="text-5xl">{service.icon}</div>

    <h3 className="text-2xl font-black mt-6">
      {service.title}
    </h3>

    <p className="mt-3 text-zinc-500 leading-relaxed">
      {service.text}
    </p>

    <div className="mt-6 font-black text-orange-500 group-hover:translate-x-2 transition">
      Learn more →
    </div>
  </a>
))}
        </div>
      </section>
            {/* WORK */}
      <section id="work" className="max-w-7xl mx-auto px-5 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-orange-500 font-black uppercase tracking-widest">
              Recent Work
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">
              Real repairs.
              <br />
              Real results.
            </h2>
          </div>

          <a
            href="#quote"
            className="bg-zinc-950 text-white px-7 py-4 rounded-full font-black w-fit hover:bg-orange-500 hover:text-black transition"
          >
            Start your project
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["/images/project-1.jpg", "Smart thermostat installation"],
            ["/images/project-2.jpg", "Furniture assembly"],
            ["/images/project-3.jpg", "Shelving & mounting"],
          ].map(([img, title]) => (
            <div
              key={title}
              className="bg-white rounded-[36px] overflow-hidden border border-black/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img src={img} alt={title} className="h-80 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-3 text-zinc-500">
                  Clean finish, fast communication, and photo-ready results.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-7xl mx-auto px-5 py-20">
        <div className="bg-zinc-950 text-white rounded-[44px] p-8 md:p-14 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 blur-3xl rounded-full" />

          <div className="relative">
            <p className="text-orange-400 font-black uppercase tracking-widest">
              Reviews
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">
              Built on trust.
            </h2>

            <div className="grid md:grid-cols-3 gap-5 mt-12">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="bg-white/10 backdrop-blur rounded-[32px] p-6 border border-white/10"
                >
                  <p className="text-orange-400 text-xl">★★★★★</p>
                  <p className="mt-5 text-lg leading-relaxed">
                    “{review.text}”
                  </p>
                  <p className="mt-6 font-black">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote" className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="sticky top-28">
            <p className="text-orange-500 font-black uppercase tracking-widest">
              Get a Quote
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">
              Send photos.
              <br />
              Get a fast quote.
            </h2>
            <p className="mt-6 text-xl text-zinc-600 max-w-xl leading-relaxed">
              UUpload photos, describe the issue, and we’ll contact you with a fast estimate and next steps.
            </p>

            <div className="mt-8 grid gap-4 max-w-md">
              {[
                "No long phone calls",
                "Photo-based estimates",
                "Fast local response",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-4 border border-black/10 font-bold"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleQuoteSubmit}
            className="bg-white rounded-[40px] p-6 md:p-8 grid gap-4 shadow-2xl border border-black/10"
          >
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="bg-zinc-100 text-black rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-orange-500"
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
              className="bg-zinc-100 text-black rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
<input
  type="text"
  name="address"
  placeholder="Service Address"
  className="w-full rounded-[24px] border border-black/10 bg-white px-6 py-5 text-lg outline-none"
/>
            <textarea
              name="issue"
              placeholder="Describe the issue"
              required
              rows={5}
              className="bg-zinc-100 text-black rounded-2xl px-5 py-4 outline-none resize-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="bg-zinc-100 rounded-3xl p-5">
              <label className="text-sm font-black text-zinc-600">
                Upload photos
              </label>

              <input
                ref={photoInputRef}
                name="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFilesCount(e.target.files?.length || 0)}
                className="mt-3 w-full bg-zinc-950 text-white rounded-2xl px-5 py-4"
              />

              <p className="text-sm text-zinc-500 mt-3">
                {filesCount > 0
                  ? `${filesCount} photo${filesCount > 1 ? "s" : ""} selected`
                  : "Select multiple photos from your library."}
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
              <div className="bg-green-500 text-white rounded-2xl p-4 text-center font-black">
                Thank you. Your request is being processed.
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-500 text-white rounded-2xl p-4 text-center font-black">
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
        Send Photos & Get Quote
      </a>

      <footer className="border-t border-black/10 py-10 text-center text-zinc-500">
        © 2026 HandyYet LLC. Snap. Solve. Repair.
      </footer>
    </main>
  );
}