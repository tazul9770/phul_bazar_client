import React, { useState, useEffect } from "react";
import img from "../../../assets/image/pic-Photoroom.png";

const DiscountSec = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-10-25T00:00:00").getTime();
    const now = Date.now();
    const diff = targetDate - now;

    if (diff > 0) {
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Soft decorative blurs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-pink-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-pink-600 tracking-wide uppercase">
                Limited Time Offer
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-tight tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-rose-500">
                Holiday Sales
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-gray-700 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              Enjoy{" "}
              <span className="font-bold text-pink-600">25% off</span> on selected
              items. Don’t miss out — offer ends soon!
            </p>

            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {timeUnits.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center w-[70px] h-[70px] sm:w-20 sm:h-20 rounded-2xl bg-white shadow-md border border-pink-100/80"
                >
                  <span className="text-xl sm:text-2xl font-bold text-pink-600 tabular-nums leading-none">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-pink-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5 active:translate-y-0">
                Shop Now
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Image - Made Bigger */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Soft glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/30 to-purple-300/20 rounded-3xl blur-2xl scale-95" />
              
              <img
                src={img}
                alt="Holiday Sale - Man with roses"
                className="relative w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[540px] xl:max-w-[600px] h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSec;