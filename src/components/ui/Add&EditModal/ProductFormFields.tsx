import { ModalLocalization } from "../../../constants/Localization/Localization";
import InputForm from "../../shared/Input/FormInput/FormInput";
import ModalSelectOption from "../../shared/ModalSelectOption/ModalSelectOption";

interface ProductFormFieldsProps {
  formData: {
    name: string;
    brand: string;
    quantity: string;
    price: string;
    discount: string;
    description: string;
    category: string;
    subcategory: string;
    categories: any[];
    subCategories: any[];
  };
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  filteredSubCategories: any[];
  onFieldChange: (field: string, value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
}

export default function ProductFormFields({
  formData,
  selectedCategory,
  selectedSubCategory,
  filteredSubCategories,
  onFieldChange,
  onCategoryChange,
  onSubCategoryChange,
}: ProductFormFieldsProps) {
  return (
    <>
      <InputForm
        label={ModalLocalization.name}
        className="col-span-1 row-start-3 pt-1 justify-self-center"
        name="name"
        type="text"
        value={formData.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
      />
      <InputForm
        label={ModalLocalization.brand}
        className="col-span-1 row-start-4 col-start-1 justify-self-center"
        name="brand"
        type="text"
        value={formData.brand}
        onChange={(e) => onFieldChange("brand", e.target.value)}
      />
      <InputForm
        label={ModalLocalization.quantity}
        className="col-span-1 row-start-5 col-start-1 justify-self-center"
        name="quantity"
        type="text"
        value={formData.quantity}
        onChange={(e) => onFieldChange("quantity", e.target.value)}
      />
      <InputForm
        label={ModalLocalization.price}
        className="col-span-1 row-start-6 col-start-1 justify-self-center"
        name="price"
        type="text"
        value={formData.price}
        onChange={(e) => onFieldChange("price", e.target.value)}
      />
      <InputForm
        label={ModalLocalization.discount}
        className="col-span-1 row-start-7 col-start-1 justify-self-center"
        name="discount"
        type="text"
        value={formData.discount}
        onChange={(e) => onFieldChange("discount", e.target.value)}
      />
      <InputForm
        label={ModalLocalization.description}
        className="col-span-2 row-span-2 row-start-3 col-start-3 pt-1"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={(e) => onFieldChange("description", e.target.value)}
      />
      <ModalSelectOption
        className="col-span-2 row-start-5 col-start-3"
        name="category"
        options={formData.categories}
        setSelectedCategory={onCategoryChange}
        selectedCategory={selectedCategory}
      />
      <ModalSelectOption
        className="col-span-2 row-start-6 col-start-3"
        name="subcategory"
        options={filteredSubCategories}
        disabled={!selectedCategory}
        setSelectedCategory={onSubCategoryChange}
        selectedSubCategory={selectedSubCategory}
      />
    </>
  );
}
