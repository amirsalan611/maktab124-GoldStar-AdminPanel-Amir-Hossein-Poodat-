import React from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  data: any[];
  columns: Column[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const Table: React.FC<TableProps> = ({ data, columns, onDelete, onEdit }) => {
  console.log(data);
  return (
    <div className="overflow-y-auto">
      <table className="table-auto border-collapse w-full border rounded-xl shadow-sm">
        <thead className="">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-x text-center"
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
              <tr key={rowIndex} className="hover:bg-gray-100 text-center">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border-b border-x">
                    {column.key === "image" ? (
                      <img
                        src={row[column.key]}
                        alt="product"
                        className="w-10 h-10 object-cover m-auto"
                      />
                    ) : column.key === "action" ? (
                      <div>
                        {" "}
                        <button
                          className="text-blue-500 underline"
                          onClick={() => onDelete?.(row.id)}
                        >
                          <MdDeleteForever className="text-red-500 text-2xl" />
                        </button>
                        <button
                          className="text-blue-500 underline"
                          onClick={()=>onEdit?.(row.id)}
                        >
                          <MdEditSquare className="text-blue-500 text-xl mr-2" />
                        </button>
                      </div>
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
