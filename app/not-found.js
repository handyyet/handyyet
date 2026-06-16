import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950 flex flex-col">
      <Navbar />
      <section className="flex-1 max-w-7xl mx-auto px-5 pt-36 pb-20 flex flex-col items-start justify-center">
        <p className="text-orange-500 font-black uppercase tracking-widest">404</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">Page not found.</h1>
        <p className="mt-8 text-xl text-zinc-600 max-w-xl leading-relaxed">
          The page you're looking for doesn't exist. Try one of the links below.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/" className="bg-orange-500 text-black px-8 py-5 rounded-full font-black">Back Home</a>
          <a href="/services" className="bg-white border border-black/10 px-8 py-5 rounded-full font-black">View Services</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}