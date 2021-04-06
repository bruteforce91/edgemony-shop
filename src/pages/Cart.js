import React from "react";
import CartProduct from "./../components/CartProduct";
import "./../components/CartModal.css";
import { Link } from "react-router-dom";
import "./Cart.css";
import Loading from "./../components/Loading";

import { formatPrice } from "../services/utility";

function Cart({
  products,
  removeFromCart,
  setProductQuantity,
  totalPrice,
  isLoading,
}) {
  console.log("products", products);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="Cart">
      <h2>Cart</h2>
      {products?.items.length > 0 ? (
        <>
          {products.items.map((product) => {
            console.log("product", product);
            return (
              <>
                <CartProduct
                  key={product.id}
                  product={product}
                  removeFromCart={removeFromCart}
                  setProductQuantity={setProductQuantity}
                />
              </>
            );
          })}
          <strong>Total: {formatPrice(totalPrice.toFixed(2))}</strong>
          <div className="wrapCheckout">
            <button className="btnCheckout">
              <Link to="/checkout">Go to Checkout</Link>
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="Cart__content__empty">The cart is empty</p>
        </>
      )}
    </div>
  );
}

export default Cart;
