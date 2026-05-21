import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../config/whatsapp";

const WhatsAppButton = ({ message, phone }) => {
  const whatsappLink = getWhatsAppLink(phone, message);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
      aria-label="Contact us on WhatsApp"
      className="fixed z-[9999] 
                 /* મોબાઇલ પર નીચે નેવિગેશન બાર હોવાથી bottom-20 આપ્યું છે જેથી એ એકબીજાની ઉપર ન આવે */
                 bottom-20 right-4
                 /* સ્મોલ સ્ક્રીન અને તેનાથી મોટી સ્ક્રીન પર નોર્મલ જગ્યાએ આવી જશે */
                 sm:bottom-5 sm:right-5
                 md:bottom-6 md:right-6
                 lg:bottom-8 lg:right-8"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></span>

      {/* Main Button */}
      <div
        className="
          relative flex items-center justify-center
          w-12 h-12
          sm:w-14 sm:h-14
          md:w-[60px] md:h-[60px]
          rounded-full
          bg-gradient-to-br from-[#25D366] to-[#128C7E]
          shadow-[0_4px_20px_rgba(37,211,102,0.4)]
          transition-all duration-300 ease-in-out
          hover:scale-110
          hover:shadow-[0_8px_25px_rgba(37,211,102,0.6)]
          active:scale-95
          animate-whatsappPop
        "
      >
        <FaWhatsapp
          className="
            text-white
            text-[24px]
            sm:text-[28px]
            md:text-[32px]
          "
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;