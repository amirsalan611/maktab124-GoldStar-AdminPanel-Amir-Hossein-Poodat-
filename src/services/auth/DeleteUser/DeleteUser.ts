import { BASE_URL } from "../../API/API";

export const DeleteUser = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: "DELETE",
  });
  console.log(response);
  return response.json();
};
