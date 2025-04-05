const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img
          src="img/logo.png"
          className="logo"
          alt="Adhi's Logo"
          style={{ width: "150px", height: "auto" }}
        />
        <h4>Contact</h4>
        <p>
          <strong>Address:</strong> SOME RANDOM ADRESS YOU CANNOT GET, India
        </p>
        <p>
          <strong>Phone:</strong> +91 9449032414
        </p>
        <p>
          <strong>Hours:</strong> 10:00 -10:00, Mon-Sat
        </p>
        <div className="follow">
          <h4>follow us</h4>
          <div className="icon">
            <i className="fa fa-facebook-square" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-twitter-square" aria-hidden="true"></i>
            <i className="fa fa-pinterest-p" aria-hidden="true"></i>
            <i className="fa fa-youtube-play" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="about.html">About us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="contact.html">Contact us </a>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <a href="login.html">Sign In</a>
        <a href="cart.html">View cart</a>
        <a href="cart.html">My Wishlist</a>
        <a href="#">Track My order</a>
        <a href="#"> Help </a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src="img/pay/app.jpg" alt="" />
          <img src="img/pay/play.jpg" alt="" />
        </div>
        <p>Secured Payment Gateways</p>
        <img src="img/pay/pay.png" alt="" />
      </div>

      <div className="copyright">
        <p>© adhithyans site</p>
      </div>
    </footer>
  );
};

export default Footer;
