import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Reviews | HandyYet",
  description: "Five-star reviews from real clients in Orange County. See what people say about HandyYet handyman services.",
};

const reviews = [
  { date: "Oct 17, 2026", service: "Electrical", text: "I had a very difficult chandelier to install with a mess of cut wires, and he went above and beyond to get everything working perfectly. He took the chandelier apart, carefully rewired everything, and made sure every detail was just right. He also installed a dimmer switch for me! I couldn't be happier with the results and would absolutely recommend him to anyone!" },
  { date: "Oct 11, 2026", service: "Plumbing", text: "This was my second time booking Nikita, and once again, he exceeded every expectation. He never disappoints! Not only was his work completely thorough, but he also went out of his way to double-check every single detail before finishing up. What stood out the most was his thoughtfulness. My baby was napping, and he made a deliberate effort to keep noise levels down throughout the entire job, which was incredibly considerate and deeply appreciated. Nikita is professional, meticulous, and reliable. If you are looking for someone who takes true pride in their craft and treats your home with respect, look no further. I cannot recommend him highly enough and will definitely continue hiring him!" },
  { date: "Oct 10, 2026", service: "Sealing & Caulking", text: "Nikita was great! He replaced the caulking on my shower and hung lights and a shelf. He works quickly but meticulously. Highly recommend." },
  { date: "Oct 10, 2026", service: "Plumbing", text: "Nikita did a wonderful job. Will hire him again!" },
  { date: "Oct 9, 2026", service: "Electrical", text: "Nikita replaced a broken outdoor light set for me. Clear communication. Very professional and organized. I highly recommend!" },
  { date: "Oct 7, 2026", service: "Plumbing", text: "Great speed, communication and work." },
  { date: "Oct 6, 2026", service: "General Mounting", text: "Nikita is amazing, we highly recommend him and he always does quality work." },
  { date: "Oct 4, 2026", service: "Plumbing", text: "Nikita was punctual and fast! He knew exactly what to do and he cleaned up afterwards. Will book again for sure." },
  { date: "Oct 3, 2026", service: "Electrical", text: "Nikita was awesome. Solved the issue and I will hire again. Thank you!" },
  { date: "Oct 1, 2026", service: "General Mounting", text: "Excellent work and service at a great price. Highly recommended and will use again!" },
  { date: "Sep 29, 2026", service: "Plumbing", text: "He is very detailed oriented, clean up after work. I will definitely use him next time." },
  { date: "Sep 25, 2026", service: "Plumbing", text: "Completed multiple tasks - TV mounting, showerhead and toilet bidet installation in under an hour. Would highly recommend!" },
  { date: "Sep 25, 2026", service: "TV Mounting", text: "Nikita was great, professional and did a great job." },
  { date: "Sep 24, 2026", service: "General Mounting", text: "Perfect work" },
  { date: "Sep 24, 2026", service: "Plumbing", text: "Nikita was great! Fast, nice, and knew exactly what to do. Bought parts on the way to do the job. Would use again." },
  { date: "Sep 21, 2026", service: "TV Mounting", text: "Very knowledgable and did the work quickly and accurately." },
  { date: "Sep 18, 2026", service: "Minor Home Repairs", text: "Thank you, Nikita. He was fast and good." },
  { date: "Sep 16, 2026", service: "Plumbing", text: "Communicate well in finding my exact location, completed the job quickly and efficiently, overall good job." },
  { date: "Sep 12, 2026", service: "Light Carpentry", text: "Nikita was extremely attentive to detail and extremely communicative. We are really pleased with the result and will definitely use his services again." },
  { date: "Sep 10, 2026", service: "Plumbing", text: "Great job!" },
  { date: "Sep 9, 2026", service: "Electrical", text: "Worked on replacing some outdoor pathway and garden spot lights. Did an excellent job, was efficient, and the end result looks great" },
  { date: "Sep 5, 2026", service: "Electrical", text: "Fast and meticulous, super easy to work with!" },
  { date: "Sep 3, 2026", service: "General Mounting", text: "This is the 2nd time I've used Nikita and I would hire him time and time again. He's extremely efficient and meticulous." },
  { date: "Sep 1, 2026", service: "Plumbing", text: "Nikita had great communication with me on when he would arrive and wrapped up the job super quickly. If you need the job done today this is your guy." },
  { date: "Aug 31, 2026", service: "Electrical", text: "Great worker!" },
  { date: "Aug 28, 2026", service: "Electrical", text: "Nikita was professional and knowledgeable. He worked efficiently and was helpful in discussing future projects." },
  { date: "Aug 28, 2026", service: "Electrical", text: "Nikita was very professional and communicative, he came with the right tools and supplies to get the job done right & quickly ⭐⭐⭐⭐⭐" },
  { date: "Aug 28, 2026", service: "Electrical", text: "Friendly, fast, efficient, highly recommended" },
  { date: "Aug 28, 2026", service: "Electrical", text: "Absolutely amazing work! On time, communicative, clean!" },
  { date: "Aug 27, 2026", service: "Plumbing", text: "Great service! Was on time and was able to replace my garbage disposal quickly." },
  { date: "Aug 27, 2026", service: "Plumbing", text: "Nikita is the real deal. He has great attention to detail, extremely professional, and a hard worker. 10/10 I'll always hire him for a job." },
  { date: "Aug 26, 2026", service: "Furniture Assembly", text: "Nikita was incredible! He arrived well ahead of schedule (after confirming it was okay), and was highly efficient. He was even able to complete the assembly projects we had despite the dirt bike coming with damaged pieces and the baby gate not having correct screw size. We highly, highly recommend him and will definitely be using him in the future!" },
  { date: "Aug 26, 2026", service: "General Mounting", text: "I would hire him again and again" },
  { date: "Aug 25, 2026", service: "General Mounting", text: "This was our second time using Nikita! He is outstanding and so kind. He is quick and easy and can help in many ways." },
  { date: "Aug 23, 2026", service: "TV Mounting", text: "Nikita did an amazing job and is very professional!" },
  { date: "Aug 23, 2026", service: "Plumbing", text: "Nikita is GREAT! He communicated well. Showed up when we agreed. Did the work faster than expected and the entire work area was clean when he finished. I would definitely use him again!" },
  { date: "Aug 22, 2026", service: "TV Mounting", text: "Friendly and works very fast." },
  { date: "Aug 19, 2026", service: "General Mounting", text: "This gentleman is amazing! Punctual, professional, highly skilled, and executes exactly what is asked of him. I was very impressed and grateful for his assistance. I highly recommend him!" },
  { date: "Aug 19, 2026", service: "General Mounting", text: "Very impressed with Nikita. He's clean and meticulous. Everything looks perfect and I would absolutely hire him again." },
  { date: "Aug 18, 2026", service: "General Mounting", text: "Great service. Kind, quick and efficient. Would recommend to a friend or family member." },
  { date: "Aug 17, 2026", service: "General Mounting", text: "Professional and quick, but not so quick that he sacrifices quality. My shelves are evenly spaced, level, and they are sturdy thus far. Very happy with the cost as well." },
  { date: "Aug 17, 2026", service: "General Mounting", text: "Worked fast but with excellent attention to detail" },
  { date: "Aug 16, 2026", service: "General Mounting", text: "Nikita was punctual and worked very quickly. Re-hung several blinds for me in my home." },
  { date: "Aug 15, 2026", service: "General Mounting", text: "Nikita was on time, efficient, completed the job as requested, and cleaned up as he completed the task." },
  { date: "Aug 15, 2026", service: "General Mounting", text: "I honestly feel like I won the lottery hiring Nikita. He was FANTASTIC... Nikita went above and beyond to do everything the right way. He came prepared for all scenarios, on time, professional, prepared and took less time than I anticipated. I could not recommend Nikita more for everyone to hire!" },
  { date: "Aug 13, 2026", service: "General Mounting", text: "Nikita was great to work with. He was extremely respectful and took his shoes off before entering, as well as had all the right tools with him. I had him help me with tasks that I didn't even tell him about and he was very very helpful. He knew how to do everything!" },
  { date: "Aug 12, 2026", service: "General Mounting", text: "10/10. He was professional, kind, and got the task done quickly" },
  { date: "Aug 12, 2026", service: "Plumbing", text: "Great job" },
  { date: "Aug 11, 2026", service: "General Mounting", text: "Nikita was great, arrived promptly and went above and beyond excellent customer service. A very fast worker and comes prepared!" },
  { date: "Aug 11, 2026", service: "General Mounting", text: "Arrived promptly on time. He knew what he was doing and worked quickly. He did a great job." },
  { date: "Aug 9, 2026", service: "Furniture Assembly", text: "Extremely helpful, on time and resourceful! Would definitely hire again!" },
  { date: "Aug 9, 2026", service: "General Mounting", text: "He got the job done & worked so quickly" },
  { date: "Aug 7, 2026", service: "Electrical", text: "Nikita used laser levels to make sure two fixtures were cleanly and efficiently installed" },
  { date: "Aug 6, 2026", service: "Electrical", text: "Thank you for a job well done." },
  { date: "Aug 6, 2026", service: "General Mounting", text: "Super professional and timely. Great guy too!" },
  { date: "Aug 6, 2026", service: "General Mounting", text: "Nikita came to hang a shade for our office on our door that has glass in the middle. He did fantastic work." },
  { date: "Aug 5, 2026", service: "Plumbing", text: "Thank you so much" },
  { date: "Aug 5, 2026", service: "TV Mounting", text: "Great service and will contact again for hanging fixtures!" },
  { date: "Aug 5, 2026", service: "General Mounting", text: "I highly recommend him! He installed my daughter's shelves and hung her curtains, and everything came out exactly how I wanted. He was professional, arrived on time, paid attention to detail, and made sure everything was secure and perfectly aligned. The room looks amazing, and you can tell he takes pride in his work. If you're looking for someone reliable for home projects, don't hesitate to book him. I'll definitely be using him again!" },
  { date: "Aug 4, 2026", service: "Heavy Lifting & Loading", text: "Thank you for helping us. We both have injuries and you really were so helpful! We wish you great successes and hope to see you again!" },
  { date: "Aug 4, 2026", service: "General Mounting", text: "Nik did such a great job hanging a mirror in our nursery. He was professional, had the right tools and was very efficient. Will definitely be reaching back out to him again in the future. Thanks Nik!" },
  { date: "Aug 3, 2026", service: "Heavy Lifting & Loading", text: "Thank you so much for helping us at the last minute and lifting the heavy furniture." },
  { date: "Aug 2, 2026", service: "Light Carpentry", text: "Nik is great. On time, kind, did everything we asked and well. Would highly recommend Nik" },
  { date: "Aug 1, 2026", service: "General Mounting", text: "Nikita was great, kind quick and professional!" },
  { date: "Jul 31, 2026", service: "General Mounting", text: "Absolutely phenomenal! Went above and beyond. So much attention to detail and cleaned up after. He even used his own drywall anchors because the ones provided with our curtain tracks weren't good." },
  { date: "Jul 30, 2026", service: "General Mounting", text: "Nikita was very precise in mounting some shelves and diploma frames. I was very pleased and will definitely hire him again." },
  { date: "Jul 30, 2026", service: "General Mounting", text: "Nikita was very quick and precise! Everything looks great and I'm very grateful for his help mounting various things in my home." },
  { date: "Jul 29, 2026", service: "General Mounting", text: "Nikita did excellent work and was very self-sufficient. Would definitely hire Nikita again!" },
  { date: "Jul 28, 2026", service: "General Mounting", text: "Excellent work!!" },
  { date: "Jul 26, 2026", service: "General Mounting", text: "Very fast and great work" },
  { date: "Jul 24, 2026", service: "TV Mounting", text: "Nikita was great, early, efficient, made sure I was comfortable with placement and cleaned up. My TV looks great" },
  { date: "Jul 24, 2026", service: "General Mounting", text: "I've hired many handymen and technicians over the years and Nikita is in the top five for skills and professionalism." },
  { date: "Jul 24, 2026", service: "Electrical", text: "Nikita's attention to detail is flawless. He completed numerous tasks for me and all were done perfectly. He left his work area clean and I would highly recommend." },
  { date: "Jul 21, 2026", service: "General Mounting", text: "Fast, timely, cleaned up after himself!" },
  { date: "Jul 21, 2026", service: "Heavy Lifting & Loading", text: "Nikita was reliable, and able to complete the task request. We are thankful for their attention to detail, communication and flexibility for our task. We would absolutely consider them for future tasks." },
  { date: "Jul 19, 2026", service: "General Mounting", text: "Super fast and helpful! Thank you!" },
  { date: "Jul 18, 2026", service: "Electrical", text: "Nikita was on time, good communicator, worked fast, and fixed everything we needed. Would gladly hire him again." },
  { date: "Jul 17, 2026", service: "General Mounting", text: "This is the 2nd time Nikita did such an outstanding job on a challenging task at our house. Nikita is always there as promised at the arranged time ready to begin and always brings high quality tools for the task. Nikita hung 4 very heavy shelves for us in a nook in our bathroom. These shelves were high quality but the mounting hardware/brackets supplied with the shelves were not strong enough. Nikita came up with an excellent rescue plan for our shelves and made suggestions about how we could mount safely and get the shelves up to reliably hold more weight than we even need. And the shelves look stunning. We are so pleased with his attention to detail and his skills. We are so lucky to have met Nikita." },
  { date: "Jul 14, 2026", service: "Heavy Lifting & Loading", text: "He did exactly what I needed. He installed my window A/C unit. He was on time, followed the instructions and got it done. I'd hire him again." },
  { date: "Jul 12, 2026", service: "General Mounting", text: "Was able to come same day for last minute help! Quick to respond and did a very good job!" },
  { date: "Jul 12, 2026", service: "General Mounting", text: "Very quick, efficient, and professional! Highly recommended!" },
  { date: "Jul 11, 2026", service: "General Mounting", text: "Such a great person! Did an awesome job!" },
  { date: "Jul 10, 2026", service: "Plumbing", text: "Nikita showed up on time/early and worked hard. He completed 3 separate sink faucets and changed a hose bib in just over 2 hours. Great communication. Would definitely hire Nikita again! Thanks." },
  { date: "Jul 9, 2026", service: "TV Mounting", text: "Sooo great! Installed 2 of my TVs perfectly and was so efficient. Luckily he was available same day and came on time. Thank you again!" },
  { date: "Jul 9, 2026", service: "Electrical", text: "Great worker! Quick, quiet, and quality service." },
  { date: "Jul 8, 2026", service: "General Mounting", text: "Nikita was great! Will be reaching out to him again for future services. He was quick and had great attention to detail." },
  { date: "Jul 4, 2026", service: "Heavy Lifting & Loading", text: "Thank you for your help unloading my truck! It took less time than expected and you were great! Thank you!" },
  { date: "Jun 30, 2026", service: "Heavy Lifting & Loading", text: "Responded within minutes, asked the right questions and showed up exactly on time." },
  { date: "Jun 29, 2026", service: "Plumbing", text: "Nikita came prepared, was organized and professional. I will use him again!" },
  { date: "Jun 25, 2026", service: "General Mounting", text: "Nikita was great. He hung up some blinds for us. He was fast, efficient and punctual. He took down our old blinds and left the room spotless. Highly recommend!" },
  { date: "Jun 25, 2026", service: "Furniture Assembly", text: "He built my kids playhouse so quick and efficient!" },
  { date: "Jun 19, 2026", service: "Plumbing", text: "On time and got the job done as promised. Would hire again." },
  { date: "Jun 18, 2026", service: "General Mounting", text: "Another outstanding experience! After doing such a great job hanging my shelves, I had him come back to install a large mirror. As before, the work was meticulous, professional, and completed with great care. He's reliable, communicates well, and makes sure everything is done right. I've already discussed a future project with him because I wouldn't hesitate to hire him again. Highly recommend!" },
  { date: "Jun 16, 2026", service: "Furniture Assembly", text: "Very quick and clean!" },
  { date: "Jun 16, 2026", service: "General Mounting", text: "Nikita did an excellent job. He arrived on time, was very respectful and professional, and worked extremely efficiently. He completed five tasks within an hour and cleaned up afterward, which I really appreciated. He was organized, polite, and got everything done without any issues. I would definitely hire him again and highly recommend him." },
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
  "TV Mounting": "bg-red-100 text-red-800",
  "Heavy Lifting & Loading": "bg-teal-100 text-teal-800",
  "Minor Home Repairs": "bg-amber-100 text-amber-800",
};

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
    <defs>
      <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igGrad)" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="white" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.2" fill="none" stroke="white" strokeWidth="1.8" />
    <circle cx="16.3" cy="7.7" r="1" fill="white" />
  </svg>
);

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
            { num: "220+", label: "Happy clients" },
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
          <a href="https://www.instagram.com/handyyet/" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white border border-black/10 rounded-full px-8 py-4 font-black text-zinc-950 hover:shadow-lg hover:-translate-y-0.5 transition">
            <InstagramIcon />
            Follow on Instagram
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
        <div className="bg-white rounded-[36px] border border-black/10 shadow-sm p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-orange-500 font-black uppercase tracking-widest text-sm">Get Started</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-950 mt-2">Join our happy clients.</h2>
            <p className="mt-3 text-zinc-500 text-lg">Send photos and get a fast quote today.</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a href="/#quote"
              className="border-2 border-[#c8763a] text-zinc-950 bg-white hover:bg-[#c8763a] hover:text-white hover:border-[#c8763a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_24px_-8px_rgba(200,118,58,0.45)] transition-all duration-300 px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap">
              Send Photos →
            </a>
            <a href="tel:+19498283959"
              className="bg-white border border-black/10 px-10 py-5 rounded-full font-black text-lg text-center whitespace-nowrap text-zinc-950 hover:bg-[#fdf3ea] hover:border-[#c8763a]/40 hover:shadow-lg transition duration-300">
              📞 (949) 828-3959
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
