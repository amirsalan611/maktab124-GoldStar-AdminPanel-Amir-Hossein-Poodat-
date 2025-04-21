import { BASE_URL } from "../../API/API";

export const DeleteProduct = async (productId: string) => {
  const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
    method: "DELETE",
  });
  console.log(response);
  return response.json();
};
