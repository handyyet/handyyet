import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrustBar from "../components/TrustBar";
import CtaBand from "../components/CtaBand";
import { pricing, services } from "../../lib/services";

export const metadata = {
  title: "Handyman Prices",
  description: "Clear handyman prices in Huntington Beach & Orange County: $90/hr, starting prices for every service, and one visit for your whole to-do list. Insured.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">Pricing</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">Simple starting prices.</h1>
        <p className="mt-6 text-xl text-zinc-600 max-w-2xl leading-relaxed">$90/hr for handyman work. Every price is confirmed with you before the visit, from your photos.</p>
        <TrustBar className="mt-8" />
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {pricing.map((item) => (
            <div key={item.title} className="bg-white rounded-[32px] p-8 border border-black/10 shadow-sm">
              <h2 className="text-2xl font-black">{item.title}</h2>
              <p className="text-5xl font-black text-[#9a5524] mt-5">{item.price}</p>
              <p className="mt-5 text-zinc-500">{item.text}</p>
            </div>
          ))}
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-20 mb-6">By service</h2>
        <div className="bg-white rounded-[28px] border border-black/10 divide-y divide-black/10">
          {services.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-4 px-6 py-5 hover:bg-[#fdf3ea] transition">
              <span className="font-black text-lg flex-1">{s.title}</span>
              <span className="font-black text-[#9a5524]">{s.price}</span>
              <span className="text-[#c8763a] font-black" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>
      <CtaBand />
      <Footer />
    </main>
  );
}