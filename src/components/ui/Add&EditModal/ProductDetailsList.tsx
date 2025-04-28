import { ModalLocalization } from "../../../constants/Localization/Localization";
import InputForm from "../../shared/Input/FormInput/FormInput";

interface Detail {
  id: number;
  content: string;
}

interface ProductDetailsListProps {
  details: Detail[];
  onAddDetail: () => void;
  onRemoveDetail: (id: number) => void;
  onUpdateDetail: (id: number, content: string) => void;
}

export default function ProductDetailsList({
  details,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail,
}: ProductDetailsListProps) {
  return (
    <div className="w-full flex flex-col overflow-y-auto pt-1 gap-7 col-span-1 row-span-5 row-start-3 col-start-5 items-center scrollbar-thin scrollbar-none">
      <p className="absolute top-44 left-[13%]">{ModalLocalization.details}</p>
      {details.map((item) => (
        <div key={item.id} className="flex items-center gap-1 relative">
          <InputForm
            label=""
            name="details"
            type="textarea"
            value={item.content}
            onChange={(e) => onUpdateDetail(item.id, e.target.value)}
          />
          <button
            type="button"
            className="text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-50 transition-colors rounded-full absolute top-[0PX] left-[-10PX]"
            onClick={() => onRemoveDetail(item.id)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white px-4 min-h-10 rounded-md hover:bg-blue-700 transition-all duration-300"
        onClick={onAddDetail}
      >
        {ModalLocalization.addInput}
      </button>
    </div>
  );
}
