const About = () => {
  // Beautiful flower images
  const heroImage =
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80";
  const bouquetImage =
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80";
  const floristImage =
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Fresh Flowers"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-indigo-700 drop-shadow-lg">
            About Phul_Bazar
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto mt-4 font-medium">
            Spreading love, one bouquet at a time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Phul_Bazar began with a simple belief — that flowers have the power to brighten any moment.
            From celebrations to heartfelt gestures, we select each bloom with care, ensuring freshness,
            color, and lasting beauty.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We work closely with local growers and skilled florists to bring you beautiful arrangements
            that speak emotion and elegance.
          </p>
        </div>
        <div>
          <img
            src={bouquetImage}
            alt="Bouquet"
            className="rounded-lg shadow-xl w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["Freshly Picked", "Only the best, garden-fresh blooms."],
              ["Fast Delivery", "On time, every time — with care."],
              ["Affordable Elegance", "Luxury that fits your budget."],
              ["Support & Care", "We're here to help you choose the right bouquet."],
            ].map(([title, description], i) => (
              <div key={i} className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
                <p className="text-gray-700 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={floristImage}
            alt="Florist at work"
            className="rounded-lg shadow-xl w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Philosophy</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Flowers are more than gifts — they are emotions in color.
            We craft each bouquet to reflect love, joy, celebration, and comfort.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every bloom tells a story — let us help you express yours.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Brighten Someone’s Day?</h2>
        <a
          href="/shop"
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
};

export default About;
