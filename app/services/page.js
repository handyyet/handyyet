const services = [
  {
    title: "TV Mounting",
    text: "Clean TV installation with secure mounting and cable management.",
    link: "/services/tv-mounting",
    icon: "📺",
  },
  {
    title: "Furniture Assembly",
    text: "Beds, dressers, desks, shelves, cabinets and more.",
    link: "/services/furniture-assembly",
    icon: "🪑",
  },
  {
    title: "Smart Home",
    text: "Thermostats, locks, cameras and connected home devices.",
    link: "/services/smart-home",
    icon: "🏠",
  },
  {
    title: "Handyman Repairs",
    text: "Small repairs, fixtures, doors, hardware, shelves and general fixes.",
    link: "/services/handyman-repairs",
    icon: "🛠️",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <section className="max-w-7xl mx-auto px-5 pt-32 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">
          HandyYet Services
        </p>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">
          Home services
          <br />
          made simple.
        </h1>

        <p className="mt-8 text-xl text-zinc-600 max-w-2xl leading-relaxed">
          Choose a service, send photos, and get a fast quote for clean,
          reliable handyman work.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {services.map((service) => (
            <a
              href={service.link}
              key={service.title}
              className="group bg-white rounded-[32px] p-7 border border-black/10 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-5xl">{service.icon}</div>

              <h2 className="text-2xl font-black mt-6">{service.title}</h2>

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

      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="bg-zinc-950 text-white rounded-[40px] p-10 md:p-16 text-center">
          <p className="text-orange-400 font-black uppercase tracking-widest">
            Need help?
          </p>

          <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-4">
            Send photos and get a quote.
          </h2>

          <a
            href="/#quote"
            className="inline-flex mt-10 bg-orange-500 text-black px-8 py-5 rounded-full font-black hover:scale-105 transition"
          >
            Start Quote
          </a>
        </div>
      </section>
    </main>
  );
}