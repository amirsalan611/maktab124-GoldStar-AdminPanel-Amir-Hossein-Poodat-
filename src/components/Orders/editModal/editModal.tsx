import Swal from "sweetalert2";
import { orderPageLocalization } from "../../../constants/Localization/Localization";
import { BASE_URL } from "../../../services/API/API";

export default async function EditModal(
  orderId: string,
  deliveryStatus: boolean,
  setShouldRefetch: (shouldRefetch: boolean) => void,
  shouldRefetch: boolean
) {
  const result = await Swal.fire({
    title: orderPageLocalization.editOrder,
    text: deliveryStatus
      ? orderPageLocalization.editOrderAlertNotSend
      : orderPageLocalization.editOrderAlertSend,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: orderPageLocalization.cancel,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: deliveryStatus
      ? orderPageLocalization.not
      : orderPageLocalization.yes,
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveryStatus: !deliveryStatus,
        }),
      });
      if (response.status === 200) {
        await Swal.fire({
          title: orderPageLocalization.succesTitle,
          text: orderPageLocalization.success,
          icon: "success",
        }).then(() => {
          setShouldRefetch(!shouldRefetch);
        });
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: orderPageLocalization.error,
        text: orderPageLocalization.errorAlert,
        icon: "error",
      });
    }
  }
}
