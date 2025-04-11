import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface AsideContextType {
  activeComponent: string;
  setActiveComponent: Dispatch<SetStateAction<string>>;
}

const AsideContext = createContext<AsideContextType | null>(null);
interface AsideProviderProps {
  children: ReactNode;
}

export const AsideProvider: React.FC<AsideProviderProps> = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState<string>("products");

  return (
    <AsideContext.Provider value={{ activeComponent, setActiveComponent }}>
      {children}
    </AsideContext.Provider>
  );
};

export default AsideContext;
