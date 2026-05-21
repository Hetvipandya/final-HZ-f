import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutProduct = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/shop?category=AAYUDH FRAME");
  };

  const handleNavigateRath = () => {
    navigate("/shop?category=VASTUKKALP PRODUCT");
  };

  // Animation variants
  const leftAnimation = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightAnimation = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-white py-12 px-4 md:px-10 lg:px-20 overflow-hidden">
      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        
        {/* Left Side Image (comes from left) */}
        <motion.div
          variants={leftAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/image/img/frame.jpeg"
            alt="Product"
            className="w-full h-[350px] md:h-[450px] object-cover shadow-lg rounded-lg"
          />
        </motion.div>

        {/* Right Side Content (comes from right) */}
        <motion.div
          className="font-serif"
          variants={rightAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4 tracking-wide">
            Sacred Ayudh Vastu Frame
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-4 font-light">
            Bring divine energy, strength, and positivity into your space with
            our beautifully crafted{" "}
            <span className="font-semibold text-orange-600">
              Ayudh Vastu Frame
            </span>
            . Inspired by sacred symbolism and traditional Vastu principles,
            this frame is believed to create a protective aura while attracting
            harmony, courage, and positive vibrations to your home or workplace.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed font-light">
            Designed with spiritual significance and elegant craftsmanship, the
            Ayudh Frame not only enhances your interior decor but also
            represents protection, prosperity, and balanced energy. Ideal for
            placing in your living room, office, temple area, or entrance as
            per Vastu guidance.
          </p>

          <button
            onClick={handleNavigate}
            className="mt-6 px-6 py-3 bg-orange-600 text-black rounded-lg hover:bg-orange-700 transition duration-300 font-medium tracking-wide"
          >
            Explore Ayudh Frame
          </button>
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side Content (comes from left) */}
        <motion.div
          className="font-serif"
          variants={leftAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4 tracking-wide">
            Divine Chariot Rath
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-4 font-light">
            Bring home the spiritual elegance of our beautifully handcrafted{" "}
            <span className="font-semibold text-orange-600">
              Chariot Rath
            </span>
            , inspired by traditional Indian heritage and divine craftsmanship.
            Symbolizing devotion, positivity, and sacred energy, this
            decorative wooden rath adds a timeless spiritual charm to your
            home, temple, or office space.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed font-light">
            Designed with premium wooden craftsmanship and intricate carvings,
            the Chariot Rath reflects culture, tradition, and divine beauty.
            Perfect for home decor, pooja spaces, gifting, and spiritual
            interiors, it enhances positivity while bringing a touch of
            elegance and devotion to your surroundings.
          </p>

          <button
            onClick={handleNavigateRath}
            className="mt-6 px-6 py-3 bg-orange-600 text-black rounded-lg hover:bg-orange-700 transition duration-300 font-medium tracking-wide"
          >
            Explore Chariot Rath
          </button>
        </motion.div>

        {/* Right Side Image (comes from right) */}
        <motion.div
          variants={rightAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/image/img/rath.jpeg"
            alt="Lifestyle Product"
            className="w-full h-[350px] md:h-[450px] object-cover shadow-lg rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutProduct;