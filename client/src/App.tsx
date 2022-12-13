import React, { useEffect, useState } from "react";
import "./App.css";
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
      {products ? <Products products={products}></Products> : null}
    </div>
  );
}

export default App;
