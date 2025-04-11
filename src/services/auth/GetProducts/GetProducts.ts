import axios from "axios"
import { API_KEY, BASE_URL } from "../../API/API"

export const GetProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/records/carts`, {
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });
        return response.data
    } catch (error) {
        throw error
    }
}
