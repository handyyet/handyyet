import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Our Work | HandyYet",
  description: "Recent handyman work completed by HandyYet in Orange County: TV mounting, furniture assembly, smart home setup, and repairs.",
};

const projects = [
  { img: "/images/work-shower-fixture.jpg", title: "Shower Cartridge Replacement", text: "Replaced a worn cartridge and restored cold water supply to the shower." },
  { img: "/images/work-ceiling-fan.jpg", title: "Ceiling Fan Installation", text: "Installed a new ceiling fan onto the existing wiring." },
  { img: "/images/work-closet-shelving.jpg", title: "Custom Closet Shelving", text: "Built and installed a full 4-shelf system in a custom nook." },
  { img: "/images/work-bidet-seat.jpg", title: "Bidet Seat Installation", text: "Installed a new bidet attachment with adjustable water spray." },
  { img: "/images/work-toilet-replacement.jpg", title: "Toilet Replacement", text: "Removed the old toilet and corroded flange, installed a new one with a fresh wax seal." },
  { img: "/images/work-shutoff-valve.jpg", title: "Shutoff Valve Installation", text: "Installed a new supply line shutoff valve on exposed copper piping." },
  { img: "/images/work-kitchen-faucet.jpg", title: "Kitchen Faucet Replacement", text: "Replaced the old pull-down faucet with a modern matte black kitchen faucet." },
  { img: "/images/work-storage-shed.jpg", title: "Storage Shed Assembly", text: "Cleared the site and assembled a new outdoor storage shed." },
  { img: "/images/work-garbage-disposal.jpg", title: "Garbage Disposal Replacement", text: "Swapped out an old garbage disposal for a new unit under the sink." },
  { img: "/images/work-picture-hanging.jpg", title: "Picture Hanging", text: "Used a laser level to hang a large framed piece perfectly straight." },
  { img: "/images/work-shower-head.jpg", title: "Shower Head Upgrade", text: "Upgraded a fixed shower head to a dual rain and handheld combo." },
  { img: "/images/work-bathroom-faucet.jpg", title: "Bathroom Faucet Replacement", text: "Replaced an old two-handle faucet with a modern single-handle matte black fixture." },
  { img: "/images/work-playhouse.jpg", title: "Kids Playhouse Assembly", text: "Assembled a wooden kids' playhouse from the box in the backyard." },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">Work</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">Before. After. Done.</h1>
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {projects.map((project) => (
            <div key={project.title} className="bg-white rounded-[32px] overflow-hidden border border-black/10 shadow-sm">
              <img src={project.img} className="h-80 w-full object-cover bg-zinc-200" alt={project.title} />
              <div className="p-6">
                <h2 className="text-2xl font-black">{project.title}</h2>
                <p className="text-zinc-500 mt-2">{project.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="relative bg-[#fdfaf5] rounded-[36px] overflow-hidden border-2 border-[#c8763a]/50 shadow-[0_20px_60px_-30px_rgba(200,118,58,0.35)]">
          <div className="relative p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Get Started</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-950 mt-2">Join our happy clients.</h2>
              <p className="mt-3 text-zinc-500 text-lg">Send photos and get a fast quote today.</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a href="/booking" className="border-2 border-[#c8763a] text-zinc-950 bg-white hover:bg-[#c8763a] hover:text-white hover:border-[#c8763a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_24px_-8px_rgba(200,118,58,0.45)] transition-all duration-300 px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap">
                Send Photos →
              </a>
              <a href="tel:+19498283959" className="bg-white border border-black/10 text-zinc-950 px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-[#fdf3ea] hover:border-[#c8763a]/40 transition">
                (949) 828-3959
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
