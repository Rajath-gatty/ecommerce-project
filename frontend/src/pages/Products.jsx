
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../queries/products";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
const Products = () => {
  const filters = {
    limit: 10,
    page: 1,
  };
  const { isFetching, data } = useQuery({
    queryKey: ["products"],
    queryFn: async() => {
      const res = await getProducts(filters);
      return res.data;
    },
  });

  return (
    <div>
      <Navbar />
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      <section id="products1" className="section-p1">
        {isFetching ? (
          <div class="loader-container">
            <Loader />
          </div>
        ) : (
          <div className="pro-container">
            {data.data.map(product => {
              return <ProductCard product={product} key={product._id} />
            })

            }
          </div>
        )}
      </section>

      {/* <section id="pagination" className="section-p1">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
      </section> */}

      <section id="newletter" className="section-p1 section-m1">
        <div className="newtext">
          <h4>Sign Up For newletters</h4>
          <p>
            Get E-mail update about our latest shop and{" "}
            <span>special offers.</span>
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="Your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
