import { Link, useNavigate } from "react-router";
import { useAppStore } from "../store/auth.store";

const Navbar = () => {
  const user = useAppStore((state) => state.user);
  const token = useAppStore((state) => state.token);
  const logout = useAppStore((state) => state.logout);
  const setCart = useAppStore((state) => state.setCart);

  const route = useNavigate();

  const handleLogout = () => {
    logout();
    setCart([]); // Clear cart on logout
    route("/login");
  };

  return (
    <section id="header">
      <Link to="/">
        <img
          src="/img/logo.png"
          className="logo"
          alt="Adhi's Logo"
          style={{ width: "120px", height: "auto" }}
        />
      </Link>
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
          {!token && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && user.isAdmin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {user && (
            <li id="lg-bag">
              <Link to="/cart">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </Link>
            </li>
          )}
          {user && (
            <li
              id="account"
              style={{
                fontWeight: "bold",
                marginLeft: "10px",
                display: "flex",
                gap: "0.25rem",
                alignItems: "center",
                position: "relative",
              }}
              className="account-profile"
            >
              <div
                className="profile-container"
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* <img ... /> */}
                <div dangerouslySetInnerHTML={{ __html: user.avatar }} />
                <span>{user.name}</span>
                <button
                  className="logout-btn"
                  style={{
                    display: "none",
                    gap: "0.5rem",
                    position: "absolute",
                    top: "85%",
                    left: 0,
                    zIndex: 10,
                    color: "red",
                    background: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid #ccc",
                    padding: "6px 16px",
                    borderRadius: "4px",
                    marginTop: "4px",
                    cursor: "pointer",
                    minWidth: "100px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    pointerEvents: "auto",
                  }}
                  onClick={handleLogout}
                  tabIndex={0}
                >
                  Logout
                </button>
              </div>
            </li>
          )}
          <Link to="#" id="close">
            <i className="fa fa-times" aria-hidden="true"></i>
          </Link>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </Link>
        <i id="bar" className="fa fa-outdent" aria-hidden="true"></i>
      </div>
      <style>
        {`
          .profile-container:hover .logout-btn,
          .profile-container:focus-within .logout-btn {
            display: block !important;
          }
        `}
      </style>
    </section>
  );
};

export default Navbar;
