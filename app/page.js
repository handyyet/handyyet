export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">
          Handy<span className="text-orange-500">Yet</span>
        </h1>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#quote">Quote</a>
        </div>

        <button className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-5 py-3 rounded-full transition">
          Get a Quote
        </button>
      </nav>

      {/* HERO */}
      <section className="px-8 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        <div>
          <div className="inline-block border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 mb-8">
            Modern handyman services in Southern California
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-8">
            Snap.
            <br />
            Solve.
            <br />
            <span className="text-orange-500">Repair.</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Fast, clean and reliable home repair services.
            Send photos of the issue and get a quick estimate.
          </p>

          <div className="flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-400 text-black px-7 py-4 rounded-full font-semibold transition">
              Get a Quote
            </button>

            <button className="border border-white/10 hover:border-white/30 px-7 py-4 rounded-full transition">
              View Projects
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            alt="Shelving"
            className="w-full h-[550px] object-cover"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="px-8 py-20 max-w-7xl mx-auto"
      >
        <p className="text-orange-500 uppercase text-sm mb-4">
          Services
        </p>

        <h2 className="text-5xl font-bold mb-4">
          Small repairs. Done right.
        </h2>

        <p className="text-gray-400 max-w-2xl mb-14">
          From plumbing fixes to doors, shelves, lighting,
          painting and everyday home repairs.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Plumbing Repairs",
              text: "Valve replacement, tub spouts, faucets and leak fixes."
            },
            {
              title: "Doors & Hardware",
              text: "Door repair, hinges, handles, locks and trim."
            },
            {
              title: "Shelving & Mounting",
              text: "Custom shelves, TVs, mirrors and wall fixtures."
            },
            {
              title: "Painting & Finish Work",
              text: "Clean touch-ups, doors, trim and finish details."
            },
            {
              title: "Lighting Fixtures",
              text: "Fixture replacement and simple electrical installs."
            },
            {
              title: "General Repairs",
              text: "Everyday home fixes completed with attention to detail."
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-400">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="px-8 py-20 max-w-7xl mx-auto"
      >
        <p className="text-orange-500 uppercase text-sm mb-4">
          Recent Work
        </p>

        <h2 className="text-5xl font-bold mb-14">
          Real repairs. Real results.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Tub Spout Replacement",
              text: "Completed in under 1 hour.",
              image:
                "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1200&auto=format&fit=crop"
            },
            {
              title: "Water Valve Replacement",
              text: "Clean installation and leak-free result.",
              image:
                "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop"
            },
            {
              title: "Custom Shelving",
              text: "Modern shelving with clean finish work.",
              image:
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-400">
                  {project.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="px-8 py-20 max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-6">

          {[
            "Clean professional work",
            "Fast photo-based estimates",
            "Reliable communication",
            "Detail-focused repairs",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8"
            >
              <p className="text-orange-500 text-4xl font-bold mb-5">
                0{index + 1}
              </p>

              <p className="text-lg">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section
        id="quote"
        className="px-8 pb-24 max-w-7xl mx-auto"
      >
        <div className="bg-orange-500 rounded-[40px] p-10 md:p-16 grid md:grid-cols-2 gap-14 items-center">

          <div>
            <h2 className="text-5xl md:text-6xl font-black text-black leading-none mb-6">
              Send photos.
              <br />
              Get a quote.
            </h2>

            <p className="text-black/80 text-lg">
              Tell us what needs fixing and upload photos.
              We’ll respond with next steps.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8">

            <div className="grid gap-4">

              <input
                type="text"
                placeholder="Your name"
                className="bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Phone number"
                className="bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
              />

              <textarea
                placeholder="Describe the issue"
                className="bg-zinc-100 rounded-2xl px-5 py-4 outline-none min-h-[140px]"
              />

              <button className="bg-black hover:bg-zinc-800 text-white py-4 rounded-full font-semibold transition">
                Request Quote
              </button>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}