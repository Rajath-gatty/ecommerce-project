import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../lib/util";
import { useAppStore } from "../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../queries/products";

const ProductCard = ({ product }) => {
  const cart = useAppStore((state) => state.cart);
  const user = useAppStore((state) => state.user);
  const token = useAppStore((state) => state.token);
  const setCart = useAppStore((state) => state.setCart);

  const route = useNavigate();

  // Check if product is in cart
  const isInCart = cart.some((item) => item._id === product._id);

  const { mutate: addToCartHttp } = useMutation({
    mutationFn: (cartItem) => {
      return addToCart(cartItem);
    },
  });

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

  return (
    <div className="pro">
      <Link to={"/products/" + product._id} style={{ textDecoration: "none" }}>
        <img
          src={import.meta.env.VITE_BACKEND_URL + "/" + product.image}
          alt=""
          width="250"
          style={{ height: "350px", objectFit: "cover" }}
        />
        <div className="des">
          <span>{product.company}</span>
          <h5>{product.title}</h5>
          <div className="star">
            {Array.from({ length: product.rating }).map((_, idx) => (
              <i className="fa fa-star" aria-hidden="true" key={idx}></i>
            ))}
          </div>
          <div className="price-container">
            {product?.discountedPrice ? (
              <>
                <span>₹{formatPrice(product.price)}</span>
                <h4>₹{formatPrice(product.discountedPrice)}</h4>
              </>
            ) : (
              <h4>₹{formatPrice(product.price)}</h4>
            )}
          </div>
        </div>
      </Link>
      {isInCart ? (
        <Link to="/cart">
          <i
            className="fa fa-check cart in-cart"
            aria-hidden="true"
            style={{ color: "green" }}
          ></i>
        </Link>
      ) : (
        <i
          className="fa fa-shopping-cart cart"
          onClick={handleAddToCart}
          aria-hidden="true"
        ></i>
      )}
    </div>
  );
};

export default ProductCard;
