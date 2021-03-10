import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
//import Products from "./components/Products";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";
import ErrorBanner from "./components/ErrorBanner";
//import NavBar from "./components/NavBar";
import WrapProducts from "./components/WrapProducts";
import { fetchProducts, fetchCatogories } from "./services/api";
import CartModal from "./components/CartModal";
import ProductModal from "./components/ProductModal";

const fakeProducts = require("./mocks/data/products.json");
const currentYear = new Date().getFullYear();

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
  const [dataAPI, setDataAPI] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isErrorAPI, setErrorAPI] = useState(false);
  const [retry, setRetry] = useState(false);
  const [cart, setCart] = useState([]);
  const [isOpenModalCart, setOpenModalCart] = useState(false);

  /***********MODAL LOGIC********* */
  const [productInModal, setProductInModal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openProductModal(product) {
    console.log(product);
    setProductInModal(product);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setTimeout(() => {
      setProductInModal(null);
    }, 500);
  }

  /***********END MODAL LOGIC****************** */
  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((res) => {
        const randomError = Math.random() > 0.5;
        if (!randomError) {
          setDataAPI(res);
          setLoading(false);
          setErrorAPI("");
        } else {
          throw new Error("API CALL ERROR!!");
        }
      })
      .catch((error) => {
        setErrorAPI(error.message);
        setLoading(false);
      });
  }, [retry]);

  useEffect(() => {
    setLoading(true);
    setErrorAPI("");
    Promise.all([fetchProducts(), fetchCatogories()])
      .then(([products, categories]) => {
        setDataAPI(products);
        //categories
      })
      .catch((err) => setErrorAPI(err.message))
      .finally(() => setLoading(false));
  }, [retry]);

  function changeStateError() {
    setRetry(!retry);
  }

  function openModalCart() {
    setOpenModalCart(true);
  }

  function closeModalCart() {
    setOpenModalCart(false);
  }

  return (
    <div className="App">
      <Header logo={data.logo} cart={cart} openModal={openModalCart} />
      {!isLoading ? (
        <>
          {!isErrorAPI && (
            <>
              <CartModal
                isOpen={isOpenModalCart}
                closeModal={closeModalCart}
                cart={cart}
              />
              <ProductModal
                isOpen={modalIsOpen}
                content={productInModal}
                closeModal={closeModal}
                //inCart={isInCart(productInModal)}
                //addToCart={addToCart}
                //removeFromCart={removeFromCart}
              />
              <Hero
                title={data.title}
                image={data.cover}
                description={data.description}
              />
              <WrapProducts products={dataAPI} openProductModal={openProductModal} />
              <Footer
                logo={data.logo}
                company={data.company}
                year={currentYear}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
      {isErrorAPI && (
        <ErrorBanner changeStateError={changeStateError} error={isErrorAPI} />
      )}
    </div>
  );
}

export default App;
