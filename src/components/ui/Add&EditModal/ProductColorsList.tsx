import { ModalLocalization } from "../../../constants/Localization/Localization";
import InputForm from "../../shared/Input/FormInput/FormInput";

interface Color {
  id: number;
  content: string;
}

interface ProductColorsListProps {
  colors: Color[];
  onAddColor: () => void;
  onRemoveColor: (id: number) => void;
  onUpdateColor: (id: number, content: string) => void;
}

export default function ProductColorsList({
  colors,
  onAddColor,
  onRemoveColor,
  onUpdateColor,
}: ProductColorsListProps) {
  return (
    <div className="flex flex-col overflow-y-auto pt-1 gap-7 col-span-1 row-span-5 row-start-3 col-start-2 items-center scrollbar-thin scrollbar-none">
      <p className="absolute top-44 right-[24%]">{ModalLocalization.colors}</p>
      {colors.map((item) => (
        <div key={item.id} className="flex gap-1 relative">
          <InputForm
            label=""
            name="colors"
            type="text"
            value={item.content}
            onChange={(e) => onUpdateColor(item.id, e.target.value)}
          />
          <button
            type="button"
            className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full hover:bg-red-50 absolute top-[5px] left-1"
            onClick={() => onRemoveColor(item.id)}
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
        onClick={onAddColor}
      >
        {ModalLocalization.addColor}
      </button>
    </div>
  );
}
