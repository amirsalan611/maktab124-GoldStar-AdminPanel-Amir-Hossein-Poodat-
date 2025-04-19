import { IconButton } from "@mui/material";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import moment from "moment-jalaali";
import {
  ordersLocalization,
  productPageLocalization,
  usersLocalization,
} from "../../../../constants/Localization/Localization";

interface FormatCellProps {
  row: any;
  keyName: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isedit?: boolean;
}

const formatCell = ({
  row,
  keyName,
  onDelete,
  onEdit,
  isedit,
}: FormatCellProps) => {
  switch (keyName) {
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
          {row[keyName].toLocaleString()} {productPageLocalization.toman}
        </span>
      );
    case "status":
      return row.quantity >= 1
        ? productPageLocalization.is
        : productPageLocalization.not;
    case "user":
      return row.user?.username || "-";
    case "role":
      return row.role.toLowerCase() === "user"
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
    case "quantity":
      return (
        <span onDoubleClick={() => {}}>
          {!isedit ? <p>{row.quantity}</p> : <input value={row.quantity} />}
        </span>
      );
    default:
      return row[keyName];
  }
};

export default formatCell;
