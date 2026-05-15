// import { useState, useEffect } from "react";
// import { FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Wishlist() {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const navigate = useNavigate();

//   const topToast = {
//     position: "top-center",
//     style: {
//       background: "#374151",
//       color: "#fff",
//       borderRadius: "10px",
//     },
//   };

//   // ✅ Load wishlist
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
//     setWishlistItems(stored);
//   }, []);

//   // ❌ REMOVE ONLY ONE ITEM (FIXED)
//   const removeFromWishlist = (id) => {
//     const updated = wishlistItems.filter((item) => item._id !== id);

//     setWishlistItems(updated);
//     localStorage.setItem("wishlistItems", JSON.stringify(updated));

//     window.dispatchEvent(new Event("wishlistUpdated"));

//     toast.success("Removed from wishlist ❌", topToast);
//   };

//   // 🛒 MOVE TO CART
//   const moveToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

//     const index = cart.findIndex((item) => item._id === product._id);

//     if (index > -1) {
//       cart[index].quantity += 1;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.images?.[0],
//         quantity: 1,
//       });
//     }

//     localStorage.setItem("cartItems", JSON.stringify(cart));

//     // remove from wishlist
//     const updated = wishlistItems.filter((i) => i._id !== product._id);
//     setWishlistItems(updated);
//     localStorage.setItem("wishlistItems", JSON.stringify(updated));

//     window.dispatchEvent(new Event("cartUpdated"));

//     toast.success("Moved to cart 🛒", topToast);

//     navigate("/cart");
//   };

//   // empty state
//   if (wishlistItems.length === 0) {
//     return (
//       <div className="py-28 text-center min-h-[60vh] flex flex-col items-center justify-center px-6 bg-[#FCFBFA]">
//         <FaShoppingCart className="text-orange-200 text-5xl mb-6" />

//         <h2 className="text-3xl font-bold mb-4">
//           Your Wishlist is <span className="text-orange-600">Empty</span>
//         </h2>

//         <p className="text-gray-500 mb-8 max-w-sm">
//           Save your favourite products and come back later.
//         </p>

//         <Link
//           to="/shop"
//           className="bg-black text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition"
//         >
//           Discover Products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="py-14 bg-[#FCFBFA] min-h-screen">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* TITLE */}
//         <h1 className="text-4xl font-bold mb-10">
//           My <span className="text-orange-600">Wishlist</span>
//         </h1>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//           {wishlistItems.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group"
//             >

//               {/* IMAGE */}
//               <div className="relative h-60 overflow-hidden">
//                 <Link to={`/product/${item._id}`}>
//                   <img
//                     src={item.images?.[0]}
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition"
//                   />
//                 </Link>

//                 {/* DELETE */}
//                 <button
//                   onClick={() => removeFromWishlist(item._id)}
//                   className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
//                 >
//                   <FaTrash size={14} />
//                 </button>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5">

//                 <h3 className="font-semibold text-lg mb-2">
//                   {item.name}
//                 </h3>

//                 <p className="text-sm text-gray-500 mb-3">
//                   ₹{item.price}
//                 </p>

//                 {/* BUTTON */}
//                 <button
//                   onClick={() => moveToCart(item)}
//                   className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition"
//                 >
//                   <FaShoppingCart />
//                   Move to Cart
//                 </button>

//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getImageUrl } from "../BASEURL";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  const topToast = {
    position: "top-center",
    style: {
      background: "#374151",
      color: "#fff",
      borderRadius: "10px",
    },
  };

  // ✅ Load wishlist
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistItems(stored);
  }, []);

  // ❌ REMOVE ITEM
  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item._id !== id);

    setWishlistItems(updated);
    localStorage.setItem("wishlistItems", JSON.stringify(updated));

    window.dispatchEvent(new Event("wishlistUpdated"));

    toast.success("Removed from wishlist ❌", topToast);
  };

  // 🛒 MOVE TO CART
  const moveToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first ❗", topToast);
      navigate("/login");
      return;
    }

    // 🔥 GET USER-SPECIFIC CART KEY
    const cartKey = `cartItems_${user.email}`;

    const cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    const index = cart.findIndex((item) => item._id === product._id);

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image,
        quantity: 1,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    // remove from wishlist
    const updated = wishlistItems.filter((i) => i._id !== product._id);
    setWishlistItems(updated);
    localStorage.setItem("wishlistItems", JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Moved to cart 🛒", topToast);

    navigate("/cart");
  };

  // EMPTY STATE
  if (wishlistItems.length === 0) {
    return (
      <div className="py-28 text-center min-h-[60vh] flex flex-col items-center justify-center px-6 bg-[#FCFBFA]">
        <FaShoppingCart className="text-orange-200 text-5xl mb-6" />

        <h2 className="text-3xl font-bold mb-4">
          Your Wishlist is{" "}
          <span className="text-orange-600">Empty</span>
        </h2>

        <p className="text-gray-500 mb-8 max-w-sm">
          Save your favourite products and come back later.
        </p>

        <Link
          to="/shop"
          className="bg-black text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <section className="py-14 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-10">
          My <span className="text-orange-600">Wishlist</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group"
            >

              {/* IMAGE FIX 🔥 */}
              <div className="relative h-60 overflow-hidden">

                <Link to={`/product/${item._id}`}>
                  <img
                    src={getImageUrl(item.images?.[0] || item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300?text=No+Image";
                    }}
                  />
                </Link>

                {/* DELETE */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="font-semibold text-lg mb-2">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  ₹{item.price}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => moveToCart(item)}
                  className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition"
                >
                  <FaShoppingCart />
                  Move to Cart
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
