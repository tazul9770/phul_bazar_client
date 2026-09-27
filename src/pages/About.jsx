import { Link } from "react-router-dom";

const PetalMark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <g>
      <path d="M16 16C16 16 13 8 16 3C19 8 16 16 16 16Z" fill="currentColor" className="text-secondary" />
      <path d="M16 16C16 16 24 14 29 17C24 20 16 16 16 16Z" fill="currentColor" className="text-primary" />
      <path d="M16 16C16 16 19 24 16 29C13 24 16 16 16 16Z" fill="currentColor" className="text-primary/80" />
      <path d="M16 16C16 16 8 18 3 15C8 12 16 16 16 16Z" fill="currentColor" className="text-secondary/80" />
      <circle cx="16" cy="16" r="3" fill="currentColor" className="text-primary" />
    </g>
  </svg>
);

const FreshIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-2-7-5.5-7-10a7 7 0 0 1 14 0c0 4.5-3 8-7 10Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>
);
const DeliveryIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6Z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>
);
const PriceIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.6 12.6 12 21.2 2.8 12 4.4 3l9-1.6 8.8 8.8a2 2 0 0 1 .4 2.4Z" /><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" stroke="none" /></svg>
);
const CareIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.3-9.5-8.8C1 8 2.4 5 5.6 4.4c2-.4 3.7.6 4.4 2.1.7-1.5 2.4-2.5 4.4-2.1C17.6 5 19 8 17.5 11.2 15 15.7 12 20 12 20Z" /></svg>
);

const About = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80";
  const bouquetImage =
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80";

  const values = [
    { icon: <FreshIcon />, title: "Freshly Picked", description: "Sourced daily from local growers, never left sitting in a warehouse." },
    { icon: <DeliveryIcon />, title: "Careful Delivery", description: "Packed and driven with the same care a bouquet deserves in hand." },
    { icon: <PriceIcon />, title: "Honest Pricing", description: "Considered arrangements at prices that don't ask you to compromise." },
    { icon: <CareIcon />, title: "Real Support", description: "A person, not a script, helping you find the right bouquet." },
  ];

  const stats = [
    ["6+", "Years arranging"],
    ["40k+", "Bouquets delivered"],
    ["120+", "Growers & partners"],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900">
        <img src={heroImage} alt="Fresh flowers at PhulBazar" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 text-center sm:pt-36">
          <div className="mb-5 flex justify-center">
            <PetalMark className="h-10 w-10" />
          </div>
          <h1 className="font-serif text-4xl italic tracking-tight text-white sm:text-6xl">
            About <span className="text-secondary not-italic font-sans font-extrabold">PhulBazar</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-gray-200">
            Spreading a little more color, one bouquet at a time.
          </p>
        </div>

        {/* Stat bar, overlapping into the next section */}
        <div className="relative mx-auto -mb-12 max-w-4xl px-6">
          <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-2xl bg-white shadow-xl">
            {stats.map(([value, label]) => (
              <div key={label} className="px-4 py-6 text-center">
                <p className="text-2xl font-extrabold text-primary sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-24 md:grid-cols-2 md:pt-28">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Since day one</span>
          <h2 className="mt-2 font-serif text-3xl italic text-gray-900 sm:text-4xl">Our story</h2>
          <p className="mt-5 leading-relaxed text-gray-600">
            PhulBazar began with a simple belief: flowers have a way of saying what words can't. What
            started as a small stall sourcing blooms for neighbors has grown into a florist-led
            marketplace, but the care behind every stem hasn't changed.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            We work directly with growers and florists we trust, so every arrangement that reaches your
            door is fresh, considered, and made to last.
          </p>
        </div>
        <div className="relative">
          <img src={bouquetImage} alt="A freshly arranged bouquet" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lg" />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-xl sm:block">
            <p className="font-serif text-lg italic text-gray-900">"Every bloom tells a story."</p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Why PhulBazar</span>
            <h2 className="mt-2 font-serif text-3xl italic text-gray-900 sm:text-4xl">Built around the flowers</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-gray-100 p-6 transition hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Our philosophy</span>
            <h2 className="mt-2 font-serif text-3xl italic text-gray-900 sm:text-4xl">Emotions, in color</h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              Flowers are more than a gift — they're a feeling handed over in person. We arrange every
              bouquet to carry that feeling, whether it's love, celebration, comfort, or a simple thank
              you.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Shop the collection
            </Link>
          </div>
          <div className="order-1 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-10 md:order-2">
            <PetalMark className="mx-auto h-16 w-16" />
            <p className="mt-6 text-center font-serif text-xl italic text-gray-800">
              "Let us help you say what the moment needs."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
