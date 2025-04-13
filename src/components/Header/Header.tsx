import { useEffect, useState } from "react";
import { headerLocalization } from "../../constants/Localization/Localization";
import Loader from "../Loading/Loading";
import warning from "../../assets/images/warning.svg"
import adminPhoto from "../../assets/images/adminPhoto.jpg"

export default function Header() {
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
try {
  const getAdminData = JSON.parse(localStorage.getItem("adminData") || "{}");
  setAdminData(getAdminData);
  setLoading(false);
} catch (error) {
  setError(true);
  console.log(error);
} finally {
  setLoading(false);
}
  }, []);

  console.log(adminData);

  if (loading)
    return (
      <div className="p-5 bg-gray-100 shadow-sm w-full ">
        <Loader />
      </div>
    );
  if (error) return <div className=" bg-gray-100 shadow-sm w-full">
    <img src={warning} alt="warning" className="w-32 py-2 m-auto" />
    <p className="text-center">{headerLocalization.warning}</p>
  </div>;

  return (
    <div
      dir="ltr"
      className="p-5 flex gap-2 self-end bg-gray-100 shadow-sm w-full"
    >
      <div className="w-14 h-14 border border-black rounded-full overflow-hidden">
        <img
          src={
            adminPhoto
          }
          alt="profile picture"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-2xl">{adminData.username}</p>
        <p className="">{headerLocalization.admin}</p>
      </div>
    </div>
  );
}
