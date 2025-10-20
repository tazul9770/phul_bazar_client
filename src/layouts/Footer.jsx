import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6 sm:px-10 md:px-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        
        {/* Brand Section */}
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            🌸 Phul_Bazar
          </Link>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Your one-stop shop for fresh, beautiful flowers delivered straight to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-3">Quick Links</h6>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pink-400 transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-pink-400 transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-pink-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-pink-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-3">Customer Service</h6>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-pink-400 transition">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-pink-400 transition">Returns & Refunds</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-pink-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-3">Follow Us</h6>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195A4.918 4.918 0 0016.616 3a4.92 4.92 0 00-4.917 4.917c0 .385.045.76.126 1.122A13.978 13.978 0 011.671 3.149a4.92 4.92 0 001.523 6.574A4.902 4.902 0 01.96 9.1v.06a4.923 4.923 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.419A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0024 4.557z"/>
              </svg>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9A3.5 3.5 0 0020 16.5v-9A3.5 3.5 0 0016.5 4h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Phul_Bazar. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          Made with ❤️ by <span className="text-pink-400 font-semibold">Phul_Bazar Team</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
