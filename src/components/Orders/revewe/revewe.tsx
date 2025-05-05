import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../services/API/API";
import { ordersLocalization, reviewLocalization } from "../../../constants/Localization/Localization";
import { order } from "./order";
import moment from "moment-jalaali";

const jalaliDate = (date: string | undefined) => {
  return date ? moment(date).locale("fa").format("jYYYY/jMM/jDD") : "-";
};

interface ReviewProps {
  orderId: string;
  reviewIsOpen: boolean;
  setReviewIsOpen: (reviewIsOpen: boolean) => void;
}

export default function Review({
  orderId,
  reviewIsOpen,
  setReviewIsOpen,
}: ReviewProps) {
  const [order, setOrder] = useState<order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`${BASE_URL}/api/orders/${orderId}`);
      setOrder(response.data.data.order);
      console.log(order);
    };
    fetchOrder();
  }, [reviewIsOpen]);
  return (
    <div
      className={`${
        reviewIsOpen ? "block" : "hidden"
      } absolute top-0 left-0 w-full h-full z-50`}
    >
      <div
        className="backdrop-blur-sm bg-black/50 absolute top-0 left-0 w-full h-full z-10"
        onClick={() => setReviewIsOpen(false)}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-1/2 max-h-2/3 bg-white rounded-xl flex flex-col gap-5 p-10">
        <h1 className="text-2xl font-bold text-center">
          {reviewLocalization.orderView}
        </h1>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2 ">
            <span className="flex items-center gap-2 border-l-2 border-gray-400 pl-2">
              <h2>{reviewLocalization.userName}</h2>
              <p>{order?.user.username}</p>
            </span>
            <span className="flex items-center gap-2 border-l-2 border-gray-400 pl-2">
              <h2>{reviewLocalization.phoneNumber}</h2>
              <p>{order?.user.phoneNumber}</p>
            </span>
            <span className="flex items-center gap-2 border-l-2 border-gray-400 pl-2">
              <h2>{reviewLocalization.deliveryDate}</h2>
              <p>{jalaliDate(order?.deliveryDate)}</p>
            </span>
            <span className="flex items-center gap-2">
              <h2>{reviewLocalization.deliveryStatus}</h2>
              <p>
                {order?.deliveryStatus
                  ? reviewLocalization.sent
                  : reviewLocalization.notSent}
              </p>
            </span>
          </div>
          <table className="w-full mt-5 border border-gray-200 text-center max-h-[450px] overflow-y-auto">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th>{reviewLocalization.product}</th>
                <th>{reviewLocalization.color}</th>
                <th>{reviewLocalization.count}</th>
                <th>{reviewLocalization.price}</th>
              </tr>
            </thead>
            <tbody>
              {order?.products?.map((product) => (
                <tr key={product._id} className="">
                  <td className="border border-gray-200 py-2">
                    {product.product.name}
                  </td>
                  <td className="border border-gray-200">{product.color}</td>
                  <td className="border border-gray-200">{product.count}</td>
                  <td className="border border-gray-200">
                    {product.product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
