import axios from "axios";
import { API_KEY, BASE_URL } from "../../API/API";

async function getAdminBio() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        api_key: `${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error
    
  }
}

export default getAdminBio;
