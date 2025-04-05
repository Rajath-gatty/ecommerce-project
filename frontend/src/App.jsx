import { Route, Routes } from "react-router";

import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import SignIn from "./pages/SignIn.jsx";
import Products from "./pages/products.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
      <Routes>
        <Route path="/products/:productId" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
