import axios from "axios";
import { API_KEY, BASE_URL } from "../../API/API";

export const LoginAdmin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/login`,
      {
        email,
        password,
      },
      {
        headers: {
          api_key: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
