import React from "react";
import { TableCell, TableRow } from "@mui/material";

interface TableHeaderProps {
  columns: {
    key: string;
    label: string;
    align?: "right" | "left" | "center";
  }[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <TableRow >
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
  );
};

export default TableHeader;
