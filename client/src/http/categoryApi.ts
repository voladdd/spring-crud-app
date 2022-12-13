import { $host } from ".";

export interface ICategory {
  id: number;
  title: string;
  totalPrice: number;
  topPrices: number[];
}

export const fetchCategories = async (): Promise<ICategory[]> => {
  const { data } = await $host.get("/categories");
  return data;
};
