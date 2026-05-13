import testimonials from "../data/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50"  data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-heading font-bold text-black">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-gray-600">
            Real experiences from our valued customers
          </p>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition h-full">

                {/* STARS */}
                <div className="flex gap-1 text-yellow-500 mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* MESSAGE */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  “{item.message}”
                </p>

                {/* USER */}
                <div className="mt-auto">
                  <h4 className="font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.role}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
