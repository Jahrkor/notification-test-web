import { Category, CategoryServerResponse } from "../models/interfaces.ts";

export const categoryServices = {
  fetchCategories: async (): Promise<Category[] | []> => {
    try {
      const response = await fetch("http://localhost:3000/v1/categories");
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      const categoryServerResponse: CategoryServerResponse =
        await response.json();
      return categoryServerResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
};
