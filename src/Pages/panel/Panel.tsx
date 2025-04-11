import { useContext } from "react";
import Aside from "../../components/Aside/Aside";
import Header from "../../components/Header/Header";
import AsideContext from "../../components/Context/Context";
import Orders from "../../components/Orders/Orders";
import Products from "../../components/Products/Products";
import Users from "../../components/Users/Users";
import AddAndEdit from "../../components/Add&EditProduct/Add&EditProduct";

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
      case "AddAndEdit":
        return <AddAndEdit />;
    }
  }

  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col items-center">
        <Header />
        {renderComponent()}
      </div>
    </div>
  );
}
