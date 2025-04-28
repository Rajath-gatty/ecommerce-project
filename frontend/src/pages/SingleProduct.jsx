import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Nav";
import { getSingleProduct } from "../queries/products";
import { useQuery } from "@tanstack/react-query";

const SingleProduct = () => {
  const param = useParams();
  const { isFetching, data } = useQuery({
    queryKey: ["products", param.productId],
    queryFn: async () => {
      const res = await getSingleProduct(param.productId);
      return res.data;
    },
  });

  if (isFetching) {
    return (
      <>
        <Navbar />
        <div class="loader-container">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <section id="prodetails" class="section-p1">
        <div class="single-pro-image">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${data.image}`}
            width="100%"
            id="MainImg"
            alt=""
          />

          {/* <div class="small-img-group">
            <div class="small-img-col">
              <img
                src="img/products/f3.avif"
                width="100%"
                class="small-img"
                alt=""
              />
            </div>

            <div class="small-img-col">
              <img
                src="img/products/f4.avif"
                width="100%"
                class="small-img"
                alt=""
              />
            </div>

            <div class="small-img-col">
              <img
                src="img/products/f2.avif"
                width="100%"
                class="small-img"
                alt=""
              />
            </div>

            <div class="small-img-col">
              <img
                src="img/products/f1.jpg"
                width="100%"
                class="small-img"
                alt=""
              />
            </div>
          </div> */}
        </div>

        <div class="single-pro-details">
          <h6>Home / {data.category}</h6>
          <h4>{data.title}</h4>
          <h2>₹{Intl.NumberFormat("en-IN").format(data.price)}</h2>
          <select>
            <option>Select Size</option>
            <option>XL</option>
            <option>XXL</option>
            <option>Small</option>
            <option>Large</option>
          </select>
          <input type="number" value="1" />
          <button
            class="normal"
            value="Add to cart"
            onclick="window.location.href='cart.html';"
          >
            Add To Cart{" "}
          </button>
          {data?.description && <h4>Products Details </h4>}
          <span>{data.description}</span>
        </div>
      </section>
      <FeaturedProducts />
      <section id="newletter" class="section-p1 section-m1">
        <div class="newtext">
          <h4>Sign Up For newletters</h4>
          <p>
            Get E-mail update about our latest shop and{" "}
            <span>special offers.</span>
          </p>
        </div>
        <div class="form">
          <input type="text" placeholder="Your email address" />
          <button class="normal">Sign Up</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SingleProduct;
