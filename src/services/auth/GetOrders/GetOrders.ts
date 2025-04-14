import axios from "axios";
import { BASE_URL } from "../../API/API";

export const GetOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/orders`);
    return response.data.data.orders;
  } catch (error) {
    throw error;
  }
};
