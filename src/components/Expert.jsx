import React from "react";
import { useNavigate } from "react-router-dom";

const Expert = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-12 xl:px-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
        
        {/* Left Side: Image */}
        <div className="w-full lg:w-[30%] flex justify-center lg:justify-start">
          <div className="w-[300px] h-[360px] rounded-lg overflow-hidden bg-[#e2edd3]">
            <img
              src="https://kkvastukkalp.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-06-28-at-9.05.03-PM-2.jpeg"
              alt="Astrologer Disha Shah"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-[70%] flex flex-col justify-start pt-2">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">☀️</span>
            <h2 className="text-xl md:text-2xl font-bold text-[#8f5c23]">
              Get Personalized Guidance from Our Expert
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-[15px] leading-relaxed mb-6">
            Meet{" "}
            <span className="font-semibold text-gray-900">
              Astrologer Disha Shah
            </span>
            , our in-house spiritual guide at{" "}
            <span className="font-semibold text-gray-900">
              Holly Zolly
            </span>
            . With years of experience and a deep understanding of cosmic
            energies, she helps you align your gemstones, mindset, and life
            path with your true destiny.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 mb-8 max-w-xl">
            {[
              { icon: "🔮", title: "Horoscope Reading" },
              { icon: "🃏", title: "Tarot Reading" },
              { icon: "🔢", title: "Numerology Reading" },
              { icon: "🏡", title: "Vastu Consultation" },
            ].map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-[#c29352] text-sm">★</span>
                <span className="text-lg">{service.icon}</span>
                <span className="text-[#8f5c23] font-medium text-[15px]">
                  {service.title}
                </span>
              </div>
            ))}
          </div>

          {/* Button */}
          <div>
            <button
              onClick={handleContact}
              className="bg-[#ff6e40] hover:bg-[#e0562b] text-white font-medium text-sm py-2.5 px-6 rounded-md transition-colors duration-200 shadow-sm"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expert;