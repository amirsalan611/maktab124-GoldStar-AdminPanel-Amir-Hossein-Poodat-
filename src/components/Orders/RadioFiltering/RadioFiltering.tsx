import { ordersLocalization } from "../../../constants/Localization/Localization";

interface Props {
  checked: "ALL" | "DELIVERED" | "NOT_DELIVERED";
  onChange: (value: "ALL" | "DELIVERED" | "NOT_DELIVERED") => void;
}

export default function RadioFiltering({ checked, onChange }: Props) {
  return (
    <div className="flex gap-4 items-center m-auto">
      <div className="flex gap-1">
        <input
          id="all"
          className="accent-red-500"
          type="radio"
          name="filter"
          value="ALL"
          checked={checked === "ALL"}
          onChange={() => onChange("ALL")}
        />
        <label className="flex items-center gap-1" htmlFor="all">
          {ordersLocalization.all}
        </label>
      </div>
      <div className="flex gap-1">
        <input
          id="DELIVERED"
          className="accent-red-500"
          type="radio"
          name="filter"
          value="DELIVERED"
          checked={checked === "DELIVERED"}
          onChange={() => onChange("DELIVERED")}
        />
        <label className="flex items-center gap-1" htmlFor="DELIVERED">
          {ordersLocalization.DELIVERED}
        </label>
      </div>
      <div className="flex gap-1">
        <input
          id="NOT_DELIVERED"
          className="accent-red-500"
          type="radio"
          name="filter"
          value="NOT_DELIVERED"
          checked={checked === "NOT_DELIVERED"}
          onChange={() => onChange("NOT_DELIVERED")}
        />
        <label className="flex items-center gap-1" htmlFor="NOT_DELIVERED">
          {ordersLocalization.NOT_DELIVERED}
        </label>
      </div>
    </div>
  );
}
