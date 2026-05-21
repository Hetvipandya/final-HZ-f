import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBoxOpen,
  FaTag,
  FaImage,
  FaAlignLeft, 
  FaStar,
} from "react-icons/fa";
import BASE_URL, { getImageUrl } from "../../BASEURL";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL || BASE_URL;

  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // LOAD PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/product/${id}`);
        const data = await res.json();

        const p = data?.product || data?.data || data;

        const imagesArr = Array.isArray(p?.images)
          ? p.images
          : p?.image
          ? [p.image]
          : [];

        setForm({
          name: p?.productName || p?.name || "",
          price: p?.price || "",
          discountPrice: p?.discountPrice || "",
          rating: p?.rating || "",
          categoryId:
            (typeof p?.categoryId === "string"
              ? p.categoryId
              : p?.categoryId?._id) || "",
          sizes: Array.isArray(p?.sizes)
            ? p.sizes.join(", ")
            : p?.sizes || p?.size || "",
          images: imagesArr,
          description: p?.description || "",
          isActive: p?.isActive ?? true,
          isBestSeller: !!p?.isBestSeller,
          isSale: !!p?.isSale,
        });
      } catch (err) {
        setErrorMessage("❌ Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  // LOAD CATEGORIES
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/category`);
        const data = await res.json();

        setCategories(data?.data || data || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadCategories();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Existing images (keep the string URLs)
      const existingImages = Array.isArray(form.images)
        ? form.images.filter(img => typeof img === 'string' && img.trim())
        : [];

      const sizes = String(form.sizes || "")
        .split(/[,\n]/g)
        .map((s) => s.trim())
        .filter(Boolean);

      // Create FormData for multipart/form-data
      const formData = new FormData();
      
      formData.append("productName", form.name);
      formData.append("price", Number(form.price));
      formData.append("discountPrice", Number(form.discountPrice || form.price));
      formData.append("rating", Number(form.rating));
      formData.append("categoryId", form.categoryId);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("description", form.description);
      formData.append("isActive", form.isActive);
      formData.append("isBestSeller", form.isBestSeller);
      formData.append("isSale", form.isSale);

      // Append existing images
      existingImages.forEach((img, index) => {
        formData.append(`existingImages[${index}]`, img);
      });

      // Append new image files
      imageFiles.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${backendUrl}/api/product/${id}`,
        {
          method: "PUT",
          headers: {
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setSuccessMessage("✅ Product updated successfully");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);

    } catch (err) {
      setErrorMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!form) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-black px-8 py-6">
          <h2 className="text-3xl font-bold text-white">
            Edit Product
          </h2>
          <p className="text-gray-300 mt-1 text-sm">
            Update your product details
          </p>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-7"
        >

          {/* ALERTS */}
          {successMessage && (
            <div className="bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded-xl">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* PRODUCT NAME */}
          <div>
            <label className="font-semibold mb-2 flex items-center gap-2">
              <FaBoxOpen />
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* PRICE */}
          <div className="grid md:grid-cols-3 gap-5">

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                ₹ Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <FaTag />
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <FaStar />
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="font-semibold mb-2">
              Category
            </label>

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
              required
            >
              <option value="">Select Category</option>

              {categories.map((c) => (
                <option
                  key={c._id || c.id}
                  value={c._id || c.id}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* SIZES */}
          <div>
            <label className="font-semibold mb-2">
              Sizes
            </label>

            <input
              type="text"
              name="sizes"
              value={form.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* IMAGES */}
          {/* IMAGES */}
<div>
  <label className="font-semibold mb-2 flex items-center gap-2">
    <FaImage />
    Product Images
  </label>


  {/* IMAGE PREVIEW */}
  {form.images && Array.isArray(form.images) && form.images.length > 0 && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {form.images.map((img, index) => (
          <div
            key={index}
            className="relative border rounded-2xl overflow-hidden bg-gray-100 h-32"
          >
            <img
              src={getImageUrl(img)}
              alt={`product-${index}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />

            {/* MAIN IMAGE TAG */}
            {index === 0 && (
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                Main
              </span>
            )}
          </div>
        ))}
    </div>
  )}

  {/* FILE INPUT */}
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) =>
      setImageFiles(Array.from(e.target.files || []))
    }
    className="mt-4"
  />

  {/* SELECTED FILE PREVIEW */}
  {imageFiles.length > 0 && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {imageFiles.map((file, index) => (
        <div
          key={index}
          className="border rounded-2xl overflow-hidden h-32 bg-gray-100"
        >
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )}
</div>

          {/* DESCRIPTION */}
       <div>
  <label className="font-semibold mb-2 flex items-center gap-2">
    <FaAlignLeft />
    Description
  </label>

  <ReactQuill
    theme="snow"
    value={form.description}
    onChange={(value) =>
      setForm((prev) => ({
        ...prev,
        description: value,
      }))
    }
    modules={{
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }}
    className="bg-white rounded-xl"
  />
</div>

          {/* CHECKBOXES */}
          <div className="flex flex-wrap gap-6">

            <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />
              Active
            </label>

            <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={form.isBestSeller}
                onChange={handleChange}
              />
              Best Seller
            </label>

            <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
              <input
                type="checkbox"
                name="isSale"
                checked={form.isSale}
                onChange={handleChange}
              />
              On Sale
            </label>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
