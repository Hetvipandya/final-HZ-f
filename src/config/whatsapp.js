// WhatsApp Configuration
export const WHATSAPP_NUMBER = "+919904444990"; // Replace with your WhatsApp number
// export const WHATSAPP_MESSAGE = "Hello! How can I help you?";

export const getWhatsAppLink = (phone = WHATSAPP_NUMBER) => {
  const encodedMessage = encodeURIComponent();
  const cleanPhone = phone.replace(/\D/g, ""); // Remove all non-digits
  return `https://wa.me/${cleanPhone}`;
};
 