import { useEffect, useState } from "react";
import { GetProducts } from "../../services/auth/GetProducts/GetProducts";
import { DeleteProduct } from "../../services/auth/DeleteProduct/DeleteProduct";
import Loader2 from "../Loading/Loading2";
import {
  headerLocalization,
  productPageLocalization,
} from "../../constants/Localization/Localization";
import Button from "../shared/Button/Button";
import MainTable from "../shared/Table/MainTable";
import { useTableContext } from "../shared/Table/tableContext/tableContext";
import Swal, { SweetAlertIcon } from "sweetalert2";

interface Column {
  key: string;
  label: string;
}
interface table {
  products: any[];
  columns: Column[];
}

export default function Products() {
  const [tableData, setTableData] = useState<table>({
    products: [],
    columns: [
      { key: "images", label: productPageLocalization.image },
      { key: "name", label: productPageLocalization.name },
      { key: "status", label: productPageLocalization.status },
      { key: "quantity", label: productPageLocalization.count },
      { key: "action", label: productPageLocalization.action },
    ],
  });

  const { shouldRefetch, setShouldRefetch } = useTableContext();

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  const [handlePage, setHandelPage] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const products = await GetProducts();
        console.log(products);
        setAllProducts(products);
        setTableData((prev) => ({
          ...prev,
          products: products,
        }));
        setHandelPage({ ...handlePage, loading: false });
      } catch (error) {
        console.log(error);
        setHandelPage({ ...handlePage, loading: false, error: true });
      }
    };
    fetchGetProducts();
  }, [shouldRefetch]);

  const handleFilterChange = (value: string) => {
    let filteredProducts = [...allProducts];

    switch (value) {
      case "available":
        filteredProducts = filteredProducts.filter((p: any) => p.quantity > 0);
        break;
      case "unavailable":
        filteredProducts = filteredProducts.filter(
          (p: any) => p.quantity === 0
        );
        break;
      case "most":
        filteredProducts = filteredProducts.sort(
          (a: any, b: any) => b.quantity - a.quantity
        );
        break;
      case "least":
        filteredProducts = filteredProducts.sort(
          (a: any, b: any) => a.quantity - b.quantity
        );
        break;
      case "all":
      default:
        break;
    }

    const result = filteredProducts.filter((p: any) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setTableData((prev) => ({
      ...prev,
      products: result,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = allProducts.filter((p: any) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setTableData((prev) => ({
      ...prev,
      products: filtered,
    }));
  };

  const handleDelete = async (productId: string) => {
    console.log(productId);
    Swal.fire({
      title: productPageLocalization.confirmDelete,
      text: productPageLocalization.confirmDeleteAlert,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: productPageLocalization.delete,
      cancelButtonText: productPageLocalization.cancel,
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
        const result = await DeleteProduct(productId);
        console.log(result);
        setShouldRefetch(!shouldRefetch);
        Swal.fire({
          title: productPageLocalization.deleteSuccess,
          icon: "success",
          confirmButtonText: productPageLocalization.ok,
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

  const handleEdit = () => {};

  if (handlePage.loading) {
    return (
      <div>
        <Loader2 />
      </div>
    );
  }
  return (
    <div className="p-10 pt-2 w-full h-full">
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center gap-5 w-full px-10">
          <div className="flex items-center gap-5 min-w-[500px]">
            <p className="text-3xl text-center">
              {productPageLocalization.productList}
            </p>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              className="border w-[350px] border-gray-400 outline-none rounded-md my-5 py-2 px-5"
              placeholder={headerLocalization.search}
            />
            <select
              onChange={(e) => handleFilterChange(e.target.value)}
              className="appearance-non bg-white border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-4 focus:ring-primary"
            >
              <option value="all">{productPageLocalization.all}</option>
              <option value="available">
                {productPageLocalization.available}
              </option>
              <option value="unavailable">
                {productPageLocalization.unavailable}
              </option>
              <option value="most">{productPageLocalization.most}</option>
              <option value="least">{productPageLocalization.least}</option>
            </select>
          </div>
          <Button
            buttonText={productPageLocalization.addProduct}
            type={"button"}
            buttonClassName="border border-primary w-full p-2 text-primary hover:border-none hover:bg-primary font-sans "
          />
        </div>
        <MainTable
          data={tableData.products}
          columns={tableData.columns}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
