import { useContext } from "react";
import goldstar from "../../assets/images/goldStar.jpg";
import AsideContext from "../Context/Context";
import { asidebarlocalization } from "../../constants/Localization/Localization";
import { AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaDropbox, FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export default function Aside() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    navigate("/");
  };

  const asideContext = useContext(AsideContext);

  const { activeComponent, setActiveComponent }: any = asideContext;

  return (
    <div className="h-screen bg-gray-100 shadow-xl p-10 flex flex-col justify-between w-[300px]">
      <div className="flex gap-2 items-center">
        <img src={goldstar} alt="logo" className="w-[50px] rounded-full" />
        <p className="text-3xl poppins-medium">Gold Star</p>
      </div>
      <div className="flex flex-col gap-5 items-center text-xl">
        <button
          className={`flex items-center justify-center gap-2 px-4 py-1 rounded-lg w-full ${
            activeComponent === "products" ? "bg-gray-400 text-white" : ""
          }`}
          onClick={() => setActiveComponent("products")}
        >
          <AiFillProduct />
          <p>{asidebarlocalization.products}</p>
        </button>
        <button
          className={`flex items-center justify-center gap-2 py-1 rounded-lg w-full ${
            activeComponent === "inventory" ? "bg-gray-400 text-white" : ""
          }`}
          onClick={() => setActiveComponent("inventory")}
        >
          <FaDropbox />
          <p>{asidebarlocalization.inventory}</p>
        </button>
        <button
          className={`flex items-center justify-center gap-2 px-4 py-1 rounded-lg w-full ${
            activeComponent === "orders" ? "bg-gray-400 text-white" : ""
          }`}
          onClick={() => setActiveComponent("orders")}
        >
          <BiSolidMessageDetail />
          <p>{asidebarlocalization.orders}</p>
        </button>{" "}
        <button
          className={`flex items-center justify-center gap-2 py-1 rounded-lg w-full ${
            activeComponent === "users" ? "bg-gray-400 text-white" : ""
          }`}
          onClick={() => setActiveComponent("users")}
        >
          <FaUsers />
          <p>{asidebarlocalization.users}</p>
        </button>
      </div>
      <button
        className="flex items-center gap-2 pt-52 justify-center "
        onClick={handleLogout}
      >
        <CiLogout />
        <p>{asidebarlocalization.logOut}</p>
      </button>
    </div>
  );
}
