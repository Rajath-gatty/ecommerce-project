import { Link } from "react-router";

const Navbar = () => {
  return (
    <section id="header">
      <a href="#">
        <img
          src="/img/logo.png"
          className="logo"
          alt="Adhi's Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </a>
      <div>
        <ul id="navbar">
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products">Shop</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li id="lg-bag">
            <Link href="/cart">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </Link>
          </li>
          <li id="account">
            <Link href="/login">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </Link>
          </li>
          <Link to="#" id="close">
            <i className="fa fa-times" aria-hidden="true"></i>
          </Link>
        </ul>
      </div>
      <div id="mobile">
        <a href="cart.html">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </a>
        <i id="bar" className="fa fa-outdent" aria-hidden="true"></i>
      </div>
    </section>
  );
};

export default Navbar;
