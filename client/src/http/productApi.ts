import { $host } from ".";
import { ICategory } from "./categoryApi";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  categories: ICategory[];
}

export const fetchProducts = async (): Promise<IProduct[]> => {
  const { data } = await $host.get("/products");
  return data;
};

export const deleteProduct = async (id: number): Promise<any> => {
  const { data } = await $host.delete(`/products/${id}`);
  return data;
};

export const postCreateProduct = async (
  title: string = "",
  price: number = 1
): Promise<any> => {
  const response = await $host.post(`/products`, {
    title,
    price,
  });
  return response;
};

export const postAddCategoryToProduct = async (
  id: number,
  categoryId: number
): Promise<any> => {
  const response = await $host.post(
    `/products/${id}/category?categoryId=${categoryId}`
  );
  return response;
};

export const putUpdateProduct = async (
  id: number,
  title: string = "",
  price: number = 1,
  categoryId: number
): Promise<any> => {
  await $host.put(`/products/${id}?title=${title}&price=${price}`);
  const response = await postAddCategoryToProduct(id, categoryId);
  return response;
};
