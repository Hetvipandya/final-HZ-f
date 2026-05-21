import React from "react";
import { Plus } from "lucide-react";

export const WhyChoose = () => {
  const features = [
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
      question: "What details are required for consultation?",
      answer:
        "You may need to provide your property layout, direction (compass), location, and specific concerns for accurate analysis.",
    },
  ];

  return (
    <section className="w-full py-12 px-4 md:px-10 lg:px-20 bg-[#FAF9F6]">
      <h2 className="text-3xl font-semibold text-orange-600 text-center mb-12">
        Why Choose Holly Zolly
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">

        {/* FAQ Section */}
        <div className="w-full divide-y divide-gray-200">
          {features.map((item, index) => (
            <div
              key={index}
              className="group py-4 cursor-pointer transition-all duration-300"
            >
              {/* Question */}
              <div className="flex justify-between items-center py-2">
                <div className="text-sm md:text-base font-medium text-gray-900">
                  {item.question}
                </div>

                <Plus
                  size={18}
                  className="text-gray-500 transition-transform duration-300 group-hover:rotate-45"
                />
              </div>

              {/* Answer */}
              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed pr-4 pt-2">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end w-full">
          <img
            src="/image/img/whyChoose.jpeg"
            alt="Why Choose Holly Zolly"
            className="w-full max-w-[500px] h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;