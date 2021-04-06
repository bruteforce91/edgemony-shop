import Hero from "./../components/Hero";
import Footer from "./../components/Footer";
import React, { useState, useEffect } from "react";
import Loading from "./../components/Loading";
import WrapProducts from "./../components/WrapProducts";
import { fetchProducts, fetchCategories } from "./../services/api";

const fakeProducts = require("./../mocks/data/products.json");
const currentYear = new Date().getFullYear();
let cache;

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

function Home({ onError }) {
  /******logic fetch */
  const [dataAPI, setDataAPI] = useState(cache ? cache.products : []);
  const [categories, setCategories] = useState(cache?.categories || []);
  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(false);
  useEffect(() => {
    if (cache) {
      return;
    }
      setIsLoading(true);
      onError(undefined);
      Promise.all([fetchProducts(), fetchCategories()])
        .then(([products, categories]) => {
          setDataAPI(products);
          setCategories(categories);
          cache = { products, categories };
        })
        .catch(({ message }) =>
          onError({ message, retry: () => setRetry(!retry) })
        )
        .finally(() => setIsLoading(false));
    
  }, [retry, onError]);

  // function changeStateError() {
  //   setRetry=true;
  // }
  /********** END LOGIC FETCH********/

  return (
    <div className="App">
      {!isLoading ? (
        <>
          <>
            <Hero
              title={data.title}
              image={data.cover}
              description={data.description}
            />
            <WrapProducts products={dataAPI} />
            <Footer
              logo={data.logo}
              company={data.company}
              year={currentYear}
            />
          </>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
}

export default Home;
