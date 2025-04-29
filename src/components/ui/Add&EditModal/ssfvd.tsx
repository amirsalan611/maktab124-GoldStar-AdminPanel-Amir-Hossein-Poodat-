"use client";
import { useEffect, useState } from "react";
import { ModalLocalization } from "../../../constants/Localization/Localization";
import InputForm from "../../shared/Input/FormInput/FormInput";
import ImageInput from "../../shared/Input/ImageInput/ImageInput";
import { BASE_URL } from "../../../services/API/API";
import axios from "axios";
import ModalSelectOption from "../../shared/ModalSelectOption/ModalSelectOption";
import { toast } from "react-toastify";
import { useTableContext } from "../../shared/Table/tableContext/tableContext";

interface Image {
  file: File;
  preview: string;
}

interface FormData {
  images: Image[];
  details: { id: number; content: string }[];
  colors: { id: number; content: string }[];
  categories: [];
  subCategories: [];
}

interface AddAndEditModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  data?: {
    _id: string;
    name: string;
    brand: string;
    quantity: number;
    price: number;
    description: string;
    category: string;
    subcategory: string;
    details: string[];
    colors: string[];
    images: string[];
  };
}

export default function AddAndEditModal({
  isModalOpen,
  data,
  onClose,
}: AddAndEditModalProps) {
  console.log(data);
  const { setShouldRefetch } = useTableContext();
  const [formData, setFormData] = useState<FormData>({
    images: [],
    details: [
      {
        id: 1,
        content: "",
      },
    ],
    colors: [
      {
        id: 1,
        content: "",
      },
    ],
    categories: [],
    subCategories: [],
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        details: data.details.map((content, index) => ({
          id: index + 1,
          content,
        })),
        colors: data.colors.map((content, index) => ({
          id: index + 1,
          content,
        })),
        images: data.images.map((url) => ({
          file: new File([], url.split("/").pop() || ""),
          preview: url,
        })),
      }));
      setSelectedCategory(data.category);
      setSelectedSubCategory(data.subcategory);
    }
  }, [data]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error(ModalLocalization.noImages);
      return;
    }

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const detailsArr = formData.details
      .map((detail) => detail.content)
      .filter(Boolean);
    const colorsArr = formData.colors
      .map((color) => color.content)
      .filter(Boolean);

    formData.images.forEach((img) => fd.append("images", img.file));
    fd.append("details", JSON.stringify(detailsArr));
    fd.append("colors", JSON.stringify(colorsArr));
    fd.append(
      "name",
      (formEl.elements.namedItem("name") as HTMLInputElement).value
    );
    fd.append(
      "quantity",
      (formEl.elements.namedItem("quantity") as HTMLInputElement).value
    );
    fd.append(
      "price",
      (formEl.elements.namedItem("price") as HTMLInputElement).value
    );
    fd.append(
      "brand",
      (formEl.elements.namedItem("brand") as HTMLInputElement).value
    );
    fd.append(
      "description",
      (formEl.elements.namedItem("description") as HTMLTextAreaElement).value
    );
    fd.append("category", selectedCategory || "");
    fd.append("subcategory", selectedSubCategory || "");

    try {
      if (data) {
        await axios.patch(`${BASE_URL}/api/products/${data._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(ModalLocalization.editSuccess);
      } else {
        await axios.post(`${BASE_URL}/api/products`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(ModalLocalization.succes);
      }

      formEl.reset();
      setFormData((prev) => ({
        ...prev,
        images: [],
        details: [{ id: 1, content: "" }],
        colors: [{ id: 1, content: "" }],
      }));
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setShouldRefetch((prev) => !prev);
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "❌ خطا در ثبت محصول");
      console.error(err);
    }
  };

  if (!isModalOpen) return null;
  return (
    <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
      <div className="w-full h-full backdrop-blur-[1px] absolute top-0 left-0 brightness-[0.8]"></div>
      <div className="w-[80%] h-[80%] bg-white shadow-2xl rounded-xl p-2 z-10 flex flex-col justify-between">
        <form
          className="w-full h-full relative grid grid-rows-8 grid-cols-5 gap-x-5 gap-y-5 px-5 py-8 border border-gray-300 rounded-xl shadow"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onSubmit={handelSubmit}
        >
          <div className="col-span-5 row-start-1 row-end-3">
            <ImageInput
              images={formData.images}
              setImages={(newImages) =>
                setFormData((prev) => ({
                  ...prev,
                  images: Array.isArray(newImages)
                    ? newImages
                    : newImages(prev.images),
                }))
              }
            />
          </div>
          <InputForm
            label={ModalLocalization.name}
            className="col-span-1 row-start-3 pt-1 justify-self-center"
            name="name"
            type="text"
            defaultValue={data?.name}
          />
          <InputForm
            label={ModalLocalization.brand}
            className="col-span-1 row-start-4 col-start-1 justify-self-center"
            name="brand"
            type="text"
            defaultValue={data?.brand}
          />
          <InputForm
            label={ModalLocalization.quantity}
            className="col-span-1 row-start-5 col-start-1 justify-self-center"
            name="quantity"
            type="text"
            defaultValue={data && String(data.quantity)}
          />
          <InputForm
            label={ModalLocalization.price}
            className="col-span-1 row-start-6 col-start-1 justify-self-center"
            name="price"
            type="text"
            defaultValue={data && String(data.price)}
          />
          <div className="flex flex-col overflow-y-auto pt-1 gap-7 col-span-1 row-span-5 row-start-3 col-start-2 items-center scrollbar-thin scrollbar-none">
            <p className="absolute top-44 right-[24%]">
              {ModalLocalization.colors}
            </p>
            {formData.colors.map((item, index) => (
              <div key={item.id} className="flex gap-1 relative">
                <InputForm
                  label=""
                  name="colors"
                  type="text"
                  defaultValue={data && String(data.colors[index])}
                />
                <button
                  type="button"
                  className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full hover:bg-red-50 absolute top-[5px] left-1"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      colors: prev.colors.filter((c) => c.id !== item.id),
                    }))
                  }
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
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  colors: [...prev.colors, { id: Date.now(), content: "" }],
                }))
              }
            >
              {ModalLocalization.addColor}
            </button>
          </div>
          <InputForm
            label={ModalLocalization.description}
            className="col-span-2 row-span-2 row-start-3 col-start-3 pt-1"
            name="description"
            type="textarea"
            defaultValue={data && String(data.description)}
          />
          <ModalSelectOption
            className="col-span-2 row-start-5 col-start-3"
            name="category"
            options={formData.categories}
            setSelectedCategory={setSelectedCategory}
          />
          <ModalSelectOption
            className="col-span-2 row-start-6 col-start-3"
            name="subcategory"
            options={formData.subCategories}
            disabled={!selectedCategory}
          />
          <div className="w-full flex flex-col overflow-y-auto pt-1 gap-7 col-span-1 row-span-5 row-start-3 col-start-5 items-center scrollbar-thin scrollbar-none">
            <p className="absolute top-44 left-[13%]">
              {ModalLocalization.details}
            </p>
            {formData.details.map((item, index) => (
              <div key={item.id} className="flex items-center gap-1 relative">
                <InputForm
                  label=""
                  name="details"
                  type="textarea"
                  defaultValue={data && String(data.details[index])}
                />
                <button
                  type="button"
                  className=" text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-50 transition-colors rounded-full absolute top-[0PX] left-[-10PX]"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      details: prev.details.filter((c) => c.id !== item.id),
                    }))
                  }
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
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  details: [...prev.details, { id: Date.now(), content: "" }],
                }))
              }
            >
              {ModalLocalization.addInput}
            </button>
          </div>

          <div className="flex justify-center items-end gap-5 col-span-5 row-start-8">
            <button
              className="bg-red-600 text-white px-4 h-10 rounded-md hover:bg-red-700 transition-all duration-300"
              onClick={onClose}
            >
              {ModalLocalization.exit}
            </button>
            <button
              className="bg-blue-500 text-white px-4 h-10 rounded-md hover:bg-blue-700 transition-all duration-300"
              type="submit"
            >
              {ModalLocalization.addProduct}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
