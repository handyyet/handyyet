import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 pt-40 pb-24 text-center">
        <div className="w-16 h-[3px] bg-orange-500 mx-auto mb-8 rounded-full" />
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
          Booking confirmed!
        </h1>
        <p className="mt-6 text-lg text-zinc-600 max-w-lg mx-auto leading-relaxed">
          Your $50 deposit has been received and your card is saved for the final payment.
          We'll reach out by <span className="font-black text-zinc-950">text or email</span> to confirm details before your visit.
        </p>
        <div className="mt-4 text-sm text-zinc-400">
          The deposit will be applied toward your final bill.
        </div>
        <Link
          href="/"
          className="mt-10 inline-block border-2 border-[#c8763a] text-zinc-950 bg-white hover:bg-[#c8763a] hover:text-white hover:border-[#c8763a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_24px_-8px_rgba(200,118,58,0.45)] transition-all duration-300 font-black px-8 py-5 rounded-full text-lg"
        >
          Back to home →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
