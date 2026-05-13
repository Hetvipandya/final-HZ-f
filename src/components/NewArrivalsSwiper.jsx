// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getProducts } from "../data/products";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function NewArrivalsSwiper() {
//   const [products, setProducts] = useState([]); // ✅ FIX

//   // ✅ Fetch products
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getProducts();
//       setProducts(data);
//     };
//     fetchData();
//   }, []);

//   // ✅ Safe sorting
//   const newArrivals = [...products] // copy to avoid mutation
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 8);

//   return (
//     <section className="py-16 md:py-20 bg-white">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 gap-4">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600 text-center md:text-left">
//             New <span className="text-orange-600">Vastu</span> Arrivals
//           </h2>

//           <Link
//             to="/shop"
//             className="bg-gray-600 text-white px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base"
//           >
//             Explore All →
//           </Link>
//         </div>

//         {/* SWIPER */}
//         <div className="relative">
//           <Swiper
//             modules={[Autoplay, Navigation, Pagination]}
//             spaceBetween={15}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             navigation
//             pagination={{
//               clickable: true,
//               el: ".custom-pagination",
//             }}
//             loop
//             className="custom-swiper"
//             breakpoints={{
//               0: { slidesPerView: 1.1, spaceBetween: 10, navigation: false },
//               640: { slidesPerView: 2, spaceBetween: 15, navigation: false },
//               1024: { slidesPerView: 4, spaceBetween: 25, navigation: true },
//             }}
//           >
//             {newArrivals.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <div className="group bg-white rounded-2xl p-3 shadow h-full">

//                   <Link to={`/product/${item.id}`}>
//                     <div className="h-52 sm:h-60 md:h-64 overflow-hidden rounded-xl">
//                       <img
//                         src={item.images[0]}
//                         alt={item.name}
//                         className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
//                       />
//                     </div>
//                   </Link>

//                   <div className="pt-4 text-center">
//                     <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
//                       {item.name}
//                     </h3>
//                   </div>

//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* DOTS */}
//           <div className="custom-pagination mt-6 flex justify-center"></div>
//         </div>

//         <style>{`
//           .custom-swiper .swiper-button-next,
//           .custom-swiper .swiper-button-prev {
//             color: #f97316 !important;
//           }

//           .custom-pagination .swiper-pagination-bullet {
//             background: #f97316 !important;
//             opacity: 0.4;
//             width: 8px;
//             height: 8px;
//           }

//           .custom-pagination .swiper-pagination-bullet-active {
//             opacity: 1;
//           }

//           @media (max-width: 640px) {
//             .custom-swiper .swiper-button-next,
//             .custom-swiper .swiper-button-prev {
//               display: none !important;
//             }
//           }
//         `}</style>

//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function NewArrivalsSwiper() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchData();
  }, []);

  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600 text-center md:text-left">
            New <span className="text-orange-600">Vastu</span> Arrivals
          </h2>

          <Link
            to="/shop"
            className="bg-gray-600 text-white px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base hover:bg-gray-700 transition"
          >
            Explore All →
          </Link>
        </div>

        {/* SWIPER */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={15}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            loop={newArrivals.length > 4}
            className="custom-swiper"
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 25 },
            }}
          >
            {newArrivals.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="group bg-white rounded-2xl p-3 shadow-md border border-gray-100 h-full transition-all duration-300 hover:shadow-xl">

                  <Link to={`/product/${item._id}`}>
                    <div className="h-52 sm:h-60 md:h-64 overflow-hidden rounded-xl">
                      <img
                        src={item.images?.[0] || item.image || "/placeholder.png"}
                        alt={item.productName || item.name}
                        className="h-full w-full object-contain group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  </Link>

                  <div className="mt-3 text-center">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* DOTS */}
          <div className="custom-pagination mt-6 flex justify-center"></div>
        </div>

        {/* Custom Styles */}
        <style>{`
          .custom-pagination .swiper-pagination-bullet {
            background: #f97316 !important;
            opacity: 0.4;
            width: 8px;
            height: 8px;
          }

          .custom-pagination .swiper-pagination-bullet-active {
            opacity: 1;
            width: 24px;
            border-radius: 4px;
            transition: all 0.3s;
          }
        `}</style>

      </div>
    </section>
  );
} 