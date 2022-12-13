import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import { fetchCategories, ICategory } from "./http/categoryApi";
import { fetchProducts, IProduct } from "./http/productApi";

function App() {
  const [products, setProducts] = useState<IProduct[]>();
  const [categories, setCategories] = useState<ICategory[]>();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  return (
    <div className="App">
      {products && categories ? (
        <>
          <Header
            onSetCreateProduct={setProducts}
            categories={categories}
          ></Header>
          <Products
            onSetCreateProduct={setProducts}
            products={products}
            categories={categories}
          ></Products>
        </>
      ) : (
        "Data not fetched..."
      )}
    </div>
  );
}

export default App;
