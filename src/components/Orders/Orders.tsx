import { useEffect, useState } from "react";
import { ordersLocalization } from "../../constants/Localization/Localization";
import { GetOrders } from "../../services/auth/GetOrders/GetOrders";
import MuiTable from "../shared/Table/Table";

interface Column {
  key: string;
  label: string;
}
interface table {
  orders: any[];
  columns: Column[];
}

export default function Orders() {
  const [tableData, setTableData] = useState<table>({
    orders: [],
    columns: [
      { key: "user", label: ordersLocalization.user },
      { key: "totalPrice", label: ordersLocalization.totalPrice },
      { key: "deliveryDate", label: ordersLocalization.deliveryDate },
      { key: "deliveryStatus", label: ordersLocalization.deliveryStatus },
      { key: "action", label: ordersLocalization.action },
    ],
  });

  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [handlePage, setHandelPage] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGetOrders = async () => {
      try {
        const orders = await GetOrders();
        console.log(orders)
        setAllOrders(orders);
        setTableData((prev) => ({
          ...prev,
          orders: orders,
        }));
        setHandelPage({ ...handlePage, loading: false });
      } catch (error) {
        console.log(error);
        setHandelPage({ ...handlePage, loading: false, error: true });
      }
    };
    fetchGetOrders();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    const filteredOrders = allOrders.filter((order: any) =>
      order.user?.username?.toLowerCase().includes(value.toLowerCase())
    );

    setTableData((prev) => ({
      ...prev,
      orders: filteredOrders,
    }));
  };

  const handleDelete = () => {};
  const handleedit = () => {};

  return (
    <div className="p-10 pt-2 w-full h-full">
      <div className="flex flex-col items-center">
        <div className="flex items-center w-full gap-5 px-10">
          <p className="text-3xl text-center">{ordersLocalization.orders}</p>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="border w-[350px] border-gray-400 outline-none rounded-md my-5 py-2 px-5"
            placeholder="search by user name"
          />
        </div>
        <MuiTable
          data={tableData.orders}
          columns={tableData.columns}
          onDelete={handleDelete}
          onEdit={handleedit}
        />
      </div>
    </div>
  );
}
