// import { Link, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaHeart, FaStar, FaShoppingCart, FaMinus, FaPlus, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
// import { FiArrowLeft, FiShare2 } from "react-icons/fi";
// import toast from "react-hot-toast";
// import BASE_URL, { getImageUrl } from "../BASEURL";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [products, setProducts] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [mainImage, setMainImage] = useState("");

//   const backendUrl = BASE_URL;

//   // Fetch Logic (તમારા જેવું જ છે, બસ ઈમેજ સેટ કરવા માટે ફેરફાર કર્યો છે)
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${backendUrl}/api/product/${id}`);
//         const data = await res.json();
//         const foundProduct = data.product || data.data?.product || data.data || data || null;
//         setProduct(foundProduct);
        
//         // સેટિંગ મેઈન ઈમેજ
//         if(foundProduct) {
//             const imgUrl = foundProduct.images?.[0] || foundProduct.image;
//             setMainImage(getImageUrl(imgUrl));
//         }
//       } catch (err) {
//         console.log(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         const res = await fetch(`${backendUrl}/api/product/all`);
//         const data = await res.json();
//         setProducts(Array.isArray(data) ? data : data.products || []);
//       } catch (err) { console.log(err.message); }
//     };
//     fetchAllProducts();
//   }, []);

//   // Handlers
//   const addToCart = () => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (!currentUser) {
//       toast.error("Please login first ❗");
//       return;
//     }

//     const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const itemIndex = cart.findIndex((item) => item._id === product._id);

//     if (itemIndex > -1) {
//       cart[itemIndex].quantity = Number(cart[itemIndex].quantity || 0) + Number(quantity || 1);
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.productName || product.name || "",
//         price: product.discountPrice || product.price || 0,
//         image: product.images?.[0] || product.image || "",
//         quantity: Number(quantity || 1),
//       });
//     }

//     localStorage.setItem("cartItems", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//     toast.success(`${quantity} item(s) added to cart 🛒`);
//   };

//   const toggleWishlist = () => {
//     const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
//     const itemIndex = wishlist.findIndex((item) => item._id === product._id);

//     if (itemIndex > -1) {
//       wishlist.splice(itemIndex, 1);
//       setIsWishlisted(false);
//       toast.success("Removed from wishlist");
//     } else {
//       wishlist.push({
//         _id: product._id,
//         name: product.productName || product.name || "",
//         price: product.discountPrice || product.price || 0,
//         image: product.images?.[0] || product.image || "",
//       });
//       setIsWishlisted(true);
//       toast.success("Added to wishlist ❤️");
//     }

//     localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   const updateQuantity = (delta) => {
//     setQuantity((prev) => Math.max(1, prev + delta));
//   };

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
//     </div>
//   );

//   if (!product) return <div className="text-center py-20">Product not found.</div>;

//   const relatedProducts = products.filter(p => p._id !== product._id && p.categoryId?._id === product.categoryId?._id);

//   return (
//     <section className="bg-white min-h-screen pb-20">
//       {/* Top Navigation */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <Link to="/shop" className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-all font-medium">
//           <FiArrowLeft /> Back to Collection
//         </Link>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        
//         {/* Left: Product Images */}
//         <div className="space-y-4 sticky top-6">
//           <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
//             <img 
//               src={mainImage} 
//               alt={product.productName} 
//               className="w-full h-full object-contain mix-blend-multiply p-8 transform hover:scale-110 transition-transform duration-700"
//             />
//           </div>
//           {/* Thumbnails */}
//           <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
//             {(product.images?.length > 0 ? product.images : [product.image]).map((img, idx) => (
//               <button 
//                 key={idx}
//                 onClick={() => setMainImage(getImageUrl(img))}
//                 className={`w-20 h-20 flex-shrink-0 rounded-xl border-2 overflow-hidden transition-all ${mainImage.includes(img) ? 'border-orange-500' : 'border-transparent bg-gray-50'}`}
//               >
//                 <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="thumb" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right: Product Details */}
//         <div className="flex flex-col">
//           <div className="flex justify-between items-start">
//             <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">{product.categoryId?.name || "New Arrival"}</span>
//           </div>
          
//           <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">{product.productName}</h1>
          
//           <div className="flex items-center gap-4 mb-6">
//             <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-bold">
//               {product.rating || "4.5"} <FaStar className="text-[10px]" />
//             </div>
//           </div>

//           <div className="flex items-baseline gap-4 mb-8">
//             <span className="text-4xl font-black text-gray-900">₹{product.discountPrice || product.price}</span>
//             {product.discountPrice && (
//               <>
//                 <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
//                 <span className="text-green-600 font-bold">({Math.round(((product.price - product.discountPrice)/product.price)*100)}% OFF)</span>
//               </>
//             )}
//           </div>

//           <p className="text-gray-600 leading-relaxed mb-8 text-lg border-l-4 border-orange-200 pl-4 bg-orange-50/30 py-2">
//             {product.description}
//           </p>

//           {/* Size/Options (Optional) */}
//           <div className="mb-8">
//             <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Size</h3>
//             <p className="text-gray-500 text-base"> {product.size || "Not specified"}</p>
//           </div>

//           {/* Quantity & Actions */}
//           <div className="flex flex-wrap gap-4 items-center">
            
            
//             <button 
//               onClick={addToCart}
//               className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95"
//             >
//               <FaShoppingCart /> Add to Cart
//             </button>
            
//             <button 
//               onClick={toggleWishlist}
//               className={`p-4 rounded-2xl border-2 transition-all ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-100 text-gray-400 hover:text-red-500'}`}
//             >
//               <FaHeart className={isWishlisted ? "fill-current" : ""} />
//             </button>
//           </div>

//           {/* Trust Badges */}
//           <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
//             <div className="text-center">
//               <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2"><FaTruck /></div>
//               <p className="text-[10px] font-bold uppercase text-gray-500">Free Shipping</p>
//             </div>
//             <div className="text-center">
//               <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2"><FaShieldAlt /></div>
//               <p className="text-[10px] font-bold uppercase text-gray-500">Secure Payment</p>
//             </div>
//             <div className="text-center">
//               <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2"><FaUndo /></div>
//               <p className="text-[10px] font-bold uppercase text-gray-500">7 Days Return</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products Section */}
//       {relatedProducts.length > 0 && (
//         <div className="max-w-7xl mx-auto px-4 mt-24">
//           <div className="flex justify-between items-end mb-10">
//             <div>
//               <h2 className="text-3xl font-black text-gray-900">You May Also Like</h2>
//               <div className="h-1 w-20 bg-orange-500 mt-2"></div>
//             </div>
//             <Link to="/shop" className="text-orange-600 font-bold hover:underline">View All</Link>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {relatedProducts.slice(0, 4).map((item) => (
//               <ProductCard key={item._id} item={item} backendUrl={backendUrl} />
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// // નાનું પ્રોડક્ટ કાર્ડ કમ્પોનન્ટ
// function ProductCard({ item, backendUrl }) {
//   const imgUrl = item.images?.[0] || item.image;
//   const finalImg = getImageUrl(imgUrl);

//   return (
//     <Link to={`/product/${item._id}`} className="group">
//       <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-3">
//         <img src={finalImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.productName} />
//         <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
//           <FaHeart className="text-gray-400 hover:text-red-500" />
//         </div>
//       </div>
//       <h3 className="font-bold text-gray-900 truncate">{item.productName}</h3>
//       <p className="text-orange-600 font-black">₹{item.price}</p>
//     </Link>
//   );
// }

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import BASE_URL, { getImageUrl } from "../BASEURL";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  const backendUrl = BASE_URL;

  // FETCH SINGLE PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${backendUrl}/api/product/${id}`
        );

        const data = await res.json();

        const foundProduct =
          data.product ||
          data.data?.product ||
          data.data ||
          data ||
          null;

        setProduct(foundProduct);

        // MAIN IMAGE
        if (foundProduct) {
          const imgUrl =
            (Array.isArray(foundProduct.images) &&
            foundProduct.images.length > 0
              ? foundProduct.images[0]
              : foundProduct.image) || "";

          setMainImage(
            imgUrl
              ? getImageUrl(imgUrl)
              : "https://via.placeholder.com/600x600?text=No+Image"
          );
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // FETCH ALL PRODUCTS
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/product/all`
        );

        const data = await res.json();

        setProducts(
          Array.isArray(data)
            ? data
            : data.products || []
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchAllProducts();
  }, []);

  // ADD TO CART
  const addToCart = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      toast.error("Please login first ❗");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const itemIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (itemIndex > -1) {
      cart[itemIndex].quantity =
        Number(cart[itemIndex].quantity || 0) +
        Number(quantity || 1);
    } else {
      cart.push({
        _id: product._id,
        name:
          product.productName ||
          product.name ||
          "",
        price:
          product.discountPrice ||
          product.price ||
          0,
        image:
          product.images?.[0] ||
          product.image ||
          "",
        quantity: Number(quantity || 1),
      });
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    toast.success(
      `${quantity} item(s) added to cart 🛒`
    );
  };

  // WISHLIST
  const toggleWishlist = () => {
    const wishlist =
      JSON.parse(
        localStorage.getItem("wishlistItems")
      ) || [];

    const itemIndex = wishlist.findIndex(
      (item) => item._id === product._id
    );

    if (itemIndex > -1) {
      wishlist.splice(itemIndex, 1);

      setIsWishlisted(false);

      toast.success("Removed from wishlist");
    } else {
      wishlist.push({
        _id: product._id,
        name:
          product.productName ||
          product.name ||
          "",
        price:
          product.discountPrice ||
          product.price ||
          0,
        image:
          product.images?.[0] ||
          product.image ||
          "",
      });

      setIsWishlisted(true);

      toast.success("Added to wishlist ❤️");
    }

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20">
        Product not found.
      </div>
    );

  // RELATED PRODUCTS
  // IMAGE DELETE THAI GAI HOY TOH SHOW NA THAY
  const relatedProducts = products.filter(
    (p) =>
      p._id !== product._id &&
      p.categoryId?._id ===
        product.categoryId?._id &&
      (
        (Array.isArray(p.images) &&
          p.images.length > 0) ||
        p.image
      )
  );

  return (
    <section className="bg-white min-h-screen pb-20">

      {/* TOP NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/shop"
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-all font-medium"
        >
          <FiArrowLeft />
          Back to Collection
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="space-y-4 sticky top-6">

          {/* MAIN IMAGE */}
          <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <img
              src={mainImage}
              alt={product.productName}
              className="w-full h-full object-contain mix-blend-multiply p-8 transform hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x600?text=No+Image";
              }}
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">

            {(product.images?.length > 0
              ? product.images
              : product.image
              ? [product.image]
              : []
            ).map((img, idx) => (

              <button
                key={idx}
                onClick={() =>
                  setMainImage(getImageUrl(img))
                }
                className={`w-20 h-20 flex-shrink-0 rounded-xl border-2 overflow-hidden transition-all ${
                  mainImage.includes(img)
                    ? "border-orange-500"
                    : "border-transparent bg-gray-50"
                }`}
              >
                <img
                  src={getImageUrl(img)}
                  className="w-full h-full object-cover"
                  alt="thumb"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150x150?text=No+Image";
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col">

          <div className="flex justify-between items-start">
            <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">
              {product.categoryId?.name ||
                "New Arrival"}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">
            {product.productName}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-bold">
              {product.rating || "4.5"}
              <FaStar className="text-[10px]" />
            </div>
          </div>

          {/* PRICE */}
          <div className="flex items-baseline gap-4 mb-8">

            <span className="text-4xl font-black text-gray-900">
              ₹
              {product.discountPrice ||
                product.price}
            </span>

            {product.discountPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.price}
                </span>

                <span className="text-green-600 font-bold">
                  (
                  {Math.round(
                    ((product.price -
                      product.discountPrice) /
                      product.price) *
                      100
                  )}
                  % OFF)
                </span>
              </>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed mb-8 text-lg border-l-4 border-orange-200 pl-4 bg-orange-50/30 py-2">
            {product.description}
          </p>

          {/* SIZE */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Size
            </h3>

            <p className="text-gray-500 text-base">
              {product.size ||
                product.sizes?.join(", ") ||
                "Not specified"}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 items-center">

            <button
              onClick={addToCart}
              className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className={`p-4 rounded-2xl border-2 transition-all ${
                isWishlisted
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-gray-100 text-gray-400 hover:text-red-500"
              }`}
            >
              <FaHeart
                className={
                  isWishlisted
                    ? "fill-current"
                    : ""
                }
              />
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">

            <div className="text-center">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaTruck />
              </div>

              <p className="text-[10px] font-bold uppercase text-gray-500">
                Free Shipping
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaShieldAlt />
              </div>

              <p className="text-[10px] font-bold uppercase text-gray-500">
                Secure Payment
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaUndo />
              </div>

              <p className="text-[10px] font-bold uppercase text-gray-500">
                7 Days Return
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-24">

          <div className="flex justify-between items-end mb-10">

            <div>
              <h2 className="text-3xl font-black text-gray-900">
                You May Also Like
              </h2>

              <div className="h-1 w-20 bg-orange-500 mt-2"></div>
            </div>

            <Link
              to="/shop"
              className="text-orange-600 font-bold hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {relatedProducts
              .slice(0, 4)
              .map((item) => (
                <ProductCard
                  key={item._id}
                  item={item}
                />
              ))}

          </div>
        </div>
      )}
    </section>
  );
}

// PRODUCT CARD
function ProductCard({ item }) {

  const imgUrl =
    (Array.isArray(item.images) &&
    item.images.length > 0
      ? item.images[0]
      : item.image) || "";

  const finalImg = imgUrl
    ? getImageUrl(imgUrl)
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <Link
      to={`/product/${item._id}`}
      className="group"
    >

      <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-3">

        <img
          src={finalImg}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={item.productName}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />

        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
          <FaHeart className="text-gray-400 hover:text-red-500" />
        </div>

      </div>

      <h3 className="font-bold text-gray-900 truncate">
        {item.productName}
      </h3>

      <p className="text-orange-600 font-black">
        ₹{item.price}
      </p>

    </Link>
  );
}