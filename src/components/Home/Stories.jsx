/* eslint-disable react/no-unescaped-entities */
"use client";

const stories = [
  {
    quote: "We adopted Bruno 6 months ago and he has completely changed our home. Our kids absolutely adore him. The whole process was smooth and the team was incredibly helpful.",
    name: "Rafiq & Family",
    location: "Chittagong, Bangladesh",
    pet: "Adopted Bruno — Golden Retriever",
    avatar: "RF",
    avatarBg: "bg-amber-400 text-amber-900",
    petEmoji: "🐕",
    petCardBg: "bg-amber-50",
    rating: 5,
  },
  {
    quote: "Luna was shy at first but within a week she owned the whole apartment. Best decision we ever made. I never thought adopting could be this simple and rewarding.",
    name: "Sumaiya Mehrin",
    location: "Dhaka, Bangladesh",
    pet: "Adopted Luna — Persian Cat",
    avatar: "SM",
    avatarBg: "bg-teal-500 text-white",
    petEmoji: "🐈",
    petCardBg: "bg-teal-50",
    rating: 5,
  },
  {
    quote: "Mochi fits perfectly with our family lifestyle. The listing had all the details we needed and the owner was so responsive. FurEver Home made it feel completely trustworthy.",
    name: "Tanvir Hossain",
    location: "Sylhet, Bangladesh",
    pet: "Adopted Mochi — Dutch Rabbit",
    avatar: "TH",
    avatarBg: "bg-rose-400 text-white",
    petEmoji: "🐇",
    petCardBg: "bg-rose-50",
    rating: 5,
  },
  {
    quote: "Rio has brought so much joy and noise into our home — in the best way possible. We were nervous about adopting a bird but the detailed profile made us feel confident.",
    name: "Nadia Islam",
    location: "Rajshahi, Bangladesh",
    pet: "Adopted Rio — African Grey",
    avatar: "NI",
    avatarBg: "bg-violet-400 text-white",
    petEmoji: "🦜",
    petCardBg: "bg-violet-50",
    rating: 5,
  },
  {
    quote: "I was skeptical at first but FurEver Home exceeded all my expectations. The health verification badge gave me peace of mind and Buddy settled in within days.",
    name: "Karim Uddin",
    location: "Cumilla, Bangladesh",
    pet: "Adopted Buddy — Labrador Mix",
    avatar: "KU",
    avatarBg: "bg-amber-500 text-white",
    petEmoji: "🐶",
    petCardBg: "bg-amber-50",
    rating: 5,
  },
  {
    quote: "Adopting Coco was the best gift we gave our daughter. She now has a best friend for life. The adoption request process was straightforward and took less than 5 minutes.",
    name: "Farhan & Meghna",
    location: "Khulna, Bangladesh",
    pet: "Adopted Coco — Beagle",
    avatar: "FM",
    avatarBg: "bg-teal-400 text-white",
    petEmoji: "🐕‍🦺",
    petCardBg: "bg-teal-50",
    rating: 5,
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="14" height="14" fill="#EF9F27" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const SuccessStories = () => {
  return (
    <section className="bg-[#F7F5F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Success stories
          </span>
          <h2 className="text-4xl font-extrabold text-neutral-800 tracking-tight mb-3">
            Happy Families, Happy Pets
          </h2>
          <p className="text-neutral-500 text-base max-w-md mx-auto">
            Real stories from people who found their perfect companion through FurEver Home
          </p>
        </div>

        {/* stories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-neutral-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200">

              {/* top row — stars + pet emoji card */}
              <div className="flex items-center justify-between">
                <Stars count={s.rating} />
                <div className={`w-10 h-10 rounded-xl ${s.petCardBg} flex items-center justify-center text-xl`}>
                  {s.petEmoji}
                </div>
              </div>

              {/* quote */}
              <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                "{s.quote}"
              </p>

              {/* divider */}
              <div className="h-px bg-neutral-100" />

              {/* footer */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.avatarBg}`}>
                  {s.avatar}
                </div>
                <div>
                  <p className="font-semibold text-neutral-800 text-sm">{s.name}</p>
                  <p className="text-neutral-400 text-xs">{s.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* stats strip */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { num: "1,200+", label: "Pets adopted" },
            { num: "98%", label: "Satisfaction rate" },
            { num: "800+", label: "Happy families" },
            { num: "4.9/5", label: "Average rating" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl py-5 px-4 text-center border border-neutral-100">
              <p className="text-2xl font-extrabold text-amber-500 mb-1">{s.num}</p>
              <p className="text-neutral-500 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;