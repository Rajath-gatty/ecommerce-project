import { Link } from "react-router";
import Navbar from "../components/Nav";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrivals from "../components/NewArrivals";
import Footer from "../components/Footer";

const Home = () => {

  return (
    <div>
      <Navbar />
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button>
          <Link to="/products">Shop Now</Link>
        </button>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src="/img/features/t1.png" alt="" />
          <h6>Free shipping</h6>
        </div>

        <div className="fe-box">
          <img src="/img/features/t2.png" alt="" />
          <h6>Save Time</h6>
        </div>

        <div className="fe-box">
          <img src="/img/features/t3.png" alt="" />
          <h6>Save Money</h6>
        </div>

        <div className="fe-box">
          <img src="/img/features/t4.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src="/img/features/t5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>

        <div className="fe-box">
          <img src="/img/features/t6.png" alt="" />
          <h6>F24/7 Support</h6>
        </div>
      </section>

      <FeaturedProducts />

      <section id="banner" className="section-m1">
        <h4>Repair Services</h4>
        <h2>
          Up to<span> 70% Off</span>-All t-Shirt & Accessories
        </h2>
        <button className="normal" onclick="location.href='shop.html'">
          Explore more
        </button>
      </section>

      <NewArrivals />

      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>Crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best classNameic dress is on sale at ADHIS</span>
          <button className="white" onclick="location.href='shop.html'">
            Learn More
          </button>
        </div>
        <div className="banner-box banner-box2">
          <h4>spring/summer</h4>
          <h2>Upcomming season</h2>
          <span>the best clothes you would find</span>
          <button className="white" onclick="location.href='shop.html'">
            Collections
          </button>
        </div>
      </section>

      <section id="banner3">
        <div className="banner-box" onclick="window.location.href='shop.html';">
          <h2>Seasonal sale</h2>
          <h3>Winter Collections -50% Off</h3>
        </div>
        <div
          className="banner-box banner-box2"
          onclick="window.location.href='shop.html';"
        >
          <h2>Seasonal sale</h2>
          <h3>Winter Collections -50% Off</h3>
        </div>
        <div
          className="banner-box banner-box3"
          onclick="window.location.href='shop.html';"
        >
          <h2>Seasonal sale</h2>
          <h3>Winter Collections -50% Off</h3>
        </div>
      </section>

      <section id="newletter" className="section-p1 section-m1">
        <div className="newtext">
          <h4>Sign Up For newletters</h4>
          <p>
            Get E-mail update about our latest shop and
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

export default Home;
