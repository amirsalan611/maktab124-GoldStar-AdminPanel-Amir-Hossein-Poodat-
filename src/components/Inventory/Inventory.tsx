import { useEffect, useState } from "react";
import { GetProducts } from "../../services/auth/GetProducts/GetProducts";
import Loader2 from "../Loading/Loading2";
import Table from "../shared/Table/Table";
import { inventoryLocalization, productPageLocalization } from "../../constants/Localization/Localization";
interface Column {
  key: string;
  label: string;
}
interface table {
  products: [];
  columns: Column[];
}

export default function inventory() {
  const [tableData, setTableData] = useState<table>({
    products: [],
    columns: [
      { key: "images", label: productPageLocalization.image },
      { key: "name", label: productPageLocalization.name },
      { key: "price", label: productPageLocalization.price },
      { key: "quantity", label: productPageLocalization.count },
      { key: "action", label: productPageLocalization.action },
    ],
  });

  const [handlePage, setHandelPage] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const products = await GetProducts();
        const filteredProducts = products.filter((product:any) =>product.quantity >= 1)
        setTableData((prev) => ({
          ...prev,
          products: filteredProducts,
        }));
        setHandelPage({ ...handlePage, loading: false });
      } catch (error) {
        console.log(error);
        setHandelPage({ ...handlePage, loading: false, error: true });
      }
    };
    fetchGetProducts();
  }, []);

  const handleDelete = () => {};
  const handleedit = () => {};
  if (handlePage.loading) {
    return (
      <div>
        <Loader2 />
      </div>
    );
  }
  if (handlePage.error) {
    return <div></div>;
  }

  return (
    <div className="p-10 w-full h-full">
      {tableData.products.length < 1 ? (
        <p className="text-2xl text-center">
          {productPageLocalization.noProduct}
        </p>
      ) : (
        <>
          <p className="text-3xl mb-5 text-center">
            {inventoryLocalization.inventory}
          </p>
          <Table
            data={tableData.products}
            columns={tableData.columns}
            onDelete={handleDelete}
            onEdit={handleedit}
          />
        </>
      )}
    </div>
  );
}
