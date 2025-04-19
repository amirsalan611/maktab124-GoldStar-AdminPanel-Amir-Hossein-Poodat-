import React from "react";
import { TablePagination } from "@mui/material";
import { tableLocalization } from "../../../../constants/Localization/Localization";


interface TablePaginationComponentProps {
  count: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (_: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TablePaginationC: React.FC<TablePaginationComponentProps> = ({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => (
  <TablePagination
    dir="ltr"
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    labelRowsPerPage={tableLocalization.rowsPerPage}
    labelDisplayedRows={({ from, to, count }) =>
      `${from}${tableLocalization.to}${to} ${tableLocalization.of} ${
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
);

export default TablePaginationC;
