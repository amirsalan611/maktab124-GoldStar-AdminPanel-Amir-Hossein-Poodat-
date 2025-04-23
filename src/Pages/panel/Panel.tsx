import { useContext } from "react";
import Aside from "../../components/Aside/Aside";
import Header from "../../components/ui/Header/Header";
import AsideContext from "../../components/Context/Context";
import Orders from "../../components/Orders/Orders";
import Products from "../../components/Products/Products";
import Users from "../../components/Users/Users";
import Inventory from "../../components/Inventory/Inventory";
import { TableContextProvider } from "../../components/shared/Table/tableContext/tableContext";

export default function Panel() {
  const asideContext = useContext(AsideContext);

  const { activeComponent }: any = asideContext;

  function renderComponent() {
    switch (activeComponent) {
      case "orders":
        return <Orders />;
      case "products":
        return <Products />;
      case "users":
        return <Users />;
      case "inventory":
        return <Inventory />;
    }
  }

  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col items-center">
        <Header />
        <TableContextProvider>{renderComponent()}</TableContextProvider>
      </div>
    </div>
  );
}
