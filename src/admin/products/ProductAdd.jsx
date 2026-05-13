import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../BASEURL";

export default function ProductAdd() {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || BASE_URL;
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [form, setForm] = useState({
    productName: "", 
    categoryId: "",
    price: "",
    rating: "",
    discountPrice: "", 
    description: "",
    isActive: true,
    images: "",
    isBestSeller: false,
    originalPrice: "",
    isSale: false,
    size: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/category`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data?.success === false) {
          throw new Error(data?.message || "Failed to load categories");
        }
        setCategories(data?.data || data || []);
      } catch (e) {
        toast.error(e?.message || "Failed to load categories");
      }
    };

    loadCategories();
  }, [backendUrl]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //console.log("FORM DATA:", form);
  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const images = String(form.images || "")
      .split(/[\n,]/g)
      .map((s) => s.trim())
      .filter(Boolean);

    const createdAt = new Date().toISOString().split("T")[0];

    try {
      const token = localStorage.getItem("adminToken");

      const fd = new FormData();
      fd.append("productName", form.productName);
      fd.append("price", String(Number(form.price)));
      fd.append("discountPrice", String(Number(form.discountPrice || form.price)));
      fd.append("rating", String(Number(form.rating || 0)));
      fd.append("categoryId", form.categoryId);
      fd.append("size", form.size);
      fd.append("description", form.description);
      fd.append("isActive", String(!!form.isActive));
      fd.append("isBestSeller", String(!!form.isBestSeller));
      fd.append("isSale", String(!!form.isSale));
      fd.append("createdAt", createdAt);

      // Append all selected images
      imageFiles.forEach((file) => {
        fd.append("images", file);
      });

      const res = await fetch(`${backendUrl}/api/product/create`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: fd,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.message || "Failed to add product");
      }

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.message || "Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white w-full  p-6 rounded shadow">

        <h3 className="text-xl font-heading font-bold mb-6 text-primary">
          Add Product
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}
          <div>
            <span className="font-bold">Name</span>
            <input
              name="productName"
              placeholder="Product Name"
              value={form.productName}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

         

          {/* PRICE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold">Price</span>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <div>
              <span className="font-bold">Discount Price</span>
              <input
                name="discountPrice"
                type="number"
                value={form.discountPrice}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>

          {/* STOCK + RATING */}
          <div className="grid grid-cols-2 gap-4">
            

            <div>
              <span className="font-bold">Rating</span>
              <input
                name="rating"
                type="number"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <span className="font-bold">Category</span>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c._id || c.id} value={c._id || c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* SIZE */}
          <div>
            <span className="font-bold">Size</span>
            <input
              name="size"
              placeholder="st"
              value={form.size}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <span className="font-bold">Description</span>
            <textarea
              name="description"
              placeholder="Product description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded min-h-[90px]"
              required
            />
          </div>

          {/* IMAGES */}
          
            <div className="mt-3">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setImageFiles(files);
                }}
                className="w-full"
              />
              {imageFiles.length ? (
                <p className="text-xs text-gray-600 mt-1">
                  {imageFiles.length} file(s) selected
                </p>
              ) : null}
            </div>
          

          {/* CHECKBOXES */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />
              Active
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={form.isBestSeller}
                onChange={handleChange}
              />
              Best Seller
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isSale"
                checked={form.isSale}
                onChange={handleChange}
              />
              On Sale
            </label>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 border rounded"
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
