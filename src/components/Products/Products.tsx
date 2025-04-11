import { useEffect, useState } from "react";
import { GetProducts } from "../../services/auth/GetProducts/GetProducts";
import Loader2 from "../Loading/Loading2";
import Table from "../shared/Table/Table";
import { productPageLocalization } from "../../constants/Localization/Localization";
interface Column {
  key: string;
  label: string;
}
interface table {
  products: [];
  columns: Column[];
}

export default function Products() {
  const [tableData, setTableData] = useState<table>({
    products: [],
    columns: [
      { key: "image", label: productPageLocalization.image },
      { key: "productName", label: productPageLocalization.name },
      { key: "productPrice", label: productPageLocalization.price },
      { key: "productCount", label: productPageLocalization.count },
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
        setTableData((prev) => ({
          ...prev,
          products: products.records,
        }));
        console.log(products.records);
        setHandelPage({ ...handlePage, loading: false });
      } catch (error) {
        console.log(error);
        setHandelPage({ ...handlePage, loading: false, error: true });
      }
    };
    fetchGetProducts();
  }, []);

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
    <div className="p-10 w-full">
      {tableData.products.length < 1 ? (
        <p className="text-2xl">{productPageLocalization.noProduct}</p>
      ) : (
        <>
          <p className="text-3xl mb-5 text-center">{productPageLocalization.prodctList}</p>
          <Table data={tableData.products} columns={tableData.columns}/>
        </>
      )}
    </div>
  );
}
