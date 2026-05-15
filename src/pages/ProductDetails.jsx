import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaBolt,
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

  // FETCH PRODUCT
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

        const wishlist =
          JSON.parse(
            localStorage.getItem("wishlistItems")
          ) || [];

        const exists = wishlist.find(
          (item) => item._id === foundProduct?._id
        );

        setIsWishlisted(!!exists);

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

    // 🔥 GET USER-SPECIFIC CART KEY
    const cartKey = `cartItems_${currentUser.email}`;

    const cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

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
      cartKey,
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
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Product not found.
      </div>
    );

  // RELATED PRODUCTS
  const relatedProducts = products.filter(
    (p) =>
      p._id !== product._id &&
      p.categoryId?._id ===
        product.categoryId?._id
  );

  return (
    <section className="bg-[#fafafa] min-h-screen pb-20">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6">

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-all font-semibold text-xs xs:text-sm"
        >
          <FiArrowLeft size={16} />
          Continue Shopping
        </Link>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-12">

        {/* LEFT */}
        <div className="space-y-5">

          {/* IMAGE */}
          <div className="bg-white rounded-2xl xs:rounded-3xl sm:rounded-[35px] p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100">

            <div className="aspect-square overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-50 to-white">

              <img
                src={mainImage}
                alt={product.productName}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x600?text=No+Image";
                }}
              />

            </div>

          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 xs:gap-3 sm:gap-4 overflow-x-auto pb-2">

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
                className={`w-16 h-16 xs:w-20 h-20 sm:w-24 sm:h-24 rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  mainImage.includes(img)
                    ? "border-orange-500 scale-105"
                    : "border-gray-200"
                }`}
              >

                <img
                  src={getImageUrl(img)}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />

              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>

          {/* CATEGORY */}
          <span className="bg-orange-100 text-orange-600 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs font-bold uppercase tracking-wider">
            {product.categoryId?.name ||
              "New Collection"}
          </span>

          {/* TITLE */}
          <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-3 xs:mt-4 sm:mt-5 leading-tight">
            {product.productName}
          </h1>

          {/* RATING */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3 sm:gap-4 mt-3 xs:mt-4 sm:mt-6">

            <div className="flex items-center gap-1 bg-green-500 text-white px-3 xs:px-4 py-1.5 xs:py-2 rounded-full font-bold text-xs xs:text-sm shadow-md">
              {product.rating || "4.8"}
              <FaStar className="text-xs" />
            </div>

            <p className="text-gray-500 font-medium text-xs xs:text-sm">
              1.2k+ Happy Customers
            </p>

          </div>

          {/* PRICE */}
          <div className="mt-4 xs:mt-6 sm:mt-8 flex items-center flex-wrap gap-2 xs:gap-3 sm:gap-4">

            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-gray-900">
              ₹
              {product.discountPrice ||
                product.price}
            </h2>

            {product.discountPrice && (
              <>
                <span className="text-lg xs:text-xl sm:text-2xl line-through text-gray-400">
                  ₹{product.price}
                </span>

                <span className="bg-green-100 text-green-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-bold">
                  Save{" "}
                  {Math.round(
                    ((product.price -
                      product.discountPrice) /
                      product.price) *
                      100
                  )}
                  %
                </span>
              </>
            )}

          </div>

          {/* DESCRIPTION */}
          <div className="mt-4 xs:mt-6 sm:mt-8 bg-white border border-gray-100 shadow-sm rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6">

            <h3 className="font-bold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3">
              Product Details
            </h3>

            <p className="text-gray-600 leading-6 xs:leading-7 sm:leading-8 text-sm xs:text-base">
              {product.description}
            </p>

          </div>

          {/* SIZE */}
          <div className="mt-4 xs:mt-6 sm:mt-8">

            <h3 className="font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 uppercase text-xs xs:text-sm">
              Select Size
            </h3>

            <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3">

              {(product.sizes?.length > 0
                ? product.sizes
                : [product.size || "Free Size"]
              ).map((size, idx) => (

                <button
                  key={idx}
                  className="px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl border border-gray-300 font-semibold text-xs xs:text-sm hover:border-orange-500 hover:bg-orange-50 transition-all"
                >
                  {size}
                </button>

              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mt-4 xs:mt-6 sm:mt-8">

            <h3 className="font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 uppercase text-xs xs:text-sm">
              Quantity
            </h3>

            <div className="flex items-center bg-white w-fit rounded-lg xs:rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="w-10 h-10 xs:w-12 h-12 sm:w-14 sm:h-14 text-base xs:text-lg sm:text-xl font-bold hover:bg-gray-100 flex items-center justify-center"
              >
                -
              </button>

              <div className="w-10 xs:w-12 sm:w-16 text-center font-bold text-base xs:text-lg">
                {quantity}
              </div>

              <button
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="w-10 h-10 xs:w-12 h-12 sm:w-14 sm:h-14 text-base xs:text-lg sm:text-xl font-bold hover:bg-gray-100 flex items-center justify-center"
              >
                +
              </button>

            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 mt-6 xs:mt-8 sm:mt-10">

            <button
              onClick={addToCart}
              className="flex-1 bg-gray-900 hover:bg-orange-500 text-white py-3 xs:py-4 sm:py-5 rounded-lg xs:rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 xs:gap-3 text-xs xs:text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-orange-200"
            >
              <FaShoppingCart size={16} />
              <span className="hidden xs:inline">Add To Cart</span>
              <span className="xs:hidden">Add</span>
            </button>

            <button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 xs:py-4 sm:py-5 rounded-lg xs:rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 xs:gap-3 text-xs xs:text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-orange-200"
            >
              <FaBolt size={16} />
              <span className="hidden xs:inline">Buy Now</span>
              <span className="xs:hidden">Buy</span>
            </button>

            <button
              onClick={toggleWishlist}
              className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-lg xs:rounded-xl sm:rounded-2xl border-2 flex items-center justify-center transition-all ${
                isWishlisted
                  ? "bg-red-50 border-red-300 text-red-500"
                  : "border-gray-200 text-gray-400 hover:text-red-500"
              }`}
            >
              <FaHeart
                size={16}
                className={
                  isWishlisted
                    ? "fill-current"
                    : ""
                }
              />
            </button>

          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 mt-8 xs:mt-10 sm:mt-12">

            <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 text-center border border-gray-100 shadow-sm">

              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-base xs:text-lg sm:text-xl mb-2 xs:mb-2.5 sm:mb-3">
                <FaTruck />
              </div>

              <p className="text-xs xs:text-sm font-bold text-gray-800">
                Free Delivery
              </p>

            </div>

            <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 text-center border border-gray-100 shadow-sm">

              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-base xs:text-lg sm:text-xl mb-2 xs:mb-2.5 sm:mb-3">
                <FaShieldAlt />
              </div>

              <p className="text-xs xs:text-sm font-bold text-gray-800">
                Secure Payment
              </p>

            </div>

            <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 text-center border border-gray-100 shadow-sm xs:col-span-2 sm:col-span-1">

              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-base xs:text-lg sm:text-xl mb-2 xs:mb-2.5 sm:mb-3">
                <FaUndo />
              </div>

              <p className="text-xs xs:text-sm font-bold text-gray-800">
                Easy Returns
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 mt-12 xs:mt-16 sm:mt-20 lg:mt-24">

          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 xs:gap-0 mb-6 xs:mb-8 sm:mb-10">

            <div>

              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-gray-900">
                Related Products
              </h2>

              <div className="w-20 xs:w-24 h-1 bg-orange-500 rounded-full mt-2 xs:mt-3"></div>

            </div>

            <Link
              to="/shop"
              className="font-bold text-orange-500 hover:underline text-sm xs:text-base"
            >
              View More
            </Link>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">

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

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">

        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">

          <img
            src={finalImg}
            alt={item.productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">

            <FaHeart />

          </button>

        </div>

        <div className="p-5">

          <h3 className="font-bold text-gray-900 truncate">
            {item.productName}
          </h3>

          <div className="flex items-center justify-between mt-3">

            <p className="text-xl font-black text-orange-500">
              ₹
              {item.discountPrice ||
                item.price}
            </p>

            <div className="flex items-center gap-1 text-yellow-500 text-sm">

              <FaStar />

              <span className="text-gray-700 font-semibold">
                4.8
              </span>

            </div>

          </div>

        </div>

      </div>

    </Link>
  );
}