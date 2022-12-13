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
