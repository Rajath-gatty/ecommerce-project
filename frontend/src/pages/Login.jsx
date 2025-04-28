import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import { login, signIn } from "../queries/auth";
// Add your user store import here, e.g.:
import { useAppStore } from "../store/auth.store"; // adjust path as needed
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useNavigation } from "react-router-dom";

const Login = () => {
  // Tab state: "login" or "signup"
  const [activeTab, setActiveTab] = useState("login");

  // Login form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signupErrors, setSignupErrors] = useState({});

  const setCart = useAppStore((state) => state.setCart); // <-- Add this line
  const route = useNavigate(); // Use useNavigate for navigation
  // Validation helpers
  const validateLogin = () => {
    const errors = {};
    if (!loginData.email.trim()) errors.email = "Username is required";
    if (!loginData.password) errors.password = "Password is required";
    return errors;
  };

  const validateSignup = () => {
    const errors = {};
    if (!signupData.name.trim()) errors.name = "name is required";
    if (!signupData.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signupData.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }
    return errors;
  };

  const { isPending: isSignUpPending, mutate: signUpHttp } = useMutation({
    mutationFn: () => {
      return signIn(signupData);
    },
  });
  const { isPending: isLoginPending, mutate: loginHttp } = useMutation({
    mutationFn: () => {
      return login(loginData); // Use login for login
    },
  });

  // Handlers
  const handleTab = (tab) => {
    setActiveTab(tab);
    setLoginErrors({});
    setSignupErrors({});
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const appStore = useAppStore(); // adjust if your store is different

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    setLoginErrors(errors);
    if (Object.keys(errors).length === 0) {
      loginHttp(undefined, {
        onSuccess: (data) => {
          if (data) {
            appStore.login({ user: data.user, token: data.accessToken });
            const updatedCart = data.user.cart.map((item) => {
              return {
                ...item.productId,
                quantity: item.quantity,
              };
            });
            setCart(updatedCart);
            route("/");
          }
        },
        onError: () => {
          setLoginErrors((prev) => ({
            ...prev,
            password: "Invalid username or password",
          }));
        },
      });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignup();
    setSignupErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Submit signup logic here
      signUpHttp(undefined, {
        onSuccess: () => {
          setSignupData({ name: "", email: "", password: "" });
          setActiveTab("login");
        },
      });
    }
  };

  return (
    <>
      <Navbar />
      <section className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="form-container">
                <div className="form-btn">
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: activeTab === "login" ? "bold" : "normal",
                    }}
                    onClick={() => handleTab("login")}
                  >
                    Login
                  </span>
                  <span
                    style={{
                      marginLeft: 20,
                      cursor: "pointer",
                      fontWeight: activeTab === "signup" ? "bold" : "normal",
                    }}
                    onClick={() => handleTab("signup")}
                  >
                    Sign Up
                  </span>
                  <hr
                    id="Indicator"
                    style={{
                      width: "50%",
                      marginLeft: activeTab === "login" ? "0%" : "50%",
                      transition: "margin-left 0.3s",
                    }}
                  />
                </div>

                {/* Login Form */}
                {activeTab === "login" && (
                  <form id="LoginForm" onSubmit={handleLoginSubmit} noValidate>
                    <h3>Welcome Back!👋</h3>
                    <br />
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      autoComplete="email"
                    />
                    {loginErrors.email && (
                      <p
                        style={{
                          color: "red",
                          fontSize: 12,
                          textAlign: "left",
                          margin: "2px 0px 8px 0px",
                        }}
                      >
                        {loginErrors.email}
                      </p>
                    )}
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      autoComplete="current-password"
                    />
                    {loginErrors.password && (
                      <p
                        style={{
                          color: "red",
                          fontSize: 12,
                          textAlign: "left",
                          margin: "2px 0px 8px 0px",
                        }}
                      >
                        {loginErrors.password}
                      </p>
                    )}
                    <br />

                    <button
                      onClick={handleLoginSubmit}
                      type="submit"
                      className="btn"
                    >
                      {isLoginPending ? "Loading..." : "Login"}
                    </button>
                    <br />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTab("signup");
                      }}
                    >
                      <u>Don't have an account? Sign Up</u>
                    </a>
                  </form>
                )}

                {/* Signup Form */}
                {activeTab === "signup" && (
                  <form id="RegForm" onSubmit={handleSignupSubmit} noValidate>
                    <h3>Create new account</h3>
                    <br />
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      placeholder="name"
                      value={signupData.name}
                      onChange={handleSignupChange}
                    />
                    {signupErrors.name && (
                      <div
                        className=""
                        style={{
                          color: "red",
                          fontSize: 12,
                          textAlign: "left",
                        }}
                      >
                        {signupErrors.name}
                      </div>
                    )}
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                    />
                    {signupErrors.email && (
                      <div
                        className=""
                        style={{
                          color: "red",
                          fontSize: 12,
                          textAlign: "left",
                        }}
                      >
                        {signupErrors.email}
                      </div>
                    )}
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                    />
                    {signupErrors.password && (
                      <div
                        style={{
                          color: "red",
                          fontSize: 12,
                          textAlign: "left",
                        }}
                      >
                        {signupErrors.password}
                      </div>
                    )}
                    <button
                      onClick={handleSignupSubmit}
                      type="submit"
                      className="btn"
                    >
                      {isSignUpPending ? "Loading..." : "Sign Up"}
                    </button>
                    <br />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTab("login");
                      }}
                    >
                      <u>Already have an account? Sign in</u>
                    </a>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
