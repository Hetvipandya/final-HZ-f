// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import BASE_URL, { getImageUrl } from "../BASEURL";

// export default function FeaturedCategories() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH CATEGORY =================
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/category`);

//       console.log("CATEGORY RESPONSE =>", response.data);

//       setCategories(response.data?.data || []);
//     } catch (error) {
//       console.log("CATEGORY ERROR =>", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="py-20 text-center text-lg font-semibold">
//         Loading Divine Collections...
//       </div>
//     );
//   }

//   return (
//     <section className="py-12 sm:py-16 md:py-20 bg-[#f9f7f2]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">

//         {/* HEADER */}
//         <div
//           className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 md:mb-16 gap-6"
//           data-aos="fade-up"
//         >
//           <div className="max-w-2xl">
//             <span className="text-orange-600 font-semibold tracking-widest uppercase text-xs sm:text-sm">
//               Divine Collection
//             </span>

//             <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-2 leading-snug">
//               Vastu & Spiritual{" "}  
//               <span className="text-orange-600">Categories</span>
//             </h2>

//             <div className="h-1 w-16 sm:w-20 bg-orange-500 mt-3 sm:mt-4"></div>
//           </div>

//           <p className="text-gray-600 max-w-md italic text-sm sm:text-base">
//             "Positivity and balance in every corner of your home."
//             Explore our curated spiritual tools.
//           </p>
//         </div>

//         {/* CATEGORY GRID */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 sm:gap-y-12 gap-x-4 sm:gap-x-6">
//           {categories.map((cat, index) => {

//             // ================= CLOUDINARY IMAGE HANDLE =================
//             const image =
//               cat.image?.url ||
//               cat.image?.secure_url ||
//               cat.image ||
//               cat.images?.[0] ||
//               "";

//             return (
//               <div
//                 key={cat._id || cat.id}
//                 data-aos="fade-up"
//                 data-aos-delay={index * 100}
//               >
//                 <Link
//                   to={`/shop?category=${encodeURIComponent(
//                     cat.slug || cat.name || cat._id || ""
//                   )}`}
//                   className="group relative flex flex-col items-center"
//                 >

//                   {/* IMAGE */}
//                   <div
//                     className="
//                       relative
//                       w-28 h-28
//                       sm:w-36 sm:h-36
//                       md:w-44 md:h-44
//                       lg:w-52 lg:h-52
//                       overflow-hidden
//                       border-4 border-white
//                       shadow-lg
//                       transition-all duration-500
//                       group-hover:border-orange-400
//                       group-hover:shadow-2xl
//                     "
//                   >

//                     {image ? (
//                       <img
//                         src={getImageUrl(image)}
//                         alt={cat.name || "Category"}
//                         className="
//                           w-full
//                           h-full
//                           object-cover
//                           transition-transform
//                           duration-700
//                           group-hover:scale-110
//                         "
//                         onError={(e) => {
//                           e.target.src =
//                             "https://via.placeholder.com/300?text=No+Image";
//                         }}
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
//                         Image not available
//                       </div>
//                     )}

//                     {/* OVERLAY */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
//                   </div>

//                   {/* TEXT */}
//                   <div className="mt-4 sm:mt-6 text-center">
//                     <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-heading font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
//                       {cat.name}
//                     </h3>

//                     <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-block">
//                       Explore →
//                     </span>
//                   </div>

//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL, { getImageUrl } from "../BASEURL";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination  } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH CATEGORY =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/category`);

      console.log("CATEGORY RESPONSE =>", response.data);

      setCategories(response.data?.data || []);
    } catch (error) {
      console.log("CATEGORY ERROR =>", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="py-20 text-center text-lg font-semibold">
        Loading Divine Collections...
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#f9f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 md:mb-16 gap-6"
          data-aos="fade-up"
        >
          <div className="max-w-2xl">
            <span className="text-orange-600 font-semibold tracking-widest uppercase text-xs sm:text-sm">
              Divine Collection
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-2 leading-snug">
              Vastu & Spiritual{" "}
              <span className="text-orange-600">Categories</span>
            </h2>

            <div className="h-1 w-16 sm:w-20 bg-orange-500 mt-3 sm:mt-4"></div>
          </div>

          <p className="text-gray-600 max-w-md italic text-sm sm:text-base">
            "Positivity and balance in every corner of your home."
            Explore our curated spiritual tools.
          </p>
        </div>

        {/* CATEGORY SLIDER */}
<Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={20}
  slidesPerView={2}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  loop={true}
  breakpoints={{
    480: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  }}
  className="
    pb-20
    [&_.swiper-pagination]:!bottom-0
    [&_.swiper-pagination]:flex
    [&_.swiper-pagination]:justify-center
    [&_.swiper-pagination]:items-center
    [&_.swiper-pagination]:gap-2
    [&_.swiper-pagination-bullet]:!w-2.5
    [&_.swiper-pagination-bullet]:!h-2.5
    [&_.swiper-pagination-bullet]:rounded-full
    [&_.swiper-pagination-bullet]:!bg-orange-300
    [&_.swiper-pagination-bullet]:opacity-100
    [&_.swiper-pagination-bullet]:transition-all
    [&_.swiper-pagination-bullet]:duration-300
    [&_.swiper-pagination-bullet-active]:!w-8
    [&_.swiper-pagination-bullet-active]:rounded-full
    [&_.swiper-pagination-bullet-active]:!bg-orange-500
  "
>
  {categories.map((cat, index) => {
    const image =
      cat.image?.url ||
      cat.image?.secure_url ||
      cat.image ||
      cat.images?.[0] ||
      "";

    return (
      <SwiperSlide key={cat._id || cat.id}>
        <div
          data-aos="fade-up"
          data-aos-delay={index * 100}
          className="pb-10"
        >
          <Link
            to={`/shop?category=${encodeURIComponent(
              cat.slug || cat.name || cat._id || ""
            )}`}
            className="group flex flex-col items-center"
          >
            {/* IMAGE */}
            <div
              className="
                relative
                w-32 h-32
                sm:w-40 sm:h-40
                md:w-48 md:h-48
                lg:w-52 lg:h-52
                overflow-hidden
                rounded-2xl
                border-4 border-white
                shadow-lg
                transition-all duration-500
                group-hover:border-orange-400
                group-hover:shadow-2xl
              "
            >
              {image ? (
                <img
                  src={getImageUrl(image)}
                  alt={cat.name || "Category"}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  Image not available
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-20 transition-all duration-300"></div>
            </div>

            {/* TEXT */}
            <div className="mt-5 text-center min-h-[70px]">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-heading font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                {cat.name}
              </h3>

              <span
                className="
                  mt-2
                  inline-block
                  text-xs sm:text-sm
                  font-semibold
                  uppercase
                  text-orange-500
                  opacity-0
                  translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:translate-y-0
                "
              >
                Explore →
              </span>
            </div>
          </Link>
        </div>
      </SwiperSlide>
    );
  })}
</Swiper>
      </div>
    </section>
  );
}