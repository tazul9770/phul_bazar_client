import Img from "../assets/image/men.jpg";
import Img2 from "../assets/image/couple.jpg";
import { useNavigate } from "react-router";

const promos = [
  {
    title: "Lovely Fresh Bouquets",
    description:
      "Surprise your loved ones with hand-picked, fragrant floral arrangements designed to brighten any occasion.",
    discount: "Flat 20% Discount",
    image: Img,
  },
  {
    title: "Pure Bloom Collection",
    description:
      "Experience elegance with our signature collection of premium blooms, curated for timeless beauty.",
    discount: "Flat 25% Discount",
    image: Img2,
  },
];

const PromoSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-2">
        {promos.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col md:flex-row items-center"
          >
            <div className="w-full md:w-1/2 p-8 text-center md:text-left">
              <h4 className="text-sm text-purple-600 font-semibold uppercase tracking-wide mb-2">
                {item.discount}
              </h4>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                {item.description}
              </p>
              <button onClick={() => navigate("/shop")} className="inline-block bg-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-purple-700 transition cursor-pointer">
                Shop Now
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
