import { useEffect, useState } from "react";
import { GetUsers } from "../../services/auth/GetUsers/GerUsers";
import Table from "../shared/Table/Table";
import { productPageLocalization, usersLocalization } from "../../constants/Localization/Localization";

interface Column {
  key: string;
  label: string;
}
interface table {
  users: [];
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

       const [handlePage, setHandelPage] = useState({
         loading: true,
         error: false,
       });

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const users = await GetUsers();
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

  const handleDelete=()=>{}
  const handleedit = () => {};

  return (
    <div className="p-10 w-full h-full">
      {tableData.users.length < 1 ? (
        <p className="text-2xl text-center">{usersLocalization.noUser}</p>
      ) : (
        <>
          <p className="text-3xl mb-5 text-center">
            {usersLocalization.userPage}
          </p>
          <Table
            data={tableData.users}
            columns={tableData.columns}
            onDelete={handleDelete}
            onEdit={handleedit}
          />
        </>
      )}
    </div>
  );
}
