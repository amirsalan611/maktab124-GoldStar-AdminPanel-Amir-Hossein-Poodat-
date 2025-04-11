import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Panel from "../Pages/panel/Panel";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/panel" element={<Panel />} />
    </Routes>
  );
}
