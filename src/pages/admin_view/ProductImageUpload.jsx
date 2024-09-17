import React, { useEffect, useRef } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { FcImageFile } from "react-icons/fc";
import { axiosPrivate } from "../../customAxios/privateAxios";
import { ImageLoader } from "../../components/common/Loading";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  setImageLoading,
  imageLoading,
  currentEditedId,
}) => {

  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  console.log(imageFile);

  const uploadImageToCloudinary = async () => {
    try {
      setImageLoading(true)
      const data = new FormData();
      data.append("file", imageFile);
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axiosPrivate.post(
        "/api/admin/products/upload-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response?.data?.success) {
        setUploadImageUrl(response?.data?.result?.url);
        setImageLoading(false);
      }
    } catch (err) {
      console.log("Error Occured", err);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <label className="text-lg font-semibold mb-2 block">
        Upload Product Image
      </label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={currentEditedId}
        />
       {imageFile ? (
        imageLoading ? <ImageLoader/> :
            <div className="flex items-center justify-start">
            <div className="flex items-center">
            <FcImageFile className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <button
            className="absolute right-10 text-black hover:text-gray-800"
            onClick={handleRemoveImage}
            >
            ✕
          </button>
          {/* <span>Remove File</span> */}
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className={`${currentEditedId ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <LuUploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to upload image</span>
            </label>
          )}
          </div>
          </div>
  );
};

export default ProductImageUpload;
