import React, { useState, useEffect } from "react";
import { fetchProduct } from "./../services/api";
import { useParams } from "react-router-dom";
import Loading from "./../components/Loading";
import "./Product.css"
function Product({
  addToCart,
  removeFromCart,
  inCart,
  onError
}) {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      onError(undefined);
      fetchProduct(productId).then((product) => {
        setProduct(product);
      })
      .catch(({ message }) =>
      onError({ message, retry: () => setRetry(!retry) })
    )
    .finally(() => setIsLoading(false));
  
  }, [productId,onError, retry]);

  const toggleCart = () => {
    if (inCart(product)) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };

  return (
    <div>
      {!isLoading ?
      <>
       {product && (
        <div className="content">
          <h2>Product</h2>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <button type="button" className="addToCart" onClick={toggleCart}>
            {inCart(product) ? "Remove to Cart -" : "Add to Cart +"}
          </button>
          <br />
          <br />
          <hr />
          <div className="price">
            <small>Price:</small> {product.price.toFixed(2)}€
          </div>
        </div>
     
  )}
    </>
  :<Loading /> }
  </div>
  )
       }
export default Product;

