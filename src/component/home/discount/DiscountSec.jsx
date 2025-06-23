import React, { useState, useEffect } from "react";
import img from "../../../assets/image/pic-Photoroom.png";

const DiscountSec = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-07-10T00:00:00").getTime();
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

  return (
    <section className="relative w-full py-10 sm:py-16 px-4 sm:px-8 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex absolute inset-0 items-center px-4 sm:px-8 md:px-12">
          <div className="max-w-sm sm:max-w-md text-left space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-red-500">
              Holiday Sales
            </h2>
            <p className="text-gray-800 text-sm sm:text-base md:text-lg">
              Enjoy <span className="font-bold text-pink-600">35% off</span> – Hurry up,
              limited time only!
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white bg-opacity-90 rounded-lg shadow-md w-16 h-16 sm:w-20 sm:h-20 flex flex-col justify-center items-center border border-pink-300"
                >
                  <div className="text-xl sm:text-2xl font-bold text-pink-600 tabular-nums">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Desktop Image */}
        <img
          src={img}
          alt="Man with roses"
          className="hidden md:block w-full h-auto object-cover"
        />

        {/* Mobile View (Side by Side Layout) */}
        <div className="md:hidden grid grid-cols-2 gap-6 items-center">
          {/* Text & Timer */}
          <div className="space-y-4 text-left">
            <h2 className="text-2xl xs:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-red-500">
              Holiday Sales
            </h2>
            <p className="text-gray-800 text-sm xs:text-base">
              Enjoy <span className="font-bold text-pink-600">50% off</span> – Hurry up,
              limited time only!
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white bg-opacity-90 rounded-md shadow w-14 h-14 flex flex-col justify-center items-center border border-pink-300"
                >
                  <div className="text-lg font-bold text-pink-600 tabular-nums">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow transition">
              Shop Now
            </button>
          </div>

          {/* Image Right Side */}
          <div className="flex justify-center mr-32">
            <img
              src={img}
              alt="Man with roses"
              className="w-2xl max-w-[400px]" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSec;
