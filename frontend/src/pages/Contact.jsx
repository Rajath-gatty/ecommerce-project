import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section id="page-header" className="about-header">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency loction or Contact us today</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <p>somewhere unknown, deep jungle, tulunadu 575022</p>
            </li>
            <li>
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
              <p>adhiis@mail.com</p>
            </li>
            <li>
              <i className="fa fa-phone" aria-hidden="true"></i>
              <p>memeteam@mail.com</p>
            </li>
            <li>
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              <p>Monday to Saturday 9.00am to 9.00pm</p>
            </li>
          </div>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4408782375626!2d74.83878437507485!3d12.879347887427564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a44fb7c5407%3A0xe807789db0e8face!2sShri%20Dharmasthala%20Manjunatheshwara%20College%20Of%20Business%20Management!5e0!3m2!1sen!2sin!4v1740500780334!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section id="form-details">
        <form action="">
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Subject" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Your MESSAGE"
          ></textarea>
          <button className="normal">submit</button>
        </form>
        <div className="people">
          <div>
            <img src="img/people/1.jpg" alt="" />
            <p>
              <span>sajan stick</span>Senior Marketing Manger <br /> phone no
              +91 6282 472 898
              <br />
              Email:bhoju@mail.com
            </p>
          </div>
          <div>
            <img src="img/people/2.jpg" alt="" />
            <p>
              <span>gaurav gawar</span>sales guy <br /> phone no +91 99165 75461{" "}
              <br />
              Email:gauru@mail.com
            </p>
          </div>
          <div>
            <img src="img/people/4.jpg" alt="" />
            <p>
              <span>shijin pijin</span>delivery manager <br /> phone no +91
              97467 53824 <br />
              Email:shijin@mail.com
            </p>
          </div>
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

export default Contact;
