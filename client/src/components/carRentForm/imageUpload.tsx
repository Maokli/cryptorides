import React, { ChangeEvent, useState } from "react";

interface PictureUploadProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDiscard: () => void;
  required?: boolean;
}

const PictureUpload: React.FC<PictureUploadProps> = ({
  onChange,
  onDiscard,
  required,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        e.target.value = '';
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
  

  const handleDiscard = () => {
    setPreviewUrl(null);
    if (onDiscard) {
      onDiscard();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-64 h-64 p-8 bg-gray-100 rounded-xl relative">
  {previewUrl ? (
    <>
      <img src={previewUrl} alt="Preview" className="w-48 h-48 object-cover" />
      <button onClick={handleDiscard} className="absolute top-2 right-2 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" stroke="#85A8F8" />
        </svg>
      </button>
    </>
  ) : (
    <label className="cursor-pointer">
      <img src="images/gallery.svg" alt="Upload Icon" className="w-32 h-32 mb-4" />
      <input
        type="file"
        accept="image/*"
        required={required}
        onChange={(e) => {
          handleImagePreview(e);
          onChange(e);
        }}
        className="hidden"
      />
    </label>
  )}
</div>
  );
};

export default PictureUpload;
