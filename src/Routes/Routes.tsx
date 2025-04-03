import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Orders from "../Pages/Orders/Orders";
import Products from "../Pages/Products/Products";
import AddAndEdit from "../Pages/Add&EditProduct/Add&EditProduct";
import Users from "../Pages/Users/Users";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/AddAndEdit" element={<AddAndEdit />} />
      <Route path="/Users
      " element={<Users />} />
    </Routes>
  );
}
