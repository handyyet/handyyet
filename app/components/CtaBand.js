// Closing call-to-action used at the bottom of every page. Server-safe (no hooks).
export default function CtaBand({
  title = "Send photos. Get a price today.",
  sub = "One visit for your whole list · $90/hr · Insured · Huntington Beach & Orange County",
  quoteHref = "/booking",
}) {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-24">
      <div className="rounded-[36px] bg-[#efe3d4] p-8 md:p-14 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">{title}</h2>
          <p className="mt-4 text-zinc-700 font-semibold">{sub}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a href={quoteHref}
            className="bg-[#b4662f] text-white border-2 border-[#b4662f] px-9 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-[#9a5524] hover:border-[#9a5524] hover:shadow-[0_10px_24px_-8px_rgba(200,118,58,0.6)] transition">
            Get a quote →
          </a>
          <a href="tel:+19498283959"
            className="bg-white border-2 border-[#c8763a] text-zinc-950 px-9 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:shadow-lg transition">
            Call (949) 828-3959
          </a>
        </div>
      </div>
    </section>
  );
}
