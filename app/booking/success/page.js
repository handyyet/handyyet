import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 pt-40 pb-24 text-center">
        <div className="text-8xl mb-6">✅</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
          Booking received!
        </h1>
        <p className="mt-6 text-lg text-zinc-600 max-w-lg mx-auto leading-relaxed">
          Your booking is confirmed and your card has been securely saved via Stripe.
          We'll reach out by <span className="font-black text-zinc-950">text or email</span> to confirm details before your visit.
        </p>
        <div className="mt-4 text-sm text-zinc-400">
          No charge yet — payment happens after the job is confirmed.
        </div>
        <Link
          href="/"
          className="mt-10 inline-block bg-orange-500 hover:bg-orange-400 text-black font-black px-8 py-5 rounded-full text-lg transition"
        >
          Back to home →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
