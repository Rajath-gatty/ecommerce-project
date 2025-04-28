import React from "react";
import { useAppStore } from "../store/auth.store";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import { formatPrice } from "../lib/util";

const Cart = () => {
  const cart = useAppStore((state) => state.cart);
  const setCart = useAppStore((state) => state.setCart); // <-- Add this line
  const token = useAppStore((state) => state.token);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = () => {
    if (!token) {
      route("/login");
    } else {
      const cartItem = {
        productId: product._id,
        userId: user._id,
        quantity: 1,
      };

      addToCartHttp(cartItem);
      // Update local cart state: increment quantity if exists, else add new
      const existingIndex = cart.findIndex((item) => item._id === product._id);
      if (existingIndex !== -1) {
        const updatedCart = cart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  // Increment quantity handler
  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrement quantity handler
  const handleDecrement = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Optionally remove if quantity is 0
    setCart(updatedCart);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 24, background: "#fff" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "40px auto",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th align="left">Product</th>
                    <th align="right">Price</th>
                    <th align="right">Quantity</th>
                    <th align="right">Total</th>
                    <th align="right" style={{ width: 100 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}${
                            item.image
                          }`}
                          alt={item.name}
                          style={{ width: 50, marginRight: 16, marginTop: 8 }}
                        />
                        <span>{item.title}</span>
                      </td>
                      <td align="right">
                        ₹{formatPrice(item.price.toFixed(2))}
                      </td>
                      <td align="right">
                        <button
                          style={{
                            border: "none",
                            background: "#eee",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            cursor: "pointer",
                            marginRight: 4,
                          }}
                          onClick={() => handleDecrement(item._id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                        <button
                          style={{
                            border: "none",
                            background: "#eee",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            cursor: "pointer",
                            marginLeft: 4,
                          }}
                          onClick={() => handleIncrement(item._id)}
                        >
                          +
                        </button>
                      </td>
                      <td align="right">
                        ₹{formatPrice((item.price * item.quantity).toFixed(2))}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <i
                          className="fa fa-trash"
                          style={{ color: "red", opacity: 0.5 }}
                          aria-hidden="true"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: "right", marginTop: 24 }}>
                <h3> Total: ₹{formatPrice(getTotal().toFixed(2))}</h3>
                {/* <button
                  style={{
                    padding: "10px 24px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    marginTop: 12,
                  }}
                  // onClick={handleCheckout} // Add functionality as needed
                >
                  Proceed to Checkout
                </button> */}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
