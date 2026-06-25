import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Reviews | HandyYet",
  description: "Five-star reviews from real clients in Orange County. See what people say about HandyYet handyman services.",
};

const reviews = [
  { date: "Jun 13, 2026", service: "Light Carpentry", text: "Amazing job. Super efficient, knowledgeable, and worked with great attention to detail. Everything was done perfectly. Highly recommend this Tasker. Beyond 5 stars rating!" },
  { date: "Jun 10, 2026", service: "General Mounting", text: "Nikita was willing to try doing something new: setting up my patio sail shades on pre-existing mounts, and it worked out well. He was a joy to work with." },
  { date: "Jun 2, 2026", service: "Sealing & Caulking", text: "Nick was very professional and precise on what we needed for our shower. Thank you." },
  { date: "May 20, 2026", service: "Light Carpentry", text: "Nikita installed trim for us that was one of our last steps in finishing a big job in our home. Nikita did such an excellent job with amazing artistry! It looks perfect! We are so pleased with the result and Nikita made sure that it was done right. It is beautiful!" },
  { date: "May 10, 2026", service: "Electrical", text: "Thank you for accommodating our requests. Great service and attention to detail." },
  { date: "May 4, 2026", service: "Electrical", text: "Nikita is very good. He has a lot of experience in anything related to electricity, plumbing, home renovation, and others. Highly recommend him!" },
  { date: "May 2, 2026", service: "Plumbing", text: "100% competent on a variety of tasks: plumbing, furnishings assembly and installation. Will definitely hire him again!" },
  { date: "Apr 29, 2026", service: "Electrical", text: "I had a problem with low voltage lights someone else was unable to fix and Nikita came promptly, diagnosed and fixed the problem much faster than anticipated. Very professional and friendly. Highly recommend." },
  { date: "Apr 22, 2026", service: "Electrical", text: "Rock solid tasker. Worked hard and quick and did super good work. Very pleased and highly recommend him." },
  { date: "Apr 12, 2026", service: "Plumbing", text: "We had a great experience with Nikita. He was quick to respond, arrived on time, and fixed the issue efficiently. Everything was explained clearly, and the pricing was great. He was professional, detail-oriented, and left the area clean. Highly recommend Nikita!" },
  { date: "Apr 3, 2026", service: "Plumbing", text: "Nikita was absolutely fantastic! He put a new cartridge in my Kohler shower, changed out two toilet bowl seats, and hung many pictures throughout my house. I'm so happy I have a go-to guy whenever I need repairs done in an efficient professional manner." },
  { date: "Apr 3, 2026", service: "Electrical", text: "Nik was excellent in several tasks: electrical, cabinet assembly, door knob fix, water heater. He had great attention to details, was very efficient and professional. I'd hire him again and highly recommend him!" },
  { date: "Apr 1, 2026", service: "Plumbing", text: "Five stars for speed! Our disposal died and Nikita had the new one installed and tested before I could even finish my coffee. Truly efficient service and a fair price. Will definitely call again." },
  { date: "Mar 29, 2026", service: "Electrical", text: "I had a wonderful experience with Nikita! He showed up on time, was super easy to work with, and did a really solid job. He kept things clean and explained everything before and after the job. Just an all-around nice guy who knows what he's doing. Would definitely call him again." },
  { date: "Mar 24, 2026", service: "Plumbing", text: "Nikita went above and beyond in helping install new sink faucets — would hire again!" },
  { date: "Mar 23, 2026", service: "Plumbing", text: "He arrived on time, communicated clearly throughout the process, and did a great job replacing my faucet. Everything was completed efficiently and professionally. I would highly recommend booking him." },
  { date: "Mar 18, 2026", service: "General Mounting", text: "Nikita did an amazing job hanging up my artwork and lights, super precise and quick! He also replaced my bathroom exhaust fan. He even volunteered to come back to swap out an anchor that was having difficulties. Highly recommend!" },
  { date: "Mar 18, 2026", service: "Plumbing", text: "I highly recommend Nikita. He did a fantastic job. He helped fix three plumbing issues I had at once!" },
  { date: "Mar 13, 2026", service: "Electrical", text: "Nikita was great! Friendly, quick, and helpful. He installed our ceiling fan and chandelier." },
  { date: "Mar 7, 2026", service: "Electrical", text: "Nikita was responsive, communicative, professional, skilled and quick. He did a quality job and knew what he was doing. He was very respectful and kind. I would book him again in a heartbeat." },
  { date: "Mar 6, 2026", service: "Electrical", text: "Nikita is thorough and does a great job!! Very reliable and hard working." },
  { date: "Mar 4, 2026", service: "General Mounting", text: "Super helpful and efficient." },
  { date: "Feb 21, 2026", service: "Electrical", text: "Nikkita was amazing. I would definitely recommend. He is the best." },
  { date: "Feb 20, 2026", service: "Electrical", text: "Awesome awesome awesome. Super nice guy, very capable and did everything I needed to complete and set up a very complex and confusing electrical task that was way over my head." },
  { date: "Feb 14, 2025", service: "Electrical", text: "Nikita helped install our Ring devices, and he was exceptional. He was highly respectful of our property, came up with solutions on the spot, and thoughtfully positioned our solar panels to maximize sunlight. We would definitely hire him again. Thank you!" },
  { date: "May 19, 2025", service: "Electrical", text: "Knowledgeable and quick. Would use again." },
  { date: "May 9, 2025", service: "Smart Home", text: "He came on time, got the task done and was very thorough. The price was very fair." },
];

const serviceColors = {
  "Electrical": "bg-yellow-100 text-yellow-800",
  "Plumbing": "bg-blue-100 text-blue-800",
  "General Mounting": "bg-orange-100 text-orange-800",
  "Smart Home": "bg-purple-100 text-purple-800",
  "Light Carpentry": "bg-green-100 text-green-800",
  "Sealing & Caulking": "bg-zinc-100 text-zinc-700",
  "Furniture Assembly": "bg-pink-100 text-pink-800",
};

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
    <path fill="#4285F4" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.8 17.7 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4C43.1 36.8 46.1 31.1 46.1 24.5z"/>
    <path fill="#FBBC05" d="M10.7 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7-5.4A23.9 23.9 0 0 0 .1 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/>
    <path fill="#EA4335" d="M24 47c5.6 0 10.4-1.9 13.9-5l-7-5.4c-1.9 1.3-4.3 2-6.9 2-6.3 0-11.6-4.3-13.5-10.1l-7.9 6.1C7 40.3 14.8 47 24 47z"/>
  </svg>
);

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 pt-36 pb-20">
        <p className="text-orange-500 font-black uppercase tracking-widest">Reviews</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mt-4">
          Trusted by<br /><span className="text-orange-500">local clients.</span>
        </h1>
        <p className="mt-8 text-xl text-zinc-600 max-w-2xl leading-relaxed">
          Real reviews from real clients across Orange County. 5-star service, every time.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-5 pb-12">
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          {[
            { num: "85+", label: "Happy clients" },
            { num: "5.0", label: "Avg rating" },
            { num: "100%", label: "5-star" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-[24px] p-5 md:p-8 border border-black/10 text-center">
              <p className="text-3xl md:text-6xl font-black text-orange-500">{s.num}</p>
              <p className="text-zinc-500 font-bold mt-1 text-xs md:text-base">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leave a Review buttons */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://g.page/r/Caqs8MHefRFaEBM/review" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white border border-black/10 rounded-full px-8 py-4 font-black text-zinc-950 hover:shadow-lg hover:-translate-y-0.5 transition">
            <GoogleIcon />
            Leave a Google Review
          </a>
          <a href="https://www.yelp.com/writeareview/biz/7asHGqucJQSljXn1dF2RTw?review_origin=mobile-site-biz-details-action-button&return_url=https://m.yelp.com/biz/handyyet-huntington-beach"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#FF1A1A] text-white rounded-full px-8 py-4 font-black hover:shadow-lg hover:-translate-y-0.5 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="white">
              <path d="M12.28 2.25c-.38-.01-.7.28-.75.66L10.4 9.7a.77.77 0 0 0 1.2.78l5.18-3.7a.77.77 0 0 0-.1-1.33 9.2 9.2 0 0 0-4.4-1.2zM7.1 7.93a.77.77 0 0 0-.96.28 9.2 9.2 0 0 0-1.4 4.3.77.77 0 0 0 .97.79l6.14-1.93a.77.77 0 0 0 .12-1.43L7.1 7.93zm10.5 2.75-5.7 2.96a.77.77 0 0 0 .17 1.44l6.3 1.2a.77.77 0 0 0 .85-.97 9.2 9.2 0 0 0-1.62-4.63zM9.4 15.05l-5.52 2.9a.77.77 0 0 0 .13 1.42 9.2 9.2 0 0 0 4.56.63.77.77 0 0 0 .62-1.06l-1.7-3.84a.77.77 0 0 0-.09-.05zm5.36.93a.77.77 0 0 0-1.1.62l-.47 6.35a.77.77 0 0 0 1.06.77 9.2 9.2 0 0 0 3.76-2.77.77.77 0 0 0-.27-1.2l-3-1.77z"/>
            </svg>
            Leave a Yelp Review
          </a>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="max-w-7xl mx-auto px-5 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-[24px] p-5 md:p-7 border border-black/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <span className={`text-xs font-black px-3 py-1 rounded-full ${serviceColors[review.service] || "bg-zinc-100 text-zinc-700"}`}>
                  {review.service}
                </span>
                <span className="text-zinc-400 text-sm font-bold">{review.date}</span>
              </div>
              <p className="text-orange-400 mt-4">★★★★★</p>
              <p className="mt-3 text-zinc-700 leading-snug text-[15px]">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-28">
        <div className="relative bg-zinc-950 rounded-[36px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#ff6a0030,transparent_60%)]" />
          <div className="relative p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Get Started</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-2">Join our happy clients.</h2>
              <p className="mt-3 text-zinc-400 text-lg">Send photos and get a fast quote today.</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a href="/#quote" className="bg-orange-500 text-black px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-orange-400 hover:scale-105 transition shadow-xl">
                Send Photos →
              </a>
              <a href="tel:+19498283959" className="bg-white/10 text-white px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap hover:bg-white/20 transition">
                📞 (949) 828-3959
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
