import { Route, Routes, useNavigate } from "react-router";
import { useLayoutEffect } from "react";
import { useAppStore } from "./store/auth.store";

import Home from "./pages/home.jsx";
import Products from "./pages/products.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import { me } from "./queries/auth.js";
import { useMutation } from "@tanstack/react-query";

function App() {
  // get the token and user data from local storage and set to store
  const setTokenUser = useAppStore((state) => state.setTokenUser);
  const token = useAppStore((state) => state.token);
  const setCart = useAppStore((state) => state.setCart);

  const { mutate: getUser } = useMutation({
    mutationFn: (t) => {
      return me(t); // Use login for login
    },
  });

  const route = useNavigate();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setTokenUser({ token, user: JSON.parse(user) });
      getUser(token, {
        onSuccess: (data) => {
          const updatedCart = data.user.cart.map((item) => {
            return {
              ...item.productId,
              quantity: item.quantity,
            };
          });
          setCart(updatedCart);
        },
      });
    } else {
      route("/login");
    }
  }, [setTokenUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {!token && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Routes>
        <Route path="/products" exact element={<Products />} />
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {token && (
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
      <Routes>
        <Route path="/products/:productId" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
