import axios from "axios";
import { BASE_URL } from "../../API/API";

export const LoginAdmin = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        username,
        password,
      },
    );
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
