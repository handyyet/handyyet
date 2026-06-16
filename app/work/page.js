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
      <Footer />
    </main>
  );
}
