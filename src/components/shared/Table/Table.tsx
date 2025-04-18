import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import {
  ordersLocalization,
  productPageLocalization,
  tableLocalization,
  usersLocalization,
} from "../../../constants/Localization/Localization";
import moment from "moment-jalaali";

interface Column {
  key: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

interface TableProps {
  data: any[];
  columns: Column[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const formatCell = (
  row: any,
  key: string,
  onDelete: (id: string) => void,
  onEdit: (id: string) => void
) => {
  switch (key) {
    case "images":
      return (
        <img
          src={`http://${row.images[0]}`}
          alt="product"
          style={{ width: 40, height: 40, objectFit: "cover" }}
          className="m-auto"
        />
      );
    case "action":
      return (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <IconButton onClick={() => onDelete(row.id)}>
            <MdDeleteForever color="red" />
          </IconButton>
          <IconButton onClick={() => onEdit(row.id)}>
            <MdEditSquare color="blue" />
          </IconButton>
        </div>
      );
    case "price":
    case "totalPrice":
      return (
        <span>
          {row[key].toLocaleString()} {productPageLocalization.toman}
        </span>
      );
    case "status":
      return row.quantity >= 1
        ? productPageLocalization.is
        : productPageLocalization.not;
    case "user":
      return row.user?.username || "-";
    case "role":
      return row.role === "user"
        ? usersLocalization.user
        : usersLocalization.admin;
    case "deliveryStatus":
      return row.deliveryStatus
        ? ordersLocalization.sending
        : ordersLocalization.sended;
    case "deliveryDate":
      return row.deliveryDate
        ? moment(row.deliveryDate).locale("fa").format("jYYYY/jMM/jDD")
        : "-";
    default:
      return row[key];
  }
};

export default function MuiTable({
  data,
  columns,
  onDelete,
  onEdit,
}: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "20px",
        border: "1px solid #ccc",
      }}
    >
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader className="border-b border-gray-500">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                className="w-1 border-[1px] border-t-0 border-gray-500"
                style={{
                  backgroundColor: "#690B22",
                  color: "white",
                }}
              ></TableCell>
              {columns.map((column) => (
                <TableCell
                  className="border-[1px] border-t-0 border-gray-500"
                  key={column.key}
                  align={column.align || "center"}
                  style={{
                    backgroundColor: "#690B22",
                    color: "white",
                    font: "status-bar",
                    fontSize: "15px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  {productPageLocalization.noProduct}
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  const rowBgColor =
                    row.deliveryStatus === true || row.quantity === 0
                      ? "#fee2e2"
                      : row.deliveryStatus === false
                      ? "#dcfce7"
                      : "inherit";

                  return (
                    <TableRow
                      hover
                      key={row.id || rowIndex}
                      sx={{ backgroundColor: rowBgColor }}
                    >
                      <TableCell
                        align="center"
                        className="border-[1px] border-gray-500"
                        sx={{
                          padding: 1,
                        }}
                      >
                        {page * rowsPerPage + rowIndex + 1}
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell
                          className="border-[1px] border-gray-500"
                          key={column.key}
                          align={column.align || "center"}
                          sx={{
                            padding: 1,
                            font: "status-bar",
                            fontSize: "15px",
                          }}
                        >
                          {formatCell(row, column.key, onDelete, onEdit)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        dir="ltr"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={tableLocalization.rowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} ${tableLocalization.of} ${
            count !== -1 ? count : `${tableLocalization.moreOf} ${to}`
          }`
        }
        sx={{
          "& .MuiTablePagination-displayedRows": {
            direction: "rtl",
          },
        }}
        classes={{
          root: "flex justify-center",
          toolbar: "flex justify-between",
          displayedRows: "",
          select: "border border-gray-300 rounded-md",
        }}
      />
    </Paper>
  );
}
