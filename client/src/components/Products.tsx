import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { fetchCategories, ICategory } from "../http/categoryApi";
import {
  deleteProduct,
  fetchProducts,
  IProduct,
  putUpdateProduct,
} from "../http/productApi";

interface ProductsProps {
  onSetCreateProduct: Dispatch<SetStateAction<IProduct[] | undefined>>;
  updateCategory: Dispatch<SetStateAction<ICategory[] | undefined>>;
  products: IProduct[];
  categories: ICategory[];
}

const Products = (props: ProductsProps) => {
  const [formChangeProduct, setFormChangeProduct] = useState<boolean>(false);
  const [productId, setProductId] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <Card>
      <CardGroup>
        {props.products.map((p) => (
          <Card key={p.id}>
            <Card.Header>
              <h3>ПРОДУКТ #{p.id}</h3>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setProductTitle(p.title);
                  setProductPrice(p.price);
                  setProductId(p.id);
                  setSelectedCategory(p.categories[0].id);
                  setFormChangeProduct(true);
                }}
              >
                Изменить
              </Button>
            </Card.Header>
            <Card.Body>
              {p.title} <br />
              {p.price} руб.
            </Card.Body>
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
      <Modal
        show={formChangeProduct}
        onHide={() => setFormChangeProduct(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Изменение продукта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                placeholder="Название продукта..."
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                placeholder="Цена продукта..."
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Категория</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setSelectedCategory(e.target.selectedIndex);
                }}
              >
                {props.categories.map((c) => (
                  <option key={c.id} selected={c.id === selectedCategory}>
                    {c.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={async () => {
              await deleteProduct(productId);
              fetchProducts().then((data) => {
                props.onSetCreateProduct(data);
              });
              const categories = await fetchCategories();
              props.updateCategory(categories);
              setFormChangeProduct(false);
            }}
          >
            Удалить
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await putUpdateProduct(
                productId,
                productTitle,
                productPrice,
                selectedCategory + 1
              );
              fetchProducts().then((data) => {
                props.onSetCreateProduct(data);
              });
              fetchCategories().then((data) => {
                props.updateCategory(data);
              });
              setFormChangeProduct(false);
            }}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Products;
