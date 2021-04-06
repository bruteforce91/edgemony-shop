import React from "react";
import "./CartProduct.css"
import {formatPrice} from "../services/utility"

function CartProduct({ product, removeFromCart, setProductQuantity }) {
  const { image, title, price, quantity, id } = product;
  const increment = () => setProductQuantity(id, quantity + 1);
  const decrement = () => setProductQuantity(id, quantity - 1);
  const remove = () => removeFromCart(id);
  return (
    <div>
      <img src={image} alt={image} />
      <h3>{title}</h3>
      <div className="wrapQuantity">
        <button onClick={decrement} disabled={quantity === 1}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>
      <h4 className="price"> {formatPrice(price)}</h4>
    </div>
  );
}

export default CartProduct;
