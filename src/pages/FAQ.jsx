import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What services does Holly Zolly (Vastukkalp) provide?",
    answer:
      "We offer Vastu consultation services including home analysis, office Vastu guidance, site visits, and personalized Vastu reports to help create balanced and positive spaces.",
  },
  {
    question: "Do you provide online Vastu consultation?",
    answer:
      "Yes, we provide both online and offline consultations. You can share your property details, and our experts will guide you accordingly.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "You can book a consultation through our website or contact us directly via phone or email. Our team will schedule a session based on your convenience.",
  },
  {
    question: "Are the Vastu solutions customized?",
    answer:
      "Yes, all our recommendations are personalized based on your property layout, direction, and individual requirements.",
  },
  {
    question: "Do you guarantee results?",
    answer:
      "Vastu is based on traditional principles and energy balance. While we provide expert guidance, results may vary depending on implementation and external factors.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Yes, appointments can be rescheduled or cancelled at least 24 hours in advance. Please refer to our cancellation policy for more details.",
  },
  {
    question: "What details are required for consultation?",
    answer:
      "You may need to provide your property layout, direction (compass), location, and specific concerns for accurate analysis.",
  },
  {
    question: "How long does it take to receive a Vastu report?",
    answer:
      "Typically, reports are delivered within 2–5 working days after the consultation, depending on the complexity.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#f8f5f0] min-h-screen">

      {/* HERO */}
      <section className="py-16 bg-[#f1ece3] text-center">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1e293b]">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our Vastu consultation services at Holly Zolly (Vastukkalp).
        </p>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] overflow-hidden transition"
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-[#1e293b]">
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`text-xl transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}