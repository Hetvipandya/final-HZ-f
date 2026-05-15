import { useState, useEffect } from "react";
import { getImageUrl } from "../../BASEURL";

export default function UserCarts() {
  const [userCarts, setUserCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ALL USER CARTS FROM LOCALSTORAGE
  useEffect(() => {
    const getAllUserCarts = () => {
      const carts = [];
      const allKeys = Object.keys(localStorage);

      allKeys.forEach((key) => {
        // Look for cart keys that follow the pattern "cartItems_*"
        if (key.startsWith("cartItems_") && key !== "cartItems_guest") {
          try {
            const cartItems = JSON.parse(localStorage.getItem(key));
            const email = key.replace("cartItems_", "");

            // Only add if cart has items
            if (cartItems && cartItems.length > 0) {
              const total = cartItems.reduce((sum, item) => {
                const itemPrice = item.discountPrice ?? item.price ?? 0;
                return sum + itemPrice * item.quantity;
              }, 0);

              carts.push({
                email,
                items: cartItems,
                total,
                itemCount: cartItems.length,
                cartKey: key,
              });
            }
          } catch (err) {
            console.error(`Error parsing cart for ${key}:`, err);
          }
        }
      });

      setUserCarts(carts.sort((a, b) => a.email.localeCompare(b.email)));
      setLoading(false);
    };

    getAllUserCarts();
  }, []);

  // 🔥 DELETE ENTIRE USER CART
  const deleteUserCart = (cartKey, email) => {
    if (window.confirm(`Delete cart for ${email}?`)) {
      localStorage.removeItem(cartKey);
      setUserCarts((prev) => prev.filter((cart) => cart.cartKey !== cartKey));
      alert(`Cart for ${email} has been deleted`);
    }
  };

  // 🔥 CLEAR SPECIFIC ITEM FROM CART
  const clearItemFromCart = (cartKey, itemId, email) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
      const updatedCart = cartItems.filter((item) => item._id !== itemId);

      if (updatedCart.length === 0) {
        localStorage.removeItem(cartKey);
        setUserCarts((prev) => prev.filter((cart) => cart.cartKey !== cartKey));
        alert(`Cart for ${email} is now empty and has been removed`);
      } else {
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setUserCarts((prev) =>
          prev.map((cart) =>
            cart.cartKey === cartKey
              ? {
                  ...cart,
                  items: updatedCart,
                  itemCount: updatedCart.length,
                  total: updatedCart.reduce((sum, item) => {
                    const itemPrice = item.discountPrice ?? item.price ?? 0;
                    return sum + itemPrice * item.quantity;
                  }, 0),
                }
              : cart
          )
        );
      }
    } catch (err) {
      console.error("Error clearing item:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-500">Loading user carts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Shopping Carts</h1>
        <p className="text-gray-600 mt-2">
          Total Users with Items: <span className="font-bold text-lg">{userCarts.length}</span>
        </p>
      </div>

      {userCarts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-500">No users have items in their carts</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userCarts.map((userCart) => (
            <div key={userCart.cartKey} className="bg-white rounded-lg shadow-md p-6">
              {/* USER HEADER */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-bold">{userCart.email}</h3>
                  <p className="text-sm text-gray-600">
                    {userCart.itemCount} item(s) | Total: ₹{userCart.total.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => deleteUserCart(userCart.cartKey, userCart.email)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete Cart
                </button>
              </div>

              {/* CART ITEMS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Image</th>
                      <th className="text-left p-3">Product</th>
                      <th className="text-center p-3">Quantity</th>
                      <th className="text-right p-3">Price</th>
                      <th className="text-right p-3">Subtotal</th>
                      <th className="text-center p-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userCart.items.map((item) => {
                      const itemPrice = item.discountPrice ?? item.price ?? 0;
                      return (
                        <tr key={item._id} className="border-b hover:bg-gray-50">
                          {/* IMAGE */}
                          <td className="p-3">
                            <img
                              src={getImageUrl(item.images?.[0] || item.image)}
                              className="w-12 h-12 object-cover rounded"
                              alt={item.name}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/50?text=No+Image";
                              }}
                            />
                          </td>

                          {/* PRODUCT NAME */}
                          <td className="p-3">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              {item.selectedSize && (
                                <p className="text-xs text-gray-600">Size: {item.selectedSize}</p>
                              )}
                            </div>
                          </td>

                          {/* QUANTITY */}
                          <td className="p-3 text-center">{item.quantity}</td>

                          {/* PRICE */}
                          <td className="p-3 text-right">₹{itemPrice.toFixed(2)}</td>

                          {/* SUBTOTAL */}
                          <td className="p-3 text-right font-semibold">
                            ₹{(itemPrice * item.quantity).toFixed(2)}
                          </td>

                          {/* DELETE BUTTON */}
                          <td className="p-3 text-center">
                            <button
                              onClick={() =>
                                clearItemFromCart(userCart.cartKey, item._id, userCart.email)
                              }
                              className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition text-xs font-semibold"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* TOTAL */}
              <div className="mt-4 pt-4 border-t flex justify-end">
                <div className="text-right">
                  <p className="text-gray-600">Cart Total</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ₹{userCart.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
