// import { useEffect, useState } from "react";
// import categories from "../data/categories";
// import { getProducts } from "../data/products";
// import FeaturedCategories from "../components/FeaturedCategories";
// import HeroCarousel from "../components/HeroCarousel";
// import ContactCTA from "../components/ContactCTA";
// import NewArrivalsSwiper from "../components/NewArrivalsSwiper";
// import { Link } from "react-router-dom";

// export default function Home() {
//   const [products, setProducts] = useState([]); // ✅ FIX

//   // ✅ Fetch products from Sanity
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getProducts();
//       setProducts(data);
//     };
//     fetchData();
//   }, []);

//   // ✅ Only active categories
//   const bestSellers = categories
//     .filter((c) => c.status === "active")
//     .slice(0, 4);

//   return (
//     <div className="bg-white">

//       {/* HERO */}
//       <HeroCarousel />

//       {/* FEATURED CATEGORIES */}
//       <FeaturedCategories />

//       {/* POPULAR COLLECTION */} 
//       <section className="py-24 bg-[#fcfaf8] relative overflow-hidden">

//         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>

//         <div className="max-w-7xl mx-auto px-6 relative z-10">

//           {/* Header */}
//           <div className="flex flex-col items-center text-center mb-16">
//             <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
//               Top Rated
//             </span>

//             <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mt-4">
//               Our Popular{" "}
//               <span className="text-orange-600">
//                 Vastu Collection
//               </span>
//             </h2>

//             <p className="text-gray-600 mt-4 max-w-2xl text-lg">
//               Explore our most loved categories designed to bring harmony,
//               prosperity, and positivity to your sacred space.
//             </p>
//           </div>

//           {/* GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

//             {bestSellers.map((item, index) => {

//               const product = products.find(
//                 (p) => 
//                   p.categorySlug === item.slug ||
//                   p.category === item.name
//               );

//               return (
//                 <Link
//                   key={item.id}
//                   to={product ? `/product/${product.id}` : "/shop"}
//                   className="group relative"
//                   data-aos="fade-up"
//                   data-aos-delay={index * 150}
//                 >

//                   <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">

//                     <div className="overflow-hidden rounded-[1.5rem] h-80">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                     </div>

//                     <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-8">
//                       <p className="text-white/80 text-sm mb-1 uppercase tracking-widest">
//                         View Product
//                       </p>
//                       <h3 className="text-white text-2xl font-bold">
//                         {item.name}
//                       </h3>
//                     </div>

//                   </div>

//                   <div className="mt-6 text-center group-hover:hidden transition">
//                     <h3 className="text-xl font-heading font-bold text-slate-800">
//                       {item.name}
//                     </h3>
//                     <div className="w-10 h-0.5 bg-orange-400 mx-auto mt-2 transition-all group-hover:w-20"></div>
//                   </div>

//                 </Link>
//               );
//             })}

//           </div>

//           {/* Button */}
//           <div className="mt-16 text-center">
//             <Link
//               to="/shop"
//               className="inline-block border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-md"
//             >
//               View Full Collection
//             </Link>
//           </div>

//         </div>
//       </section>

//       {/* NEW ARRIVALS */}
//       <div className="bg-white">
//         <NewArrivalsSwiper />
//       </div>

//       {/* CONTACT */}
//       <ContactCTA />

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import categories from "../data/categories"; // જો આ પણ DB માંથી આવતું હોય તો ત્યાંથી ફેચ કરવું
import { getProducts } from "../data/products"; // ખાતરી કરો કે આ તમારા નવા API ને કોલ કરે છે
import FeaturedCategories from "../components/FeaturedCategories";
import HeroCarousel from "../components/HeroCarousel";
import ContactCTA from "../components/ContactCTA";
import NewArrivalsSwiper from "../components/NewArrivalsSwiper";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  // ✅ Fetch products from Backend (MongoDB)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(); // આ API https://harsh-patel-holly-zolly-backend.onrender.com/api/product/all હોવી જોઈએ
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const popularProducts = products.slice(0, 4);

  return (
    <div className="bg-white">
      {/* HERO */}
      <HeroCarousel />

      {/* FEATURED CATEGORIES */}
      <FeaturedCategories />

      {/* POPULAR COLLECTION */}
      <section className="py-24 bg-[#fcfaf8] relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Top Rated
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mt-4">
              Our Popular <span className="text-orange-600">Vastu Collection</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl text-lg">
              Explore our most loved categories designed to bring harmony,
              prosperity, and positivity to your sacred space.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {popularProducts.map((item, index) => (
              <Link
                key={item._id} // MongoDB ID
                to={`/product/${item._id}`} // Slug વગર સીધી ID
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="overflow-hidden rounded-[1.5rem] h-80">
                    <img
                      src={item.images?.[0] || item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-8">
                    <p className="text-white/80 text-sm mb-1 uppercase tracking-widest">
                      View Product
                    </p>
                    <h3 className="text-white text-2xl font-bold">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Default Bottom Name (Hidden on Hover) */}
                <div className="mt-6 text-center transition-all duration-300 group-hover:opacity-0">
                  <h3 className="text-xl font-heading font-bold text-slate-800">
                    {item.name}
                  </h3>
                  <div className="w-10 h-0.5 bg-orange-400 mx-auto mt-2 transition-all group-hover:w-20"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Button */}
          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="inline-block border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-md"
            >
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <div className="bg-white">
        <NewArrivalsSwiper />
      </div>

      {/* CONTACT */}
      <ContactCTA />
    </div>
  );
}