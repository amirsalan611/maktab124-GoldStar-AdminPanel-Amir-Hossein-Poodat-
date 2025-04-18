import { useEffect, useState } from "react";
import { GetUsers } from "../../services/auth/GetUsers/GerUsers";
import { usersLocalization } from "../../constants/Localization/Localization";
import MuiTable from "../shared/Table/Table";

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
      { key: "action", label: usersLocalization.action },
    ],
  });

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
  }, []);

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

  const handleDelete = () => {};
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
            placeholder="search by username"
          />
        </div>
        <MuiTable
          data={tableData.users}
          columns={tableData.columns}
          onDelete={handleDelete}
          onEdit={handleedit}
        />
      </div>
    </div>
  );
}
