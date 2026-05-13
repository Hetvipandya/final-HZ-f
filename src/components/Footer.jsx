import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-black pt-16 mt-[1px]">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center mb-4 gap-2">
            <img
              src="/image/logo/LOGO.png"
              className="h-20 w-auto object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-black">
            We offer authentic Vastu products and solutions designed to
            balance energy, attract positivity, and bring harmony, peace,
            and prosperity into your home and workspace.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-col md:items-center">
          <h4 className="text-black font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm font-weight:400 md:-ml-10">
            <li><Link to="/" className="hover:text-gray-700">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gray-700">Shop</Link></li>
            <li><Link to="/wishlist" className="hover:text-gray-700">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-gray-700">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-gray-700">Contact</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h4 className="text-black font-semibold mb-4">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-gray-700">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-gray-700">Returns</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-gray-700">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gray-700">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-black font-semibold mb-5">
            Contact Us
          </h4>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-black" />
              <a
                href="mailto:vastukkalp2007gmail.com"
                className="hover:text-gray-700 transition"
              >
                vastukkalp2007gmail.com
              </a>
            </li>

            <li className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-black" />
              <a
                href="tel:+919909511967"
                className="hover:text-gray-700 transition"
              >
                +91 99095 11961
              </a>
            </li>

            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-black" />
              <span className="text-black">
                Vastukkalp <br />
                D-211 Adishwar Nagar <br />
                Nikol Road, Naroda, Ahmedabad
              </span>
            </li>
          </ul>

          {/* SOCIAL ICONS */}
         <div className="flex gap-3 mt-6">

  {/* FACEBOOK */}
  <a
    href="https://www.facebook.com/share/1ZZRAgzFhf/"
    className="w-9 h-9 flex items-center justify-center rounded-full border border-black/30 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition"
  >
    <FaFacebookF />
  </a>

  {/* INSTAGRAM */}
 <a
  href="https://www.instagram.com/_kkvastukkalp?igsh=N2ZzMm9iYmY2empp"
  className="group relative w-9 h-9 flex items-center justify-center rounded-full border border-black/30 overflow-hidden transition"
>
  {/* Gradient background (hidden by default) */}
  <div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
    style={{
      background: "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)",
    }}
  />

  {/* Icon */}
  <FaInstagram className="relative z-10 group-hover:text-white" />
</a>

  {/* YOUTUBE */}
  <a
    href="https://youtube.com/@kkvastukkalp2985?si=3__QeYemSQT9Me8h"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 flex items-center justify-center rounded-full border border-black/30 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition"
  >
    <FaYoutube />
  </a>

</div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 border-t border-black/20">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-black">
          © {new Date().getFullYear()} HOLLY ZOLLY. All rights reserved.
        </div>
      </div>

    </footer>
  );
}