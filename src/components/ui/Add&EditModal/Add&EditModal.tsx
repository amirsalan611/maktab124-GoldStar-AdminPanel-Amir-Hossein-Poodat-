"use client";
import { useEffect, useState } from "react";
import { ModalLocalization } from "../../../constants/Localization/Localization";
import { BASE_URL } from "../../../services/API/API";
import axios from "axios";
import { toast } from "react-toastify";
import { useTableContext } from "../../shared/Table/tableContext/tableContext";
import ProductFormFields from "./ProductFormFields";
import ProductDetailsList from "./ProductDetailsList";
import ProductColorsList from "./ProductColorsList";
import ProductImagesUpload from "./ProductImagesUpload";

interface Image {
  file: File;
  preview: string;
}

interface FormData {
  name: string;
  brand: string;
  quantity: string;
  price: string;
  discount: string;
  description: string;
  category: string;
  subcategory: string;
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
    discount?: number;
    description: string;
    category: { _id: string; name: string };
    subcategory: { _id: string; name: string };
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
  const { setShouldRefetch } = useTableContext();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    brand: "",
    quantity: "",
    price: "",
    discount: "",
    description: "",
    category: "",
    subcategory: "",
    images: [],
    details: [
      {
        id: Date.now(),
        content: "",
      },
    ],
    colors: [
      {
        id: Date.now(),
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
  const filteredSubCategories = formData.subCategories.filter(
    (sub: any) => sub.category === selectedCategory
  );

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        name: data.name || "",
        brand: data.brand || "",
        quantity: data.quantity?.toString() || "",
        price: data.price?.toString() || "",
        discount: data.discount?.toString() || "",
        description: data.description || "",
        category: data.category._id || "",
        subcategory: data.subcategory._id || "",
        details: data.details.map((content, index) => ({
          id: Date.now() + index,
          content,
        })),
        colors: data.colors.map((content, index) => ({
          id: Date.now() + index,
          content,
        })),
        images: data.images.map((url) => ({
          file: new File([], url.split("/").pop() || ""),
          preview: url,
        })),
      }));
      setSelectedCategory(data.category._id);
      setSelectedSubCategory(data.subcategory._id);
    } else {
      setFormData((prev) => ({
        ...prev,
        name: "",
        brand: "",
        quantity: "",
        price: "",
        discount: "",
        description: "",
        category: "",
        subcategory: "",
        details: [{ id: Date.now(), content: "" }],
        colors: [{ id: Date.now(), content: "" }],
        images: [],
      }));
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        setFormData((prev) => ({
          ...prev,
          categories: response.data.data.categories,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/subcategories?limit=all`
        );
        setFormData((prev) => ({
          ...prev,
          subCategories: response.data.data.subcategories,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
    fetchSubCategories();
  }, [data]);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error(ModalLocalization.noImages);
      return;
    }

    const formEl = e.currentTarget;
    const fd = new FormData();

    formData.details.forEach((detail) => {
      if (detail.content.trim()) {
        fd.append("details[]", detail.content);
      }
    });

    formData.colors.forEach((color) => {
      if (color.content.trim()) {
        fd.append("colors[]", color.content);
      }
    });

    fd.append("name", formData.name);
    fd.append("brand", formData.brand);
    fd.append("quantity", formData.quantity);
    fd.append("price", formData.price);
    fd.append("discount", formData.discount || "0");
    fd.append("description", formData.description);
    fd.append("category", formEl.category.value);
    fd.append("subcategory", formEl.subcategory.value);

    formData.images.forEach((img) => {
      if (img.file instanceof File && img.file.size > 0) {
        fd.append("images", img.file);
      }
    });

    try {
      await axios.post(`${BASE_URL}/api/products`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(ModalLocalization.succes);
      formEl.reset();
      setFormData((prev) => ({
        ...prev,
        images: [],
        details: [{ id: Date.now(), content: "" }],
        colors: [{ id: Date.now(), content: "" }],
      }));
      setSelectedCategory(null);
      setFormData((prev) => ({
        ...prev,
        name: "",
        brand: "",
        quantity: "",
        price: "",
        discount: "",
        description: "",
        category: "",
        subcategory: "",

        images: [],
        details: [{ id: Date.now(), content: "" }],
        colors: [{ id: Date.now(), content: "" }],
      }));
      setShouldRefetch((prev) => !prev);
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "❌ خطا در ثبت محصول");
      console.error(err);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error(ModalLocalization.noImages);
      return;
    }

    const fd = new FormData();

    fd.append("name", formData.name);
    fd.append("brand", formData.brand);
    fd.append("quantity", formData.quantity);
    fd.append("price", formData.price);
    fd.append("discount", formData.discount || "0");
    fd.append("description", formData.description);
    fd.append("category", formData.category);
    fd.append("subcategory", formData.subcategory);

    formData.details.forEach((detail) => {
      if (detail.content.trim()) {
        fd.append("details[]", detail.content);
      }
    });

    formData.colors.forEach((color) => {
      if (color.content.trim()) {
        fd.append("colors[]", color.content);
      }
    });

    formData.images.forEach((img) => {
      if (img.file instanceof File && img.file.size > 0) {
        fd.append("images", img.file);
      }
    });

    try {
      await axios.patch(`${BASE_URL}/api/products/${data?._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(ModalLocalization.editSuccess);
      setShouldRefetch((prev) => !prev);
      setFormData((prev) => ({
        ...prev,
        name: "",
        brand: "",
        quantity: "",
        price: "",
        discount: "",
        description: "",
        category: "",
        subcategory: "",
        images: [],
        details: [{ id: Date.now(), content: "" }],
        colors: [{ id: Date.now(), content: "" }],
      }));
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "❌ خطا در ویرایش محصول");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setFormData((prev) => ({
        ...prev,
        details: [{ id: Date.now(), content: "" }],
        colors: [{ id: Date.now(), content: "" }],
        images: [],
      }));
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
      <div className="w-full h-full backdrop-blur-[1px] absolute top-0 left-0 brightness-[0.8]"></div>
      <div className="w-[80%] h-[80%] bg-white shadow-2xl rounded-xl p-2 z-10 flex flex-col justify-between">
        <form
          className="w-full h-full relative grid grid-rows-8 grid-cols-5 gap-x-5 gap-y-5 px-5 py-8 border border-gray-300 rounded-xl shadow"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onSubmit={data ? handleEdit : handleAdd}
        >
          <ProductImagesUpload
            images={formData.images}
            onImagesChange={(newImages) =>
              setFormData((prev) => ({ ...prev, images: newImages }))
            }
          />

          <ProductFormFields
            formData={formData}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            filteredSubCategories={filteredSubCategories}
            onFieldChange={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
            onCategoryChange={(value) => {
              setSelectedCategory(value);
              setFormData((prev) => ({ ...prev, category: value }));
            }}
            onSubCategoryChange={(value) => {
              setSelectedSubCategory(value);
              setFormData((prev) => ({ ...prev, subcategory: value }));
            }}
          />

          <ProductColorsList
            colors={formData.colors}
            onAddColor={() =>
              setFormData((prev) => ({
                ...prev,
                colors: [...prev.colors, { id: Date.now(), content: "" }],
              }))
            }
            onRemoveColor={(id) => {
              if (formData.colors.length > 1) {
                setFormData((prev) => ({
                  ...prev,
                  colors: prev.colors.filter((color) => color.id !== id),
                }));
              } else {
                toast.error("حداقل یک رنگ باید وجود داشته باشد");
              }
            }}
            onUpdateColor={(id, content) =>
              setFormData((prev) => ({
                ...prev,
                colors: prev.colors.map((color) =>
                  color.id === id ? { ...color, content } : color
                ),
              }))
            }
          />

          <ProductDetailsList
            details={formData.details}
            onAddDetail={() =>
              setFormData((prev) => ({
                ...prev,
                details: [...prev.details, { id: Date.now(), content: "" }],
              }))
            }
            onRemoveDetail={(id) => {
              if (formData.details.length > 1) {
                setFormData((prev) => ({
                  ...prev,
                  details: prev.details.filter((detail) => detail.id !== id),
                }));
              } else {
                toast.error("حداقل یک جزئیات باید وجود داشته باشد");
              }
            }}
            onUpdateDetail={(id, content) =>
              setFormData((prev) => ({
                ...prev,
                details: prev.details.map((detail) =>
                  detail.id === id ? { ...detail, content } : detail
                ),
              }))
            }
          />

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
              {data
                ? ModalLocalization.editProduct
                : ModalLocalization.addProduct}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
