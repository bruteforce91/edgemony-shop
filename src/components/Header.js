import PropTypes from "prop-types";
import "./Header.css";
import { Link } from "react-router-dom";

import HeaderCart from "./HeaderCart";
function Header({ logo, cart, openModal, totalCart, showCart  }) {
  return (
    <header className="Header">
      <Link to="/">
        <img className="Header__logo" src={logo} alt={logo} />
      </Link>
      {showCart ?
      <HeaderCart cart={cart} openModal={openModal} cartTotal={totalCart} />
      :null}
    </header>
  );
}

Header.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default Header;
