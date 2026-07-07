import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Our Work | HandyYet",
  description: "Recent handyman work completed by HandyYet in Orange County: TV mounting, furniture assembly, smart home setup, and repairs.",
};

const projects = [
  { img: "/images/project-1.jpg", title: "Custom Wall Build", text: "Decorative wall panel, lit shelving, and custom cabinets installed." },
  { img: "/images/project-2.jpg", title: "Fountain Repair", text: "Waterproofing and full repaint of an outdoor fountain." },
  { img: "/images/project-3.jpg", title: "Garbage Disposal Switch", text: "In-sink button installed for garbage disposal control." },
  { img: "/images/project-4.jpg", title: "Backyard Cleaning", text: "Power washed and sealed outdoor surfaces with protective coating." },
  { img: "/images/project-5.jpg", title: "Faucet Replacement", text: "New faucet installed with drain assembly." },
  { img: "/images/project-6.jpeg", title: "Chandelier Swap", text: "Old chandelier replaced with new fixture on a 20-foot ceiling." },
  { img: "/images/project-7.jpg", title: "Faucet Replacement", text: "New faucet installed with drain assembly." },
  { img: "/images/project-8.jpg", title: "Kids Playhouse Assembly", text: "Wooden playhouse assembled and installed in the backyard." },
  { img: "/images/project-9.jpg", title: "Shower head replacement", text: "New shower head installed." },
  { img: "/images/project-10.jpg", title: "Cabinets handle replacement", text: "Old cabinet handles replaced with new ones." },
  { img: "/images/project-11.jpg", title: "Hung a picture", text: "Picture hung on wall with appropriate hardware." },
  { img: "/images/project-12.jpg", title: "Garbage Disposal replacement", text: "New garbage disposal installed with proper connections." },
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
