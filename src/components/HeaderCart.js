import { Link } from "react-router-dom";
import { formatPrice } from "../services/utility";
import "./HeaderCart.css"
export default function HeaderCart({ cart, cartTotal }) {
  console.log("cartTotal", cartTotal);
  console.log("cart", cart);
  const nItems = cart?.items.length;
  console.log("nItems", nItems);
  return (
    <div className="HeaderCart">
      {!!nItems && (
        <span id="totalPrice">Total Price: € {formatPrice(cartTotal)}</span>
      )}
      <button type="button">
        <Link to="/cart" className="link">
          <i id="icon-cart" class="fa fa-shopping-cart"></i>
        </Link>
          <span id="numItemsCart">{nItems}</span>
      </button>
    </div>
  );
}
