import axios from "axios";
import { BASE_URL } from "../../API/API";

export const GetProducts = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products`
    );
    return response.data.data.products;
  } catch (error) {
    throw error;
  }
};
