import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BASE_URL, { getImageUrl } from "../../BASEURL";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = process.env.REACT_APP_BACKEND_URL || BASE_URL;

  // 🔥 FETCH PRODUCTS
  useEffect(() => { 
    fetchProducts();
  }, [location]); 

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/product/all`);

      const data = await res.json();

      console.log("API RESPONSE:", data);

      // ✅ HANDLE DIFFERENT RESPONSE STRUCTURES
      const productList =
        Array.isArray(data)
          ? data
          : data.products ||
            data.data ||
            data.data?.products ||
            [];

      setProducts(Array.isArray(productList) ? productList : []);
    } catch (error) {
      console.error("FETCH ERROR:", error);
      toast.error("Failed to fetch products");
    }
  };

  // 🗑️ DELETE PRODUCT
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${backendUrl}/api/product/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      // ✅ REMOVE FROM UI
      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("DELETE ERROR:", error);
      toast.error(error.message || "Failed to delete");
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Products
        </h2>

        <Link
          to="/admin/products/add"
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50"
                >

                  {/* IMAGE */}
                  <td className="p-3">
                    <img
                      src={
                        getImageUrl(
                          product.images?.[0] || product.image,
                          "https://via.placeholder.com/60?text=No+Image"
                        )
                      }
                      alt={product.productName || "Product"}
                      className="w-14 h-14 object-cover rounded border"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/60?text=No+Image";
                      }}
                    />
                  </td>

                  {/* PRODUCT NAME */}
                  <td className="p-3 font-semibold">
                    {product.productName || "N/A"}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-3 capitalize">
                    {product.categoryId?.name ||
                      product.category?.name ||
                      product.category ||
                      "No Category"}
                  </td>

                  {/* PRICE */}
                  <td className="p-3 font-semibold text-primary">
                    ₹{product.price || 0}
                  </td>

                  {/* RATING */}
                  <td className="p-3">
                    ⭐ {product.rating || 0}
                  </td>

                  {/* DESCRIPTION */}
                  <td className="p-3 text-gray-600 max-w-[250px] truncate">
                    {product.description || "No description"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    <div className="flex justify-center gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/products/edit/${product._id}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
