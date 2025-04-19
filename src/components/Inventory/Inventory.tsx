import { useEffect, useState } from "react";
import { GetProducts } from "../../services/auth/GetProducts/GetProducts";
import Loader2 from "../Loading/Loading2";
import {
  inventoryLocalization,
  productPageLocalization,
} from "../../constants/Localization/Localization";
import MainTable from "../shared/Table/MainTable";

interface Column {
  key: string;
  label: string;
}
interface table {
  products: any[];
  columns: Column[];
}

export default function Inventory() {
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

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [handlePage, setHandelPage] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const products = await GetProducts();
        console.log(products)
        const filteredProducts = products.filter(
          (product: any) => product.quantity >= 1
        );
        setAllProducts(filteredProducts);
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

  const handleSearch = (value: string) => {
    setSearchValue(value);

    const filtered = allProducts.filter((product: any) =>
      product.name?.toLowerCase().includes(value.toLowerCase())
    );

    setTableData((prev) => ({
      ...prev,
      products: filtered,
    }));
  };

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
    <div className="p-10 pt-2 w-full h-full">
      <div className="flex flex-col items-center">
        <div className="flex items-center w-full gap-5 px-10">
          <p className="text-3xl text-center">
            {inventoryLocalization.inventory}
          </p>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="border w-[350px] border-gray-400 outline-none rounded-md my-5 py-2 px-5"
            placeholder="search by product name"
          />
        </div>
        <MainTable
          data={tableData.products}
          columns={tableData.columns}
          onDelete={handleDelete}
          onEdit={handleedit}
        />
      </div>
    </div>
  );
}
