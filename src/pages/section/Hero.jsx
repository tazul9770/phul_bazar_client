
import Image from "../../assets/image/women-free-png.webp";
import Img1 from "../../assets/avatar/1.jpg"
import Img3 from "../../assets/avatar/3.jpg"
import Img2 from "../../assets/avatar/4.jpg"
import { useNavigate } from "react-router";

const HeroSection = () => {
  const avatars = [Img1,Img2,Img3];
  const navigate = useNavigate();

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-white">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          The Ultimate <span className="text-purple-600">Flower</span> Shopping Destination
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Discover a vibrant collection of beautiful blooms to brighten your day or surprise someone special.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          {/* here shop now button when I click it render shop page */}
            <button onClick={() => navigate("/shop")} className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition-all duration-300">
              Shop Now
            </button>
          <a href="/shop" className="text-purple-600 hover:underline text-lg font-medium">
            View All Products
          </a>
        </div>

        {/* Ratings */}
        <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
          {/* Avatar group */}
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`User ${i + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>

          {/* Text */}
          <div className="text-sm text-gray-700">
            <strong className="text-base text-gray-900">4.9+ Ratings</strong>
            <br />
            Trusted by 5K+ Happy Customers
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <img
          src={Image}
          alt="Woman holding flowers"
          className="w-[300px] md:w-[420px] rounded-2xl shadow-xl object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
