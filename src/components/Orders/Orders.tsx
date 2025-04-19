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
export interface datatype {
  _id: string;
  user: User;
  products?: ProductsEntity[] | null;
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ProductsEntity {
  product?: null;
  count: number;
  _id: string;
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

  const [allOrders, setAllOrders] = useState<datatype[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState<
    "ALL" | "DELIVERED" | "NOT_DELIVERED"
  >("ALL");

  const [handlePage, setHandelPage] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGetOrders = async () => {
      try {
        const orders = await GetOrders();
        console.log(orders);
        setAllOrders(orders);
        setTableData((prev) => ({ ...prev, orders: orders }));
        setHandelPage({ ...handlePage, loading: false });
      } catch (error) {
        console.log(error);
        setHandelPage({ ...handlePage, loading: false, error: true });
      }
    };
    fetchGetOrders();
  }, []);

  const filterOrders = (search: string, filter: typeof deliveryFilter) => {
    let filtered = allOrders;
    if (search) {
      filtered = filtered.filter((order) =>
        order.user.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter === "DELIVERED") {
      filtered = filtered.filter((order) => order.deliveryStatus === true);
    } else if (filter === "NOT_DELIVERED") {
      filtered = filtered.filter((order) => order.deliveryStatus === false);
    }
    setTableData((prev) => ({
      ...prev,
      orders: filtered,
    }));
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    filterOrders(value, deliveryFilter);
  };

  const handleFilterChange = (filterValue: typeof deliveryFilter) => {
    setDeliveryFilter(filterValue);
    filterOrders(searchValue, filterValue);
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
            placeholder={ordersLocalization.search}
          />
          <div className="flex gap-4 items-center m-auto">
            <div className="flex gap-1">
              <input
                id="all"
                className="accent-red-500"
                type="radio"
                name="filter"
                value="ALL"
                checked={deliveryFilter === "ALL"}
                onChange={() => handleFilterChange("ALL")}
              />
              <label className="flex items-center gap-1" htmlFor="all">
                {ordersLocalization.all}
              </label>
            </div>
            <div className="flex gap-1">
              <input
                id="DELIVERED"
                type="radio"
                name="filter"
                value="DELIVERED"
                checked={deliveryFilter === "DELIVERED"}
                onChange={() => handleFilterChange("DELIVERED")}
              />
              <label className="flex items-center gap-1" htmlFor="DELIVERED">
                {ordersLocalization.DELIVERED}
              </label>
            </div>
            <div className="flex gap-1">
              <input
                id="NOT_DELIVERED"
                type="radio"
                name="filter"
                value="NOT_DELIVERED"
                checked={deliveryFilter === "NOT_DELIVERED"}
                onChange={() => handleFilterChange("NOT_DELIVERED")}
              />
              <label
                className="flex items-center gap-1"
                htmlFor="NOT_DELIVERED"
              >
                {ordersLocalization.NOT_DELIVERED}
              </label>
            </div>
          </div>
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
