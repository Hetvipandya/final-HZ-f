// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FiX, FiSearch } from "react-icons/fi";
// import { getProducts } from "../data/products"; 

// export default function SearchModal({ onClose }) {
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState([]);

//   // 🔒 Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => (document.body.style.overflow = "auto");
//   }, []);

//   // ✅ Load products
//   useEffect(() => {
//     const data = getProducts(); // if async → use await
//     setProducts(data);
//   }, []);

//   // ✅ Filter products
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center px-4 pt-24">

//       {/* MODAL */}
//       <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">

//         {/* HEADER */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center gap-2 w-full">
//             <FiSearch className="text-gray-400" />
//             <input
//               type="text"
//               autoFocus
//               placeholder="Search products..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full outline-none text-base md:text-sm"
//             />
//           </div>

//           <button
//             onClick={onClose}
//             className="text-xl text-gray-500 hover:text-black"
//             aria-label="Close"
//           >
//             <FiX />
//           </button>
//         </div>

//         {/* RESULTS */}
//         <div className="max-h-[60vh] overflow-y-auto p-4">
//           {query === "" ? (
//             <p className="text-gray-400 text-sm">
//               Start typing to search products
//             </p>
//           ) : filteredProducts.length === 0 ? (
//             <p className="text-gray-500 text-sm">
//               No products found
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {filteredProducts.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/product/${product.id}`}
//                   onClick={onClose}
//                   className="border rounded-lg overflow-hidden hover:shadow transition"
//                 >
//                   <img
//                     src={product.images?.[0]}
//                     alt={product.name}
//                     className="h-40 w-full object-cover"
//                   />

//                   <div className="p-3 space-y-1">
//                     <h4 className="text-sm font-semibold truncate">
//                       {product.name}
//                     </h4>
//                     <p className="text-sm font-bold text-primary">
//                       ₹{product.price}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX, FiSearch } from "react-icons/fi";
import { getProducts } from "../data/products";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  // 🔒 Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // ✅ Load products (FIXED)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // ✅ WAIT for promise
        console.log("PRODUCT DATA:", data);

        // if API returns array directly
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Safe filter (no crash)
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center px-4 pt-24 mt-7">
      
      {/* MODAL */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 w-full">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              autoFocus 
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-base md:text-sm"
            />
          </div>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-black"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {/* RESULTS */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query === "" ? (
            <p className="text-gray-400 text-sm">
              Start typing to search products
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No products found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="border rounded-lg overflow-hidden hover:shadow transition"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-3 space-y-1">
                    <h4 className="text-sm font-semibold truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm font-bold text-primary">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}