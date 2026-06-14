export default function TVMountingPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-orange-500 font-black uppercase tracking-widest">
            TV Mounting
          </p>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">
            Clean TV
            <br />
            installation.
          </h1>

          <p className="mt-8 text-xl text-zinc-600 leading-relaxed max-w-xl">
            Professional TV mounting with clean alignment, secure installation,
            and cable management for a modern setup.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/#quote"
              className="bg-orange-500 text-black px-8 py-5 rounded-full font-black hover:scale-105 transition"
            >
              Get Quote
            </a>

            <a
              href="/"
              className="bg-white border border-black/10 px-8 py-5 rounded-full font-black"
            >
              Back Home
            </a>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-3 shadow-2xl border border-black/10">
          <img
            src="/images/tv-mounting.jpg"
            alt="TV mounting service"
            className="rounded-[32px] w-full h-[520px] object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Cable Management",
              text: "Clean hidden cable routing for modern setups.",
            },
            {
              title: "Precise Leveling",
              text: "Centered and professionally aligned installation.",
            },
            {
              title: "All Wall Types",
              text: "Drywall, concrete, brick and fireplace mounting.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[32px] p-8 border border-black/10 shadow-sm"
            >
              <h3 className="text-2xl font-black">{item.title}</h3>

              <p className="mt-4 text-zinc-500 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-12">
          <p className="text-orange-500 font-black uppercase tracking-widest">
            Recent Work
          </p>

          <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-3">
            Mounted clean.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            "/images/tv-1.jpg",
            "/images/tv-2.jpg",
            "/images/tv-3.jpg",
          ].map((img) => (
            <div
              key={img}
              className="bg-white rounded-[32px] overflow-hidden border border-black/10 shadow-sm"
            >
              <img
                src={img}
                alt="TV mounting project"
                className="w-full h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="bg-zinc-950 text-white rounded-[40px] p-10 md:p-16 text-center">
          <p className="text-orange-400 font-black uppercase tracking-widest">
            Ready?
          </p>

          <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-4">
            Let’s mount it right.
          </h2>

          <a
            href="/#quote"
            className="inline-flex mt-10 bg-orange-500 text-black px-8 py-5 rounded-full font-black hover:scale-105 transition"
          >
            Send Photos
          </a>
        </div>
      </section>
    </main>
  );
}