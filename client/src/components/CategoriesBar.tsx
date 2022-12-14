import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { ICategory } from "../http/categoryApi";

interface CategoriesBarProps {
  categories: ICategory[];
}

const CategoriesBar = (props: CategoriesBarProps) => {
  return (
    <ListGroup>
      {props.categories.map((c) => (
        <ListGroup.Item key={c.id} className="d-flex justify-content-between">
          {c.title}
          <Badge bg="secondary">{c.productsCount}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CategoriesBar;
