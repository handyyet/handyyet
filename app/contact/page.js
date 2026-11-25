import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrustBar from "../components/TrustBar";
import SmartButton from "../components/SmartButton";

export const metadata = {
  title: "Contact",
  description: "Call, text or email HandyYet, an insured handyman in Huntington Beach & Orange County. Send photos of the job and get a price fast. (949) 828-3959.",
  alternates: { canonical: "/contact" },
};

const WAYS = [
  { href: "/booking", title: "Send photos & book", text: "The fastest way to a price: describe the job, add photos, pick a time.", cta: "Start a quote →" },
  { href: "sms:+19498283959", title: "Text photos", text: "Snap the problem and text it to (949) 828-3959.", cta: "Text now →" },
  { href: "tel:+19498283959", title: "Call", text: "Talk it through with Nikita, 8am–8pm, Mon–Sat.", cta: "(949) 828-3959 →" },
  { href: "mailto:hello@handyyet.com", title: "Email", text: "For property managers, invoices and larger projects.", cta: "hello@handyyet.com →" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-24">
        <p className="text-[#9a5524] font-black uppercase tracking-widest">Contact</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">Send photos.<br />Get a price.</h1>
        <p className="mt-8 text-xl text-zinc-600 max-w-2xl leading-relaxed">Huntington Beach, Orange County and Long Beach. Usually a reply within the hour during the day.</p>
        <TrustBar className="mt-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {WAYS.map((w) => (
            <a key={w.title} href={w.href}
              className="group bg-white rounded-[28px] p-7 border border-[#ead9c6] hover:border-[#c8763a] hover:-translate-y-1 hover:shadow-xl transition duration-300 flex flex-col">
              <h2 className="text-2xl font-black">{w.title}</h2>
              <p className="mt-3 text-zinc-600 leading-relaxed flex-1">{w.text}</p>
              <span className="mt-6 font-black text-[#9a5524]">{w.cta}</span>
            </a>
          ))}
        </div>
      </section>
      <SmartButton />
      <Footer />
    </main>
  );
}
