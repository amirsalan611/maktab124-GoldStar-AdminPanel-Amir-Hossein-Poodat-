import { BASE_URL } from "../../API/API";

export const DeleteOrder = async (orderId: string) => {
  const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
    method: "DELETE",
  });
  console.log(response);
  return response.json();
};
