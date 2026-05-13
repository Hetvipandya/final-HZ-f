import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { getImageUrl } from "../BASEURL";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const toastStyle = {
    position: "bottom-right",
    style: {
      background: "#1f2937",
      color: "#fff",
      borderRadius: "10px",
    },
  };

  const goToDetail = () => {
    navigate(`/product/${product._id}`);
  };

  // ❤️ Wishlist
  const addToWishlist = (e) => {
    e.stopPropagation();

    const wishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const exists = wishlist.some((item) => item._id === product._id);

    if (exists) {
      toast("Already in wishlist ❤️", {
        ...toastStyle,
        icon: "ℹ️",
      });
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));

    toast.success("Added to wishlist ❤️", toastStyle);
  };

  // 🛒 Cart
  const addToCart = (e) => {
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first ❗", {
        position: "top-center",
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "10px",
        },
      });
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const index = cart.findIndex((item) => item._id === product._id);

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.productName,
        price: product.price,
        image: product.images?.[0] || product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to cart 🛒", toastStyle);
  };

  const discount =
    product.originalPrice && product.discountPrice
      ? Math.round(
        ((product.originalPrice - product.discountPrice) /
          product.originalPrice) *
        100
      )
      : 0;

  return (
    <div
      onClick={goToDetail}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* IMAGE */}
      <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden bg-gray-50">

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-orange-600 text-white text-[10px] px-2 py-1 rounded-full font-bold">
            {discount}% OFF
          </span>
        )}

        <img
          src={getImageUrl(product.images?.[0] || product.image)}
          alt={product.productName}
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300?text=No+Image";
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
            {product.productName}
          </h3>

          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md shrink-0">
            <FaStar className="text-yellow-500 text-xs" />
            <span className="text-xs font-semibold text-orange-700">
              {product.rating || 4.2}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
          {product.categoryId?.name || "Vastu Product"}
        </p>

        {/* PRICE + BUTTONS */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex flex-col">
            {product.price && (
              <span className="text-gray-400 line-through text-[10px] sm:text-xs">
                ₹{product.price}
              </span>
            )}
            <span className="text-base sm:text-lg font-bold text-black">
              ₹{product.discountPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={addToWishlist}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
              title="Add to Wishlist"
            >
              <FaHeart size={14} />
            </button>

            <button
              onClick={addToCart}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-orange-600 transition-all shadow-md active:scale-95"
              title="Add to Cart"
            >
              <FaShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
