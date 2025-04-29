import { useContext, useEffect, useState } from "react";
import AsideContext from "../Context/Context";
import {
  asidebarlocalization,
  headerLocalization,
} from "../../constants/Localization/Localization";
import { AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaDropbox, FaUsers } from "react-icons/fa";
import warning from "../../assets/images/warning.svg";
import { CiLogout } from "react-icons/ci";
import adminPhoto from "../../assets/images/adminPhoto.jpg";
import Loader from "../Loading/Loading";

export default function Aside() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    navigate("/");
  };

  const asideContext = useContext(AsideContext);

  const { activeComponent, setActiveComponent }: any = asideContext;

  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const getAdminData = JSON.parse(
        localStorage.getItem("adminData") || "{}"
      );
      setAdminData(getAdminData);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="p-5 bg-gray-100 shadow-sm w-full ">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className=" bg-gray-100 shadow-sm w-full">
        <img src={warning} alt="warning" className="w-32 py-2 m-auto" />
        <p className="text-center">{headerLocalization.warning}</p>
      </div>
    );

  return (
    <div className="h-screen bg-primary text-white shadow-xl p-10 flex flex-col justify-between w-[300px]">
      <div dir="ltr" className="p-5 flex gap-2 self-end shadow-b-xl w-full">
        <div className="w-14 h-14 border border-black rounded-full overflow-hidden">
          <img src={adminPhoto} alt="profile picture" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl">{adminData.username}</p>
          <p className="">{headerLocalization.admin}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center text-xl">
        <button
          className={`flex items-center justify-center gap-2 px-4 py-1 rounded-lg w-full ${
            activeComponent === "products" ? "bg-secondPrimary text-black" : ""
          }`}
          onClick={() => setActiveComponent("products")}
        >
          <AiFillProduct />
          <p>{asidebarlocalization.products}</p>
        </button>
        <button
          className={`flex items-center justify-center gap-2 py-1 rounded-lg w-full ${
            activeComponent === "inventory" ? "bg-secondPrimary text-black" : ""
          }`}
          onClick={() => setActiveComponent("inventory")}
        >
          <FaDropbox />
          <p>{asidebarlocalization.inventory}</p>
        </button>
        <button
          className={`flex items-center justify-center gap-2 px-4 py-1 rounded-lg w-full ${
            activeComponent === "orders" ? "bg-secondPrimary text-black" : ""
          }`}
          onClick={() => setActiveComponent("orders")}
        >
          <BiSolidMessageDetail />
          <p>{asidebarlocalization.orders}</p>
        </button>{" "}
        <button
          className={`flex items-center justify-center gap-2 py-1 rounded-lg w-full ${
            activeComponent === "users" ? "bg-secondPrimary text-black" : ""
          }`}
          onClick={() => setActiveComponent("users")}
        >
          <FaUsers />
          <p>{asidebarlocalization.users}</p>
        </button>
      </div>
      <button
        className="flex items-center gap-2 mt-52 justify-center  hover:bg-slate-800 hover:text-white p-2 rounded-lg"
        onClick={handleLogout}
      >
        <CiLogout />
        <p className="text-[16px] font-semibold">
          {asidebarlocalization.logOut}
        </p>
      </button>
    </div>
  );
}
