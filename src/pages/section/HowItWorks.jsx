import { FiSearch,FiShoppingCart,FiPackage,FiArrowRight } from "react-icons/fi";

const STEPS=[
  {
    icon:FiSearch,
    title:"Pick your flowers",
    description:"Browse by occasion or category and find the arrangement that fits the moment.",
  },
  {
    icon:FiShoppingCart,
    title:"Place your order",
    description:"Add to cart, choose a delivery time, and check out in under a minute.",
  },
  {
    icon:FiPackage,
    title:"It arrives fresh",
    description:"Our florists prepare and dispatch your order the same day, straight to the door.",
  },
];

const HowItWorks=()=>{
  return(
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/60 via-white to-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            How it works
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
            From choosing your favorite flowers to receiving them at your doorstep,
            everything is simple and hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          
          {/* Connecting line */}
          <div
            className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 md:block"
            aria-hidden="true"
          />

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((step,i)=>{
              const Icon=step.icon;

              return(
                <div
                  key={step.title}
                  className="group relative rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-pink-100 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-50 to-rose-100 shadow-inner">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-pink-500 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white">
                      <Icon/>
                    </div>
                  </div>

                  {/* Step number */}
                  <span className="mt-5 inline-flex rounded-full bg-pink-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pink-500">
                    Step {i+1}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-gray-500">
                    {step.description}
                  </p>

                  {/* Arrow */}
                  {i<STEPS.length-1&&(
                    <div className="mt-5 flex justify-center md:hidden">
                      <FiArrowRight className="rotate-90 text-xl text-pink-300"/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-3xl bg-gray-900 px-6 py-7 text-center shadow-xl sm:px-10 md:flex-row md:text-left">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Ready to make someone smile?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Choose your favorite flowers and place your order today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;