
import goldstar from "../../assets/images/goldStar.jpg";


export default function Header() {

  return (
    <div
      dir="ltr"
      className="py-5 px-10 flex justify-center gap-2 self-end border-b shadow-b-xl w-full"
    >
      <div className="flex gap-2 items-center">
        <img src={goldstar} alt="logo" className="w-[50px] rounded-full" />
        <p className="text-[25px] poppins-medium text-orange-300b font-semibold">Gold Star</p>
      </div>
    </div>
  );
}
