import axios from "axios";
import { BASE_URL } from "../../API/API";

export const GetUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.users;
  } catch (error) {
    throw error;
  }
};
