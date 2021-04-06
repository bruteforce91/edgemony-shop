import "./App.css";
import Header from "./components/Header";
import React, { useState, useEffect, useCallback } from "react";

import calcTotalPrice from "./services/utility";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page404 from "./pages/Page404";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ErrorBanner from "./components/ErrorBanner";
import Checkout from "./pages/Checkout";
import OrderCompleted from "./pages/OrderCompleted";

import {
  fetchCart,
  fetchAddToCart,
  fetchDeleteItemFromCart,
} from "./services/api";

const fakeProducts = require("./mocks/data/products.json");
const currentYear = new Date().getFullYear();
let cartId;

const data = {
  title: "Edgemony Shop",
  description: "A fake e-commerce with a lot of potential",
  logo:
    "https://edgemony.com/wp-content/uploads/2020/03/cropped-Logo-edgemony_TeBIANCO-04.png",
  company: "SZH Inc.",
  cover:
    "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  products: fakeProducts,
};

function App() {
  /***** cart logic and order *****/
  const [newCart, setNewCart] = useState("");
  const [cart, setCart] = useState(undefined);
  const [order, setOrder] = useState([]);
  const [retry, setRetry] = useState(false);

  const cartTotal = calcTotalPrice(cart); //function imported

  function isInCart(product) {
    return product != null && cart?.items.find((p) => p.id === product.id) != null;
  }

  async function updateCart(fn, ...apiParams) {
    try {
      const cart = await fn(...apiParams);
      setCart(cart);
      return cart;
    } catch (error) {
      console.error(`${fn.name} API call response error! ${error.message}`);
    }
  }
  function addToCart(productId) {
    updateCart(fetchAddToCart, cartId, productId, 1);
  }
  function removeFromCart(productId) {
    updateCart(fetchDeleteItemFromCart, cartId, productId);
  }
  function setProductQuantity(productId, quantity) {
    updateCart(fetchAddToCart, cartId, productId, quantity);
  }
  // gestione errori
  const [isLoading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const cartError = apiErrors.cart;
  const errorKey = Object.keys(apiErrors).find((key) => apiErrors[key] != null);

  const setCartError = useCallback(
    (error) => setApiErrors((errors) => ({ ...errors, cart: error })),
    []
  );
  const setProductListError = useCallback(
    (error) => setApiErrors((errors) => ({ ...errors, productList: error })),
    []
  );
  const setProductError = useCallback(
    (error) => setApiErrors((errors) => ({ ...errors, product: error })),
    []
  );

  //fetch cart
  useEffect(() => {
    const cartIdFromLocalStorage = localStorage.getItem("edgemony-cart-id");
    if (!cartIdFromLocalStorage) {
      return;
    }
    setLoading(true);
    setCartError(undefined);
    async function fetchCartEffect() {
      try {
        const cartObj = await fetchCart(cartIdFromLocalStorage);
        setCart(cartObj);
        cartId = cartObj.id;
      } catch ({ message }) {
        setCartError({ message, retry: () => setRetry(!retry) });
      } finally {
        setLoading(false);
      }
    }
    fetchCartEffect();
  }, [retry, newCart, setCartError]);
  /*********end cart logic *******/

  return (
    <>
      <Router>
        <div className="App">
          <Header
            logo={data.logo}
            cart={cart}
            totalCart={cartTotal}
            showCart={!isLoading && !cartError}
          />
        </div>
        <Switch>
          <Route exact path="/">
            <Home onError={setProductListError}></Home>
          </Route>
          <Route path="/products/:productId">
            <Product
              inCart={isInCart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              onError={setProductError}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              products={cart}
              removeFromCart={removeFromCart}
              setProductQuantity={setProductQuantity}
              totalPrice={cartTotal}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cartId={cartId}
              setNewCart={setNewCart}
              setOrder={setOrder}
              order={order}
              onError={setProductError}
            />
          </Route>
          <Route path="/order-completed/:orderId">
            <OrderCompleted order={order} />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>

        {errorKey ? (
          <ErrorBanner
            message={apiErrors[errorKey].message}
            close={() => setApiErrors({ ...apiErrors, [errorKey]: undefined })}
            retry={apiErrors[errorKey].retry}
          />
        ) : null}
      </Router>
    </>
  );
}

export default App;
