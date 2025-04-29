import { toast } from "react-toastify";
import { ModalLocalization } from "../../../../constants/Localization/Localization";

interface Image {
  file: File;
  preview: string;
}

const ImageInput = ({
  images,
  setImages,
}: {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 6) return toast.error(ModalLocalization.maxImages);
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev: Image[]) => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev: Image[]) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };
  console.log(images);
  return (
    <div className="border border-dashed border-gray-400 py-5 px-4 rounded-lg flex items-center justify-start gap-5">
      <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded min-w-[110px] text-center">
        {ModalLocalization.addImage}
        <input
          type="file"
          multiple
          onChange={handleChange}
          accept="image/*"
          className="hidden"
        />
      </label>

      <div className="grid grid-cols-6 grid-rows-1 items-center justify-center gap-4 w-full">
        {images.length > 0 ? (
          images.map((img: Image, index: number) => (
            <div key={index} className="relative group">
              <img
                src={
                  img.preview.startsWith("blob:")
                    ? img.preview
                    : `http://${img.preview}`
                }
                alt={`image-${index}`}
                className="h-16 w-full object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                onClick={() => removeImage(index)}
              >
                <svg
                  className="w-4 h-4"
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
          ))
        ) : (
          <div className="w-full h-full py-5 row-span-3 col-span-6 bg-gray-200 justify-self-center rounded-lg text-center">
            <p className="text-gray-500">{ModalLocalization.noImages}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
