import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import CategoriesBar from "./components/CategoriesBar";
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
            updateCategory={setCategories}
            onSetCreateProduct={setProducts}
            categories={categories}
            products={products}
          ></Header>
          <Container>
            <Row>
              <Col>
                <CategoriesBar
                  updateProducts={setProducts}
                  products={products}
                  categories={categories}
                ></CategoriesBar>
              </Col>
              <Col xs="10">
                <Products
                  updateCategory={setCategories}
                  onSetCreateProduct={setProducts}
                  products={products}
                  categories={categories}
                ></Products>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        "Data not fetched..."
      )}
    </div>
  );
}

export default App;
