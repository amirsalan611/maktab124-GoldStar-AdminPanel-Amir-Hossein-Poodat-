import { useEffect, useState } from "react";
import { GetProducts } from "../../services/auth/GetProducts/GetProducts";
import Loader2 from "../Loading/Loading2";
import Table from "../shared/Table/Table";
import { productPageLocalization } from "../../constants/Localization/Localization";

interface table {
  products: [];
  columns: string[];
}

export default function Products() {
  const [tableData, setTableData] = useState<table>({
    products: [],
    columns: [
      productPageLocalization.image,
      productPageLocalization.name,
      productPageLocalization.price,
      productPageLocalization.count,
      productPageLocalization.action,
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
    <div className="p-10">
      {tableData.products.length < 1 ? (
        <p className="text-2xl">{productPageLocalization.noProduct}</p>
      ) : (
        <>
          <p>{productPageLocalization.prodctList}</p>
          <Table data={tableData.products} columns={tableData.columns} />
        </>
      )}
    </div>
  );
}
