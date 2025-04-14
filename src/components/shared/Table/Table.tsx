import React from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import {
  ordersLocalization,
  productPageLocalization,
  usersLocalization,
} from "../../../constants/Localization/Localization";
import moment from "moment-jalaali";


interface Column {
  key: string;
  label: string;
}

interface TableProps {
  data: any[];
  columns: Column[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, onDelete, onEdit }) => {
  return (
    <div className="overflow-y-auto font-sans border border-gray-400 rounded-xl max-h-[80%]">
      <table className="table-auto border-collapse w-full shadow-sm">
        <thead className="">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-x border-gray-400 text-center"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`text-center hover:bg-gray-100 ${
                  row.deliveryStatus === true || row.quantity === 0
                    ? "bg-red-100"
                    : row.deliveryStatus === false
                    ? "bg-green-100"
                    : ""
                }`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b border-x border-gray-400"
                  >
                    {column.key === "images" ? (
                      <img
                        src={`http://${row.images[0]}`}
                        alt="product"
                        className="w-10 h-10 object-cover m-auto"
                      />
                    ) : column.key === "action" ? (
                      <div>
                        <button
                          className="text-blue-500 underline"
                          onClick={() => onDelete?.(row.id)}
                        >
                          <MdDeleteForever className="text-red-500 text-2xl" />
                        </button>
                        <button
                          className="text-blue-500 underline"
                          onClick={() => onEdit?.(row.id)}
                        >
                          <MdEditSquare className="text-blue-500 text-xl mr-2" />
                        </button>
                      </div>
                    ) : column.key === "price" ? (
                      <div className="flex justify-center items-center gap-2">
                        <p>{row.price.toLocaleString()}</p>
                        <p className="text-[15px]">
                          {productPageLocalization.toman}
                        </p>
                      </div>
                    ) : column.key === "status" ? (
                      <div className="flex justify-center items-center gap-2">
                        {row.quantity >= 1 ? (
                          <p>{productPageLocalization.is}</p>
                        ) : (
                          <p>{productPageLocalization.not}</p>
                        )}
                      </div>
                    ) : column.key === "user" ? (
                      <p>{row.user.username}</p>
                    ) : column.key === "totalPrice" ? (
                      <div className="flex justify-center items-center gap-2">
                        <p>{row.totalPrice.toLocaleString()}</p>
                        <p className="text-[15px]">
                          {productPageLocalization.toman}
                        </p>
                      </div>
                    ) : column.key === "deliveryStatus" ? (
                      <div>
                        {row.deliveryStatus === true ? (
                          <p>{ordersLocalization.sending}</p>
                        ) : (
                          <p>{ordersLocalization.sended}</p>
                        )}
                      </div>
                    ) : column.key === "role" ? (
                      <div>
                        {row.role === "user" ? (
                          <p>{usersLocalization.user}</p>
                        ) : (
                          <p>{usersLocalization.admin}</p>
                        )}
                      </div>
                    ) : column.key === "deliveryDate" ? (
                      <p>
                        {row.deliveryDate
                          ? moment(row.deliveryDate)
                              .locale("fa")
                              .format("jYYYY/jMM/jDD")
                          : "-"}
                      </p>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
