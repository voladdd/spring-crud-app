import React, { useState } from "react";
import { Card, CardGroup, ListGroup } from "react-bootstrap";
import { IProduct } from "../http/productApi";

interface ProductsProps {
  products: IProduct[];
}

const Products = (props: ProductsProps) => {
  return (
    <Card>
      <CardGroup>
        {props.products.map((p) => (
          <Card key={p.id}>
            <Card.Header>
              <h4>{p.title}</h4>
            </Card.Header>
            <Card.Body>{p.price} руб.</Card.Body>
            <ListGroup horizontal>
              {p.categories.map((c) => (
                <ListGroup.Item variant="primary" key={c.id}>
                  {c.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ))}
      </CardGroup>
    </Card>
  );
};

export default Products;
