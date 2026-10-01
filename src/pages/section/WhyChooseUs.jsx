import { FiHeart,FiTruck,FiShield,FiRefreshCw,FiCheck } from "react-icons/fi";

const REASONS=[
  {
    icon:FiHeart,
    title:"Fresh, always",
    description:"Every stem is cut and arranged the same day it ships, so what arrives is what you picked.",
    accent:"text-pink-500 bg-pink-50 border-pink-100",
  },
  {
    icon:FiTruck,
    title:"On time, every time",
    description:"Same-day delivery across Dhaka, with real-time tracking from our garden to your door.",
    accent:"text-blue-500 bg-blue-50 border-blue-100",
  },
  {
    icon:FiShield,
    title:"Pay with confidence",
    description:"Card, mobile banking, or cash on delivery — every transaction is encrypted and verified.",
    accent:"text-green-500 bg-green-50 border-green-100",
  },
  {
    icon:FiRefreshCw,
    title:"Wilted? We'll fix it",
    description:"Not happy with a bouquet's condition on arrival? We'll replace or refund it, no questions asked.",
    accent:"text-purple-500 bg-purple-50 border-purple-100",
  },
];

const WhyChooseUs=()=>{
  return(
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-flex rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 sm:text-sm">
              Why BloomCart
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Flowers people
              <span className="block text-pink-500">actually trust.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
              We built BloomCart around one simple promise: what you order is
              what shows up at your door — fresh, beautiful, and on time.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-pink-100 text-sm">🌸</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-sm">🌷</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-yellow-100 text-sm">🌻</span>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-gray-900">Loved by customers</span>
                  <FiCheck className="text-green-500"/>
                </div>
                <p className="text-xs text-gray-400">
                  Fresh flowers, happy moments
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-5 sm:grid-cols-2">
            {REASONS.map((reason,i)=>{
              const Icon=reason.icon;

              return(
                <div
                  key={reason.title}
                  className={`group rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl ${i%2===1?"sm:mt-10":""}`}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${reason.accent} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="text-2xl"/>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-500">
                    {reason.description}
                  </p>

                  <div className="mt-5 h-1 w-8 rounded-full bg-pink-200 transition-all duration-300 group-hover:w-14 group-hover:bg-pink-500"/>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid overflow-hidden rounded-3xl bg-gray-900 sm:grid-cols-3">
          <div className="border-b border-white/10 px-6 py-7 text-center sm:border-b-0 sm:border-r">
            <p className="text-2xl font-bold text-white sm:text-3xl">100%</p>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">Freshness promise</p>
          </div>

          <div className="border-b border-white/10 px-6 py-7 text-center sm:border-b-0 sm:border-r">
            <p className="text-2xl font-bold text-white sm:text-3xl">Same Day</p>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">Dhaka delivery</p>
          </div>

          <div className="px-6 py-7 text-center">
            <p className="text-2xl font-bold text-white sm:text-3xl">24/7</p>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">Customer support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;