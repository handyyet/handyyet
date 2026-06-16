import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact | HandyYet",
  description: "Get in touch with HandyYet for fast, reliable handyman services in Orange County.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />
      <section className="max-w-4xl mx-auto px-5 pt-36 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">Contact</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">Send photos. Get a quote.</h1>
        <p className="mt-8 text-xl text-zinc-600">Use the quote form on the homepage to send your project details and photos.</p>
        <a href="/#quote" className="inline-flex mt-10 bg-orange-500 px-8 py-5 rounded-full font-black">Start Quote</a>
      </section>
      <Footer />
    </main>
  );
}