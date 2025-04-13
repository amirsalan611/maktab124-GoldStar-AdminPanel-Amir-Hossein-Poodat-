import axios from "axios"
import { API_KEY, BASE_URL } from "../../API/API"

export const GetProducts = async () => {
    try {
        const response = await axios.get(
          `${BASE_URL}/api/products?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`,
        );
        console.log(response.data.data.products);
        return response.data.data.products
    } catch (error) {
        throw error
    }
}
