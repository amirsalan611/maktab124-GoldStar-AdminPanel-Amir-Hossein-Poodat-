import React from "react";
import { TableCell, TableRow } from "@mui/material";
import formatCell from "../formatCell/formatCell";


interface TableRowProps {
  row: any;
  columns: {
    key: string;
    label: string;
    align?: "right" | "left" | "center";
  }[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  page: number;
  rowsPerPage: number;
  rowIndex: number;
}

const TableRowC: React.FC<TableRowProps> = ({
  row,
  columns,
  onDelete,
  onEdit,
  page,
  rowsPerPage,
  rowIndex,
}) => {
  const rowBgColor =
    row.deliveryStatus === true || row.quantity === 0
      ? "#fee2e2"
      : row.deliveryStatus === false
      ? "#dcfce7"
      : "inherit";

  return (
    <TableRow hover sx={{ backgroundColor: rowBgColor }}>
      <TableCell
        align="center"
        className="border-[1px] border-gray-500"
        sx={{ padding: 1 }}
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
          {formatCell({ row, keyName: column.key, onDelete, onEdit })}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRowC;
