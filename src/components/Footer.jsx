import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-color">
      <div className="content-container" data-type="header-footer">
        <Link to="/" className="white text hf-link">
          Kling-Wolf Camera Co.
        </Link>

        <nav>
          <a href="https://github.com/tylerjgreen22">
            <i className="fa-brands fa-github fa-2x white small-right-spacer"></i>
          </a>
          <a href="https://www.linkedin.com/in/tyler-green-b21767244/">
            <i className="fa-brands fa-linkedin fa-2x white"></i>
          </a>
        </nav>

        <Link to="/about" className="white text hf-link">
          Contact Us
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
