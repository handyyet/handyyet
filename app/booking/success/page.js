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
          className="mt-10 inline-block bg-gradient-to-b from-[#2a2620] to-[#15130f] text-[#f3ead9] border border-[#8a6a3f]/50 hover:border-[#c9a06b]/70 hover:from-[#332d24] hover:to-[#1b1915] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 font-black px-8 py-5 rounded-full text-lg"
        >
          Back to home →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
