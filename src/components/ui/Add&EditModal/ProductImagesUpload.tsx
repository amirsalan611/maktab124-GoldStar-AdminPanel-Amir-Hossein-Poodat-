import ImageInput from "../../shared/Input/ImageInput/ImageInput";

interface Image {
  file: File;
  preview: string;
}

interface ProductImagesUploadProps {
  images: Image[];
  onImagesChange: (images: Image[]) => void;
}

export default function ProductImagesUpload({
  images,
  onImagesChange,
}: ProductImagesUploadProps) {
  return (
    <div className="col-span-5 row-start-1 row-end-3">
      <ImageInput
        images={images}
        setImages={(value) => {
          if (typeof value === "function") {
            onImagesChange(value(images));
          } else {
            onImagesChange(value);
          }
        }}
      />
    </div>
  );
}
