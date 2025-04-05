import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const Login = () => {
  return (
    <>
      <Navbar />
      <section className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="form-container">
                <div className="form-btn">
                  <span onClick="login()">Sign in</span>
                  <span onClick="register()">Sign Up</span>
                  <hr id="Indicator" />
                </div>

                <form id="LoginForm">
                  <h3>Welcome Back!👋</h3>
                  <br />
                  <input type="text" placeholder="Username" />
                  <input type="password" placeholder="password" />
                  <br />
                  <a href="">Forgot password?</a> <br />
                  <button type="submit" className="btn">
                    Login
                  </button>
                  <br />
                  <a href="">
                    <u>Don't have an account? Sign Up</u>
                  </a>
                </form>

                <form id="RegForm">
                  <h3> Create new account</h3>
                  <br />
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Username"
                  />
                  <input type="email" autoComplete="off" placeholder="Email" />
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="password"
                  />
                  <button type="submit" className="btn">
                    Create Account
                  </button>
                  <br />
                  <a href="">
                    <u>Already have an account? Sign in</u>
                  </a>
                </form>
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
