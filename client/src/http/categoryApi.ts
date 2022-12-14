import { $host } from ".";

export interface ICategory {
  id: number;
  title: string;
  totalPrice: number;
  productsCount: number;
  topPrices: number[];
}

export const fetchCategories = async (): Promise<ICategory[]> => {
  const { data } = await $host.get("/categories");
  return data;
};

export const postAddCategory = async (title: string): Promise<any> => {
  const response = await $host.post("/categories", { title });
  return response;
};
