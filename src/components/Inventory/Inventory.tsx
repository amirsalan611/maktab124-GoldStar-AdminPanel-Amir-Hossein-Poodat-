import { useEffect, useState } from "react";
import { GetProducts } from "../../services/auth/GetProducts/GetProducts";
import Loader2 from "../Loading/Loading2";
import {
  inventoryLocalization,
  productPageLocalization,
} from "../../constants/Localization/Localization";
import MainTable from "../shared/Table/MainTable";
import { useTableContext } from "../shared/Table/tableContext/tableContext";
import Swal from "sweetalert2";
import { DeleteProduct } from "../../services/auth/DeleteProduct/DeleteProduct";
import AddAndEditModal from "../ui/Add&EditModal/Add&EditModal";

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
    ],
  });

  const { shouldRefetch, setShouldRefetch } = useTableContext();

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const [handlePage, setHandelPage] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const products = await GetProducts();
        console.log(products);
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
  }, [shouldRefetch]);

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

  const handleEdit = (productId: string) => {
    setIsModalOpen(true);
    setSelectedProductId(productId);
  };

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
            placeholder={inventoryLocalization.searchByProductName}
            />
        </div>
        <MainTable
          data={tableData.products}
          columns={tableData.columns}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <AddAndEditModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProductId(null);
        }}
        data={
          selectedProductId
            ? allProducts.find((p) => p._id === selectedProductId)
            : undefined
        }
      />
    </div>
  );
}
