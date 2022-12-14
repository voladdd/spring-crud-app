import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import {
  fetchCategories,
  ICategory,
  postAddCategory,
} from "../http/categoryApi";
import {
  fetchProducts,
  IProduct,
  postAddCategoryToProduct,
  postCreateProduct,
} from "../http/productApi";

interface HeaderProps {
  onSetCreateProduct: Dispatch<SetStateAction<IProduct[] | undefined>>;
  updateCategory: Dispatch<SetStateAction<ICategory[] | undefined>>;
  categories: ICategory[];
  products: IProduct[];
}

const Header = (props: HeaderProps) => {
  const [productTitle, setProductTitle] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [productPrice, setProductPrice] = useState<number>();
  const [productId, setProductId] = useState(0);
  const [formCreateProduct, setFormCreateProduct] = useState<boolean>(false);
  const [formCreateCategory, setFormCreateCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home">Spring + React</Navbar.Brand>
        <NavDropdown
          title="Добавить"
          id="basic-nav-dropdown"
          className="align-self-end"
        >
          <NavDropdown.Item
            onClick={() => {
              setFormCreateProduct(true);
            }}
          >
            Добавить продукт
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setFormCreateCategory(true);
            }}
          >
            Добавить категорию
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          title="Фильтр"
          id="basic-nav-dropdown"
          className="align-self-end"
        >
          <NavDropdown.Item
            onClick={() => {
              props.onSetCreateProduct(
                [...props.products].sort((a, b) => b.price - a.price)
              );
            }}
          >
            Сначала дорогие
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              props.onSetCreateProduct(
                [...props.products].sort((a, b) => a.price - b.price)
              );
            }}
          >
            Сначала дешевые
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
            <Form.Group className="mb-3">
              <Form.Label>Категория</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setSelectedCategory(e.target.selectedIndex);
                }}
              >
                {props.categories.map((c) => (
                  <option key={c.id}>{c.title}</option>
                ))}
              </Form.Select>
            </Form.Group>
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
            onClick={async () => {
              await postCreateProduct(productTitle, productPrice);
              let dataProducts = await fetchProducts();
              const lastId = dataProducts
                .map((v) => v.id)
                .sort((a, b) => b - a)[0];
              console.log(lastId);
              await postAddCategoryToProduct(lastId, selectedCategory + 1);
              dataProducts = await fetchProducts();
              const categories = await fetchCategories();

              props.onSetCreateProduct(dataProducts);
              props.updateCategory(categories);

              setFormCreateProduct(false);
            }}
          >
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={formCreateCategory}
        onHide={() => setFormCreateCategory(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавление категории</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                placeholder="Название категории..."
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setFormCreateCategory(false)}
          >
            Закрыть
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await postAddCategory(categoryTitle);
              const categories = await fetchCategories();
              props.updateCategory(categories);
              setFormCreateCategory(false);
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
