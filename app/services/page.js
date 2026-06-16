import { services } from "../../lib/services";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Services | HandyYet",
  description:
    "Browse HandyYet's handyman services: TV mounting, furniture assembly, smart home setup, and small home repairs in Orange County.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">HandyYet Services</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">Home services<br />made simple.</h1>
        <p className="mt-8 text-xl text-zinc-600 max-w-2xl leading-relaxed">Choose a service, send photos, and get a fast quote for clean, reliable handyman work.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {services.map((service) => (
            <a href={`/services/${service.slug}`} key={service.slug} className="group bg-white rounded-[32px] p-7 border border-black/10 hover:-translate-y-2 hover:shadow-2xl transition duration-300">
              <div className="text-5xl">{service.icon}</div>
              <h2 className="text-2xl font-black mt-6">{service.title}</h2>
              <p className="mt-3 text-zinc-500 leading-relaxed">{service.short}</p>
              <p className="mt-5 text-orange-500 font-black">{service.price}</p>
              <div className="mt-6 font-black text-orange-500">Learn more →</div>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}