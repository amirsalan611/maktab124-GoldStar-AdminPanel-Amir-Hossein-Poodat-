import { useEffect, useState } from "react";
import getAdminBio from "../../services/auth/getAdminBio/getAdminBio";
import { BASE_URL } from "../../services/API/API";
import { headerLocalization } from "../../constants/Localization/Localization";
import Loader from "../Loading/Loading";
import warning from "../../assets/images/warning.svg"

export default function Header() {
  const [adminBio, setAdminBio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAdminBio = async () => {
      try {
        const data = await getAdminBio();
        setAdminBio(data);
      } catch (error) {
        setError(true);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchAdminBio();
  }, []);

  console.log(adminBio);

  if (loading)
    return (
      <div className="p-5  bg-gray-100 shadow-sm w-full">
        <Loader />
      </div>
    );
  if (error) return <div className=" bg-gray-100 shadow-sm w-full">
    <img src={warning} alt="warning" className="w-32 py-2" />
    <p>{headerLocalization.warning}</p>
  </div>;

  return (
    <div dir="ltr" className="p-5 flex gap-2 self-end bg-gray-100 shadow-sm w-full">
      <div className="w-14 border border-black rounded-full overflow-hidden">
        <img
          src={BASE_URL + adminBio.image || "https://via.placeholder.com/150"}
          alt="profile picture"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-2xl">{adminBio.name}</p>
        <p className="">{headerLocalization.admin}</p>
      </div>
    </div>
  );
}
