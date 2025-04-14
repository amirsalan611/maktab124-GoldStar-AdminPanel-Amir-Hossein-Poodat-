import { useEffect, useState } from "react";
import { ordersLocalization } from "../../constants/Localization/Localization";
import Table from "../shared/Table/Table";
import { GetOrders } from "../../services/auth/GetOrders/GetOrders";

interface Column {
  key: string;
  label: string;
}
interface table {
  orders: [];
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

     const [handlePage, setHandelPage] = useState({
       loading: true,
       error: false,
     });

   useEffect(()=>{
const fetchGetOrders = async ()=>{
      try {
        const orders = await GetOrders();
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
   },[])

   const handleDelete = ()=>{}
   const handleedit = () => {};

  return (
    <div className="p-10 w-full h-full">
      {tableData.orders.length < 1 ? (
        <p className="text-2xl text-center">{ordersLocalization.noOrder}</p>
      ) : (
        <>
          <p className="text-3xl mb-5 text-center">
            {ordersLocalization.orders}
          </p>
          <Table
            data={tableData.orders}
            columns={tableData.columns}
            onDelete={handleDelete}
            onEdit={handleedit}
          />
        </>
      )}
    </div>
  );
}
