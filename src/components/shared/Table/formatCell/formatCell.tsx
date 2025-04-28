import { IconButton } from "@mui/material";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import moment from "moment-jalaali";
import {
  ordersLocalization,
  productPageLocalization,
  usersLocalization,
} from "../../../../constants/Localization/Localization";
import { useTableContext } from "../tableContext/tableContext";

interface FormatCellProps {
  row: any;
  keyName: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const formatCell = ({ row, keyName, onDelete, onEdit }: FormatCellProps) => {
  const {
    productsOnEdit,
    setProductsOnEdit,
    setIsEditing,
    rowInEditId,
    setRowInEditId,
    productsPriceOnEdit,
    setProductsPriceOnEdit,
    rowPriceInEditId,
    setRowPriceInEditId,
  } = useTableContext();
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
          <IconButton onClick={() => onDelete(row._id)}>
            <MdDeleteForever color="red" />
          </IconButton>
          <IconButton onClick={() => onEdit(row._id)}>
            <MdEditSquare color="#3b82f6" />
          </IconButton>
        </div>
      );
    case "price":
      const idPrice = row._id || row.id;
      const productInEditPrice = productsPriceOnEdit.find(
        (p) => p.id === idPrice
      );
      return (
        <span
          onDoubleClick={() => {
            if (!rowPriceInEditId.some((r) => r.id === idPrice)) {
              setRowPriceInEditId((prev) => [...prev, { id: idPrice }]);
              setIsEditing(true);
              setProductsPriceOnEdit((prev) => [
                ...prev,
                { id: idPrice, priceValue: String(row.price) },
              ]);
            }
          }}
        >
          {productInEditPrice ? (
            <>
              <input
                type="text"
                value={String(productInEditPrice.priceValue ?? row.price)}
                onChange={(e) => {
                  const updatedValue = e.target.value;
                  setProductsPriceOnEdit((prev) => {
                    return prev.map((p) =>
                      p.id === idPrice ? { ...p, priceValue: updatedValue } : p
                    );
                  });
                }}
                className="border bg-red-300 px-3 text-center py-1 rounded w-32"
              />
              {productPageLocalization.toman}
            </>
          ) : (
            <p>
              {row[keyName].toLocaleString()} {productPageLocalization.toman}
            </p>
          )}
        </span>
      );
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
      const id = row._id || row._id;
      const productInEdit = productsOnEdit.find(
        (p) => p.id === id
      );

      return (
        <span
          onDoubleClick={() => {
            if (!rowInEditId.some((r) => r.id === id)) {
              setRowInEditId((prev) => [...prev, { id }]);
              setIsEditing(true);
              setProductsOnEdit((prev) => [
                ...prev,
                { id, quantityValue: String(row.quantity) },
              ]);
            }
          }}
        >
          {productInEdit ? (
            <input
              type="text"
              value={String(productInEdit.quantityValue ?? row.quantity)}
              onChange={(e) => {
                const updatedValue = e.target.value;
                setProductsOnEdit((prev) => {
                  return prev.map((p) =>
                    p.id === id ? { ...p, quantityValue: updatedValue } : p
                  );
                });
              }}
              className="border bg-red-300 px-3 text-center py-1 rounded w-20"
            />
          ) : (
            <p>{row.quantity}</p>
          )}
        </span>
      );

    default:
      return row[keyName];
  }
};

export default formatCell;
