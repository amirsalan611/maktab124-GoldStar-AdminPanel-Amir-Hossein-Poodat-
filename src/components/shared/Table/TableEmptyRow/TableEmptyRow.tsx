import { TableCell, TableRow } from "@mui/material";
import { productPageLocalization } from "../../../../constants/Localization/Localization";

const TableEmptyRow = () => (
  <TableRow>
    <TableCell colSpan={7} align="center">
      {productPageLocalization.noProduct}
    </TableCell>
  </TableRow>
);

export default TableEmptyRow;
