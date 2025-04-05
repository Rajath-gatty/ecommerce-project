import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const About = () => {
  return (
    <>
      <Navbar />
      <section id="page-header" className="about-header">
        <h2>#knowUs</h2>
        <p>
          my name is adhithya this is a test site no database just style and
          html and a little bit of java script and a lot of free images{" "}
        </p>
      </section>

      <section id="about-head" className="section-p1">
        <img src="/img/about/a6.jpg" alt="" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Welcome to Adhi’s Shopping, your ultimate destination for
            trendsetting fashion, high-quality accessories, and unbeatable
            deals! We are more than just an online store – we’re a community of
            fashion lovers, bringing you the latest styles at the best prices.
            At Adhi’s Shopping, we believe that shopping should be effortless,
            exciting, and affordable. Our carefully curated Collections ensures
            that you always stay ahead of the trends, whether you're looking for
            everyday essentials or statement pieces. With secure payments, fast
            shipping, and a customer-first approach, we’re here to make your
            shopping experience smooth and enjoyable. Shop with confidence and
            let us bring style straight to your doorstep! 💖✨ 🚀 Shop Now. Save
            More. Stay Stylish!.
          </p>
        </div>
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
          <img src="img/features/t3.png" alt="" />
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
    </>
  );
};

export default About;
