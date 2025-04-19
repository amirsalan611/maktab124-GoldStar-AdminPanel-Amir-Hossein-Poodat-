import React from "react";
import { Paper, Table, TableContainer} from "@mui/material";
import TableHeader from "./TableHeader/TableHeader";
import TableEmptyRow from "./TableEmptyRow/TableEmptyRow";
import TableRowC from "./TableRow/TableRow";
import TablePaginationC from "./TablePagination/TablePagination";


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
    </Paper>
  );
};

export default MainTable;
