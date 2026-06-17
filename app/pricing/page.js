import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Pricing | HandyYet",
  description: "Transparent pricing for handyman services in Orange County. TV mounting, plumbing, electrical, furniture assembly and more.",
};

const categories = [
  {
    icon: "⚡",
    title: "Electrical",
    image: "/images/electrical-2.jpg",
    hourly: false,
    items: [
      { name: "Outlet / Switch Replacement", price: "$79", desc: "Safe swap of standard outlets or switches." },
      { name: "Ceiling Fan Installation", price: "$109", desc: "Full install with wiring and balancing." },
      { name: "Light Fixture Swap", price: "$89", desc: "Remove old fixture, install new one." },
      { name: "Dimmer / GFCI Install", price: "$79", desc: "Upgrade to dimmer or GFCI safety outlet." },
      { name: "High Ceiling Fixture (20ft+)", price: "$179", desc: "Chandelier or pendant on high ceilings." },
    ],
  },
  {
    icon: "🔧",
    title: "Plumbing",
    image: "/images/plumbing-2.jpg",
    hourly: false,
    items: [
      { name: "Faucet Replacement", price: "$99", desc: "New faucet installed with drain assembly." },
      { name: "Toilet Repair / Replace", price: "$115", desc: "Flapper, fill valve, or full replacement." },
      { name: "Garbage Disposal Install", price: "$135", desc: "Remove old unit, install new disposal." },
      { name: "Shut-off Valve Replace", price: "$89", desc: "Replace leaking or stuck shut-off valve." },
    ],
  },
  {
    icon: "📺",
    title: "Mounting & Assembly",
    image: "/images/tv-mounting-1.jpg",
    hourly: false,
    items: [
      { name: "TV Mounting", price: "$89", desc: "Secure mount on drywall, studs, or brick." },
      { name: "Furniture Assembly", price: "$75", desc: "IKEA, Wayfair, Amazon and more." },
      { name: "Shelving & Wall Mounts", price: "$69", desc: "Floating shelves, gallery walls, brackets." },
      { name: "Soundbar / Accessories", price: "$59", desc: "Mount soundbar or accessories below TV." },
    ],
  },
  {
    icon: "🏠",
    title: "Smart Home",
    image: "/images/smart-1.jpg",
    hourly: false,
    items: [
      { name: "Smart Thermostat", price: "$85", desc: "Nest, Ecobee, or Honeywell install." },
      { name: "Doorbell / Camera Install", price: "$79", desc: "Ring, Nest, Arlo setup and mounting." },
      { name: "Smart Lock Install", price: "$89", desc: "Keypad or app-controlled lock swap." },
    ],
  },
  {
    icon: "🛠️",
    title: "Handyman",
    image: "/images/repair-1.jpg",
    hourly: true,
    items: [
      { name: "Door hardware & hinges", desc: "Handle, lock, hinge replacement." },
      { name: "Shelving & mounting", desc: "Floating shelves, brackets, gallery walls." },
      { name: "Caulking & touch-ups", desc: "Kitchen, bath, windows resealed." },
      { name: "Drywall patches", desc: "Small to medium holes patched and sanded." },
      { name: "Curtain rods & blinds", desc: "Rods, shades, and blinds installed level." },
      { name: "Fixture swaps & more", desc: "Any small home repair or maintenance job." },
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">Pricing</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">
          Fair prices.<br />No surprises.
        </h1>
        <p className="mt-8 text-xl text-zinc-600 max-w-2xl leading-relaxed">
          All prices are starting rates for standard jobs in Orange County. Final quote based on photos — send them and we'll confirm exact cost before any work begins.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/#quote" className="bg-orange-500 text-black px-8 py-5 rounded-full font-black shadow-xl hover:scale-105 transition">Get Exact Quote</a>
          <a href="/services" className="bg-white border border-black/10 px-8 py-5 rounded-full font-black hover:bg-zinc-100 transition">View Services</a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-28 grid gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="bg-white rounded-[40px] border border-black/10 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-[320px_1fr]">
              {/* Photo */}
              <div className="relative h-56 md:h-auto">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-4xl">{cat.icon}</p>
                  <h2 className="text-3xl font-black text-white mt-1">{cat.title}</h2>
                </div>
              </div>

              {/* Items */}
              <div className="p-8">
                {cat.hourly ? (
                  <>
                    {/* Hourly rate */}
                    <div className="mb-6 pb-6 border-b border-black/5">
                      <div className="flex items-center gap-4 mb-5">
                        <div>
                          <p className="text-5xl font-black text-orange-500">$70<span className="text-2xl text-zinc-400">/hr</span></p>
                          <p className="text-zinc-500 text-sm mt-1">1 hour minimum · any job · any difficulty</p>
                        </div>
                        <a href="/#quote" className="ml-auto bg-orange-500 text-black px-6 py-3 rounded-full font-black text-sm whitespace-nowrap hover:scale-105 transition shadow-md">
                          Book Now →
                        </a>
                      </div>
                      {/* Bundle deals */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-orange-50 border border-orange-200 rounded-[20px] p-4">
                          <p className="text-zinc-400 text-sm font-black">5 hours</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <p className="text-3xl font-black text-orange-500">$300</p>
                            <p className="text-zinc-400 text-sm line-through">$350</p>
                          </div>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-[20px] p-4">
                          <p className="text-zinc-400 text-sm font-black">8 hours</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <p className="text-3xl font-black text-orange-500">$450</p>
                            <p className="text-zinc-400 text-sm line-through">$560</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y divide-black/5">
                      {cat.items.map((item) => (
                        <div key={item.name} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                          <div className="text-orange-500 font-black mt-0.5">✓</div>
                          <div>
                            <p className="font-black">{item.name}</p>
                            <p className="text-zinc-500 text-sm mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="divide-y divide-black/5">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-start justify-between gap-6 py-4 first:pt-0 last:pb-0">
                        <div>
                          <p className="font-black text-lg">{item.name}</p>
                          <p className="text-zinc-500 text-sm mt-1">{item.desc}</p>
                        </div>
                        <p className="text-orange-500 font-black text-xl whitespace-nowrap">{item.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-28">
        <div className="relative bg-zinc-950 rounded-[36px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#ff6a0030,transparent_60%)]" />
          <div className="relative p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Get Started</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-2">Not sure about the price?</h2>
              <p className="mt-3 text-zinc-400 text-lg">Send photos — we'll give you an exact quote in minutes.</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a href="/#quote" className="bg-orange-500 text-black px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-orange-400 hover:scale-105 transition shadow-xl">
                Send Photos →
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
