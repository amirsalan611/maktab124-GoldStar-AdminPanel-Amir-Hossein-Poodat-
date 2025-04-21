import { useEffect, useState } from "react";
import { ordersLocalization } from "../../constants/Localization/Localization";
import { GetOrders } from "../../services/auth/GetOrders/GetOrders";
import RadioFiltering from "./RadioFiltering/RadioFiltering";
import MainTable from "../shared/Table/MainTable";
import {
  useTableContext,
} from "../shared/Table/tableContext/tableContext";
import Swal from "sweetalert2";
import { DeleteOrder } from "../../services/auth/DeleteOrder/DeleteOrder";
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

  const { shouldRefetch, setShouldRefetch } = useTableContext();

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
  }, [shouldRefetch]);

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

  const handleDelete = async (productId: string) => {
    console.log(productId);
    Swal.fire({
      title: ordersLocalization.confirmDelete,
      text: ordersLocalization.confirmDeleteAlert,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: ordersLocalization.delete,
      cancelButtonText: ordersLocalization.cancel,
      customClass: {
        confirmButton: "bg-blue-400 text-white shadow-2xl rounded-2xl",
        cancelButton: "bg-red-400 text-white shadow-2xl rounded-2xl",
        popup: "bg-white rounded-lg shadow-2xl rounded-2xl",
      },
      backdrop: `
    rgba(0, 0, 0, 0.2)
    left top
    no-repeat
    fixed
  `,
      didOpen: () => {
        const swalBackdrop = document.querySelector(
          ".swal2-container"
        ) as HTMLElement;
        if (swalBackdrop) {
          swalBackdrop.style.backdropFilter = "blur(1px)";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await DeleteOrder(productId);
        console.log(result);
        setShouldRefetch(!shouldRefetch);
        Swal.fire({
          title: ordersLocalization.deleteSuccess,
          icon: "success",
          confirmButtonText: ordersLocalization.ok,
          customClass: {
            confirmButton: "bg-blue-400 text-white shadow-2xl rounded-2xl",
            popup: "bg-white rounded-lg shadow-2xl rounded-2xl",
          },
          backdrop: `
    rgba(0, 0, 0, 0.2)
    left top
    no-repeat
    fixed
  `,
          didOpen: () => {
            const swalBackdrop = document.querySelector(
              ".swal2-container"
            ) as HTMLElement;
            if (swalBackdrop) {
              swalBackdrop.style.backdropFilter = "blur(1px)";
            }
          },
        });
      }
    });
  };
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
          <RadioFiltering
            checked={deliveryFilter}
            onChange={handleFilterChange}
          />
        </div>
        <MainTable
          data={tableData.orders}
          columns={tableData.columns}
          onDelete={handleDelete}
          onEdit={handleedit}
        />
      </div>
    </div>
  );
}
