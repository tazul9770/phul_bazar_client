import { Link } from "react-router-dom";

const PetalMark = () => (
  <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
    <g>
      <path d="M16 16C16 16 13 8 16 3C19 8 16 16 16 16Z" fill="currentColor" className="text-secondary" />
      <path d="M16 16C16 16 24 14 29 17C24 20 16 16 16 16Z" fill="currentColor" className="text-primary" />
      <path d="M16 16C16 16 19 24 16 29C13 24 16 16 16 16Z" fill="currentColor" className="text-primary/80" />
      <path d="M16 16C16 16 8 18 3 15C8 12 16 16 16 16Z" fill="currentColor" className="text-secondary/80" />
      <circle cx="16" cy="16" r="3" fill="currentColor" className="text-primary" />
    </g>
  </svg>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-sm text-gray-400 transition-colors duration-200 hover:text-secondary focus:outline-none focus-visible:text-secondary"
  >
    {children}
  </Link>
);

const SocialIcon = ({ href, label, path }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-6 pt-16 pb-8 text-gray-300 sm:px-10 md:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-gray-800 pb-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <PetalMark />
            <span className="font-serif text-2xl italic tracking-tight text-white">
              Phul<span className="text-secondary not-italic font-sans font-extrabold">Bazar</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            Fresh, hand-picked flowers arranged with care and delivered straight to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="mb-4 text-sm font-semibold tracking-wide text-white">Quick Links</h6>
          <ul className="space-y-3">
            <li><FooterLink to="/">Home</FooterLink></li>
            <li><FooterLink to="/shop">Shop</FooterLink></li>
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h6 className="mb-4 text-sm font-semibold tracking-wide text-white">Customer Service</h6>
          <ul className="space-y-3">
            <li><FooterLink to="/faq">FAQ</FooterLink></li>
            <li><FooterLink to="/returns">Returns &amp; Refunds</FooterLink></li>
            <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
            <li><FooterLink to="/terms">Terms &amp; Conditions</FooterLink></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h6 className="mb-4 text-sm font-semibold tracking-wide text-white">Follow Us</h6>
          <div className="flex gap-3">
            <SocialIcon
              href="https://www.facebook.com/tazul.islam.229952?mibextid=ZbWKwL"
              label="Facebook"
              path="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            />
            <SocialIcon
              href="https://twitter.com"
              label="Twitter"
              path="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195A4.918 4.918 0 0016.616 3a4.92 4.92 0 00-4.917 4.917c0 .385.045.76.126 1.122A13.978 13.978 0 011.671 3.149a4.92 4.92 0 001.523 6.574A4.902 4.902 0 01.96 9.1v.06a4.923 4.923 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.419A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0024 4.557z"
            />
            <SocialIcon
              href="https://instagram.com"
              label="Instagram"
              path="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9A3.5 3.5 0 0020 16.5v-9A3.5 3.5 0 0016.5 4h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 pt-6 text-sm text-gray-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} PhulBazar. All rights reserved.</p>
        <p>
          Made with <span className="text-secondary">&#10084;</span> by{" "}
          <span className="font-semibold text-gray-300">PhulBazar Team</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
