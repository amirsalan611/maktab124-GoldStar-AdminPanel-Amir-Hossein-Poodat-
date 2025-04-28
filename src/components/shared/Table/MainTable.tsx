import React from "react";
import { Paper, Table, TableContainer } from "@mui/material";
import TableHeader from "./TableHeader/TableHeader";
import TableEmptyRow from "./TableEmptyRow/TableEmptyRow";
import TableRowC from "./TableRow/TableRow";
import TablePaginationC from "./TablePagination/TablePagination";
import { toast } from "react-toastify";
import { useTableContext } from "./tableContext/tableContext";
import { BASE_URL } from "../../../services/API/API";
import axios from "axios";
import { tableLocalization } from "../../../constants/Localization/Localization";

interface MainTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    align?: "right" | "left" | "center";
  }[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const MainTable: React.FC<MainTableProps> = ({
  data,
  columns,
  onDelete,
  onEdit,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    productsOnEdit,
    setProductsOnEdit,
    isEditing,
    setIsEditing,
    setRowInEditId,
    setShouldRefetch,
    productsPriceOnEdit,
    setProductsPriceOnEdit,
    setIsPriceEditing,
    setRowPriceInEditId,
  } = useTableContext();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

const handleSaveChanges = async () => {
  const editedProducts = productsOnEdit.concat(productsPriceOnEdit);

  try {
    await Promise.all(
      editedProducts.map((product) => {
        const bodyData: any = {};
        if (product.quantityValue !== undefined) {
          bodyData.quantity = product.quantityValue;
        }
        if (product.priceValue !== undefined) {
          bodyData.price = product.priceValue;
        }

        return axios.patch(`${BASE_URL}/api/products/${product.id}`, bodyData);
      })
    );

    toast.success(tableLocalization.saveSucces);
    setProductsOnEdit([]);
    setIsEditing(false);
    setRowInEditId([]);
    setProductsPriceOnEdit([]);
    setIsPriceEditing(false);
    setRowPriceInEditId([]);
    setShouldRefetch((prev) => !prev);
  } catch (error) {
    toast.error(tableLocalization.saveError);
  }
};


  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "20px",
        border: "1px solid #ccc",
        position: "relative",
        maxHeight: "690px",
      }}
    >
      <TableContainer sx={{ maxHeight: 640, scrollbarWidth: "none" }}>
        <Table stickyHeader className="border-b border-gray-500 relative">
          <TableHeader columns={columns} />
          {data.length === 0 ? (
            <TableEmptyRow />
          ) : (
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRowC
                  key={row.id}
                  row={row}
                  columns={columns}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowIndex={rowIndex}
                />
              ))
          )}
        </Table>
      </TableContainer>
      <TablePaginationC
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {isEditing && (
        <button
          className="bg-blue-500 text-white px-3 py-2 absolute left-5 bottom-1.5 rounded-md font-sans"
          onClick={handleSaveChanges}
        >
          {tableLocalization.saveChanges}
        </button>
      )}
    </Paper>
  );
};

export default MainTable;
