import React from "react";

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  data: any[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  console.log(data)
  return (
    <div className="overflow-y-auto">
      <table className="table-auto border-collapse w-full border rounded-xl shadow-sm">
        <thead className="">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 border-b border-x text-center">
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
                      <button className="text-blue-500 underline">
                        ویرایش
                      </button>
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
