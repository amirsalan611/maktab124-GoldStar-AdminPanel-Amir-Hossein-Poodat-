import { createContext, useContext, useState, ReactNode } from "react";
interface edited {
  id: string;
  quantityValue?: string;
  priceValue?: string;
}

interface RowId {
  id: string;
}

interface TableContextType {
  productsOnEdit: edited[];
  setProductsOnEdit: React.Dispatch<
    React.SetStateAction<edited[]>
  >;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  rowInEditId: RowId[];
  setRowInEditId: React.Dispatch<React.SetStateAction<RowId[]>>;

  productsPriceOnEdit: edited[];
  setProductsPriceOnEdit: React.Dispatch<
    React.SetStateAction<edited[]>
  >;
  isPriceEditing: boolean;
  setIsPriceEditing: React.Dispatch<React.SetStateAction<boolean>>;
  rowPriceInEditId: RowId[];
  setRowPriceInEditId: React.Dispatch<React.SetStateAction<RowId[]>>;

  shouldRefetch: boolean;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableContext = createContext<TableContextType | null>(null);

export const TableContextProvider = ({ children }: { children: ReactNode }) => {
  const [productsOnEdit, setProductsOnEdit] = useState<edited[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [rowInEditId, setRowInEditId] = useState<RowId[]>([]);

  const [productsPriceOnEdit, setProductsPriceOnEdit] = useState<edited[]>([]);
  const [isPriceEditing, setIsPriceEditing] = useState<boolean>(false);
  const [rowPriceInEditId, setRowPriceInEditId] = useState<RowId[]>([]);

  const [shouldRefetch, setShouldRefetch] = useState(false);

  return (
    <TableContext.Provider
      value={{
        productsOnEdit,
        setProductsOnEdit,
        isEditing,
        setIsEditing,
        rowInEditId,
        setRowInEditId,
        productsPriceOnEdit,
        setProductsPriceOnEdit,
        isPriceEditing,
        setIsPriceEditing,
        rowPriceInEditId,
        setRowPriceInEditId,
        shouldRefetch,
        setShouldRefetch,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(
      "useTableContext must be used within a TableContextProvider"
    );
  }
  return context;
};
