import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { ICategory } from "../http/categoryApi";
import { fetchProducts, IProduct, postCreateProduct } from "../http/productApi";

interface HeaderProps {
  onSetCreateProduct: Dispatch<SetStateAction<IProduct[] | undefined>>;
}

const Header = (props: HeaderProps) => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [formCreateProduct, setFormCreateProduct] = useState<boolean>(false);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home">React + Spring</Navbar.Brand>
        <NavDropdown
          title="Добавить"
          id="basic-nav-dropdown"
          className="align-self-end"
        >
          <NavDropdown.Item
            href="#action/3.1"
            onClick={() => {
              setFormCreateProduct(true);
            }}
          >
            Добавить продукт
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">
            Добавить категорию
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
      <Modal
        show={formCreateProduct}
        onHide={() => setFormCreateProduct(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавление продукта</Modal.Title>
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
            {/* <Form.Group className="mb-3">
              <Form.Label>Категория</Form.Label>
              <Form.Select>
                {props.categories.map((c) => (
                  <option
                    key={c.id}
                    onSelect={() => setCategoryCreateProduct(c.id)}
                  >
                    {c.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setFormCreateProduct(false)}
          >
            Закрыть
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              postCreateProduct(productTitle, productPrice).then(() => {
                fetchProducts().then((date) => {
                  props.onSetCreateProduct(date);
                });
              });
              setFormCreateProduct(false);
            }}
          >
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;