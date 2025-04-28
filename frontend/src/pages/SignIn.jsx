import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import React, { useState } from "react";

const SignIn = () => {
  const [activeTab, setActiveTab] = useState("login");

  // State for login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // State for register form
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setLoginError("");
    setRegisterError("");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!loginUsername || !loginPassword) {
      setLoginError("Please enter both username and password.");
      return;
    }
    setLoginError("");
    // ...handle login logic here...
    // Example: alert("Logged in!");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError("Please fill all fields.");
      return;
    }
    setRegisterError("");
    // ...handle registration logic here...
    // Example: alert("Account created!");
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
                    onClick={() => handleTabClick("login")}
                    style={{
                      borderBottom:
                        activeTab === "login" ? "4px solid #088178" : "none",
                      cursor: "pointer",
                      marginRight: 10,
                      paddingBottom: 16,
                    }}
                  >
                    Login
                  </span>
                  <span
                    onClick={() => handleTabClick("register")}
                    style={{
                      borderBottom:
                        activeTab === "register" ? "4px solid #088178" : "none",
                      cursor: "pointer",
                      paddingBottom: 16,
                    }}
                  >
                    Sign Up
                  </span>
                </div>

                {activeTab === "login" && (
                  <form id="LoginForm" onSubmit={handleLoginSubmit}>
                    <h3>Welcome Back!👋</h3>
                    <br />
                    <input
                      type="text"
                      placeholder="Username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      autoComplete="username"
                    />
                    <input
                      type="password"
                      placeholder="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <br />
                    <a href="">Forgot password?</a> <br />
                    {loginError && (
                      <div style={{ color: "red", marginBottom: 8 }}>
                        {loginError}
                      </div>
                    )}
                    <button type="submit" className="btn">
                      Login
                    </button>
                    <br />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTabClick("register");
                      }}
                    >
                      <u>Don't have an account? Sign Up</u>
                    </a>
                  </form>
                )}

                {activeTab === "register" && (
                  <form id="RegForm" onSubmit={handleRegisterSubmit}>
                    <h3> Create new account</h3>
                    <br />
                    <input
                      type="text"
                      autoComplete="username"
                      placeholder="Username"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    {registerError && (
                      <div style={{ color: "red", marginBottom: 8 }}>
                        {registerError}
                      </div>
                    )}
                    <button type="submit" className="btn">
                      Create Account
                    </button>
                    <br />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTabClick("login");
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

export default SignIn;
