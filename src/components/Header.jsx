import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";

function Header() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart"));
  let cartLength = 0;

  if (cart) {
    cartLength = cart.length;
  }

  return (
    <header className="main-background-color">
      <div className="content-container" data-type="header-footer">
        <Link to={"/"}>
          <img className="image" src={logo} />
        </Link>

        <nav className="nav accent-color ">
          <NavLink
            to={"about"}
            className={({ isActive }) =>
              isActive
                ? "title-reg accent-color small-right-spacer hf-link-active"
                : "title-reg accent-color small-right-spacer hf-link"
            }
          >
            About
          </NavLink>
          <NavLink
            to={"products"}
            className={({ isActive }) =>
              isActive
                ? "title-reg accent-color small-right-spacer hf-link-active"
                : "title-reg accent-color small-right-spacer hf-link"
            }
          >
            Products
          </NavLink>
          <NavLink
            to={"checkout"}
            className={({ isActive }) =>
              isActive
                ? "title-reg accent-color small-right-spacer hf-link-active"
                : "title-reg accent-color small-right-spacer hf-link"
            }
          >
            Checkout {cartLength ? `(${cart.length})` : ""}
          </NavLink>
        </nav>

        {user ? (
          <Link to={"dashboard"}>
            <i className="accent-color fa-regular fa-user fa-3x"></i>
          </Link>
        ) : (
          <NavLink
            to={"login"}
            className={({ isActive }) =>
              isActive
                ? "title-reg accent-color hf-link-active"
                : "title-reg accent-color hf-link"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
