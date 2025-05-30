import React from 'react';
import {
  Gift,
  Heart,
  GraduationCap,
  Smile,
  PartyPopper,
  HandHeart,
} from 'lucide-react';

const occasions = [
  { icon: <HandHeart size={28} />, label: 'Weddings', count: 42 },
  { icon: <Gift size={28} />, label: 'Birthday', count: 58 },
  { icon: <Heart size={28} />, label: 'Anniversary', count: 11 },
  { icon: <Smile size={28} />, label: 'Thank You', count: 48 },
  { icon: <GraduationCap size={28} />, label: 'Graduation', count: 13 },
  { icon: <PartyPopper size={28} />, label: 'Get Well Soon', count: 16 },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Shop by <span className="text-purple-600">Occasions</span>
        </h2>
        <p className="text-gray-500 mb-12 text-sm md:text-base">
          Discover the perfect flowers for every moment and milestone.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {occasions.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center group hover:bg-purple-50"
            >
              <div className="bg-purple-100 text-purple-600 rounded-full p-3 mb-4 group-hover:bg-purple-200 transition">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1 group-hover:text-purple-700">
                {item.label}
              </h3>
              <span className="text-sm text-gray-500">{item.count} Products</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
