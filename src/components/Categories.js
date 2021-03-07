import React, { useState, useEffect } from "react";
import BtnCategory from "./BtnCategory";
import "./Categories.css";

function Categories({ products, changeProductsRender, productsActive }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [AllProductsToRender,setAllProductsToRender]=useState([])
  
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    fetch("https://fakestoreapi.com/products/categories",{
      signal: controller.signal
    })
      .then((response) => response.json())
      .then((res) => {
        setCategories(res);
        setLoading(false);
        console.log("categories", categories);
      });
      return () => {
        controller.abort();
      }; 
  }, []);

  return (
    !isLoading ? (
      <>
        <div className="navBarCategories">
          {/* <SearchProduct /> */}
          {categories.map((category) => {
            return (
              <>
               <BtnCategory
                 key={category}
                 category={category.toUpperCase()}
                 products={products}
                 productsActive={productsActive}
                 changeProductsRender={changeProductsRender}
                 setAllProductsToRender={setAllProductsToRender}
                 AllProductsToRender={AllProductsToRender}
               />
              </>
            );
          })}
          {/* {productsActive ?
            changeProductsRender(productsActive[0]):changeProductsRender(products)
          } */}
        </div>
      </>):<></>
    
  );
}

export default Categories;
