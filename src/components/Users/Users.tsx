import { useEffect, useState } from "react";
import { GetUsers } from "../../services/auth/GetUsers/GerUsers";
import {
  usersLocalization,
} from "../../constants/Localization/Localization";
import MainTable from "../shared/Table/MainTable";
import Swal from "sweetalert2";
import { DeleteUser } from "../../services/auth/DeleteUser/DeleteUser";
import { useTableContext } from "../shared/Table/tableContext/tableContext";

interface Column {
  key: string;
  label: string;
}
interface table {
  users: any[];
  columns: Column[];
}

export default function Users() {
  const [tableData, setTableData] = useState<table>({
    users: [],
    columns: [
      { key: "username", label: usersLocalization.userName },
      { key: "firstname", label: usersLocalization.firstName },
      { key: "lastname", label: usersLocalization.lastName },
      { key: "phoneNumber", label: usersLocalization.phoneNumber },
      { key: "role", label: usersLocalization.role },
      { key: "userAction", label: usersLocalization.action },
    ],
  });

  const { shouldRefetch, setShouldRefetch } = useTableContext();

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [handlePage, setHandelPage] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const users = await GetUsers();
        setAllUsers(users);
        setTableData((prev) => ({
          ...prev,
          users: users,
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

    const filteredUsers = allUsers.filter((user: any) =>
      user.username?.toLowerCase().includes(value.toLowerCase())
    );

    setTableData((prev) => ({
      ...prev,
      users: filteredUsers,
    }));
  };

  const handleDelete = async (productId: string) => {
    console.log(productId);
    Swal.fire({
      title: usersLocalization.confirmDelete,
      text: usersLocalization.confirmDeleteAlert,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: usersLocalization.delete,
      cancelButtonText: usersLocalization.cancel,
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
        const result = await DeleteUser(productId);
        console.log(result);
        setShouldRefetch(!shouldRefetch);
        Swal.fire({
          title: usersLocalization.deleteSuccess,
          icon: "success",
          confirmButtonText: usersLocalization.ok,
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
          <p className="text-3xl text-center">{usersLocalization.userPage}</p>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="border w-[350px] border-gray-400 outline-none rounded-md my-5 py-2 px-5"
            placeholder={usersLocalization.searchByUsername}
          />
        </div>
        <MainTable
          data={tableData.users}
          columns={tableData.columns}
          onDelete={handleDelete}
          onEdit={handleedit}
        />
      </div>
    </div>
  );
}
