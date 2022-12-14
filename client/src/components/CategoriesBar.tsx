import React, { Dispatch, SetStateAction, useState } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { ICategory } from "../http/categoryApi";
import {
  fetchProducts,
  getProductsByCategory,
  IProduct,
} from "../http/productApi";

interface CategoriesBarProps {
  categories: ICategory[];
  products: IProduct[];
  updateProducts: Dispatch<SetStateAction<IProduct[] | undefined>>;
}

const CategoriesBar = (props: CategoriesBarProps) => {
  const [selectedCategory, setSelectedCategory] = useState([0]);

  return (
    <ListGroup>
      {props.categories.map((c) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          key={c.id}
          disabled={c.productsCount === 0}
          active={selectedCategory[0] === c.id}
          className="d-flex justify-content-between"
          onClick={async () => {
            if (selectedCategory[0] === c.id) {
              setSelectedCategory([0]);
              const products = await fetchProducts();
              props.updateProducts(products);
            } else {
              selectedCategory[0] = c.id;
              const products = await getProductsByCategory(selectedCategory[0]);
              props.updateProducts(products);
            }
          }}
        >
          {c.title}
          <div className="d-flex flex-column">
            <Badge bg="secondary">{c.productsCount} шт.</Badge>
            <Badge bg="secondary" className="mt-2">
              {c.totalPrice} руб.
            </Badge>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CategoriesBar;
