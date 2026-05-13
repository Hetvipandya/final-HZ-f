import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ContactCTA from "../components/ContactCTA";
import { useSearchParams } from "react-router-dom";
import { FaFilter, FaSortAmountDown, FaStar, FaSearch, FaTimes } from "react-icons/fa";
import BASE_URL from "../BASEURL";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState("");
  const [search, setSearch] = useState("");
  const backendUrl = BASE_URL;

  const [searchParams] = useSearchParams();
  const categoryFromUrl = decodeURIComponent(
    searchParams.get("category") || ""
  );

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // ✅ Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const res = await fetch(`${backendUrl}/api/product/all`);
  
        const data = await res.json();
  
        console.log("ALL PRODUCTS API:", data);
  
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else if (Array.isArray(data.data?.products)) {
          setProducts(data.data.products);
        } else {
          setProducts([]);
        }
  
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/category`);
        const data = await res.json();
        if (data?.success && Array.isArray(data.data)) {
          setCategoriesList(data.data);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [products]);

  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== "all") {
      setCategory(categoryFromUrl);
    } else {
      setCategory("");
    }
  }, [categoryFromUrl]);

  // ✅ FILTER & SORT LOGIC
  const filteredProducts = (Array.isArray(products) ? products : [])
    .filter((product) => {
      // 1. Category Filter
      const productCategoryName =
        product.categoryId?.name ||
        product.category?.name ||
        product.category ||
        (typeof product.categoryId === "string"
          ? categoriesList.find((cat) => cat._id === product.categoryId)?.name
          : "") ||
        "";
      const productCategoryId =
        typeof product.categoryId === "string"
          ? product.categoryId
          : product.categoryId?._id || "";
      const selectedCategory = category.toLowerCase().trim();
      const normalizedProductCategory =
        String(productCategoryName || productCategoryId || product.category || "")
          .toLowerCase()
          .trim();
      if (category && normalizedProductCategory !== selectedCategory) {
        return false;
      }
      


      // 2. Search Filter
      const nameMatch = product.productName || product.name || "";
      if (search && !nameMatch.toLowerCase().includes(search.toLowerCase())) return false;

      // 3. Rating Filter
      if (rating && Number(product.rating) < Number(rating)) return false;

      return true;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
    // console.log("FILTERED PRODUCTS:", filteredProducts);
    // console.log("FILTERED COUNT:", filteredProducts.length);
  const clearAllFilters = () => {
    setCategory("");
    setRating("");
    setSearch("");
    setSort("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading divine products...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-20">

        {/* HEADER */}
        <div className="text-center mb-16" data-aos="fade-down">
          <div className="inline-block bg-orange-100 text-orange-800 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Divine Marketplace
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore Our <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Sacred Collection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover authentic Vedic products crafted with ancient wisdom and modern elegance
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sacred products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none text-lg transition-all duration-300 shadow-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1 space-y-6" data-aos="fade-right">

            {/* CATEGORY */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="flex items-center gap-3 font-bold mb-6 text-lg uppercase text-gray-800">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaFilter className="text-orange-600" />
                </div>
                Categories
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    category === ""
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md"
                  }`}
                >
                  All Products
                </button>
                {categoriesList.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setCategory(cat.name)}
                    className={`w-full px-4 py-3 rounded-xl text-sm text-left font-medium transition-all duration-300 ${
                      category === cat.name
                        ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg transform scale-105"
                        : "bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* SORTING */}
            
          </aside>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3" data-aos="fade-left">
            <div className="flex items-center justify-between mb-8">
              <p className="text-lg text-gray-600 font-medium">
                Showing <span className="font-bold text-orange-600">{filteredProducts.length}</span> sacred items
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>✨</span>
                <span>Authentic Vedic Products</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-300 shadow-inner">
                <div className="text-6xl mb-4">🕉️</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="h-full transform hover:scale-105 transition-all duration-300"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ContactCTA />
    </section>
  );
}
