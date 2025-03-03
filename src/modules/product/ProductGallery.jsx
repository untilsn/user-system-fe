import React, { useState, useEffect } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid"
import ProductImage from "./ProductImage";

const ProductGallery = ({ onUpload }) => {
  const [images, setImages] = useState([]);
  console.log(images)
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return; // Ngăn sự kiện nếu không có file nào được chọn
    console.log(acceptedFiles)
    if (images.length + acceptedFiles.length > 5) {
      alert("Không quá 5 ảnh!");
      return;
    }

    const previewImages = acceptedFiles.map((file, index) => ({
      id: `${file.name}-${uuidv4()}`, // Sử dụng name + lastModified để tạo id duy nhất
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previewImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
    },
    multiple: true,
    onDrop,
  });

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);
  /* Mỗi khi images thay đổi, useEffect sẽ được chạy.
Khi component bị unmount, thực hiện revokeObjectURL để giải phóng bộ nhớ. */

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image.file));
  };

  const handleDelete = (id) => {
    setImages((prev) => {
      const newImages = prev.filter((image) => image.id !== id);
      return newImages;
    });
  };

  const moveImage = (draggedId, targetId) => {
    setImages((prevImages) => {
      const draggedIndex = prevImages.findIndex((img) => img.id === draggedId);
      const targetIndex = prevImages.findIndex((img) => img.id === targetId);
  
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newImages = [...prevImages];
        const [draggedImage] = newImages.splice(draggedIndex, 1);
        newImages.splice(targetIndex, 0, draggedImage);
        return newImages;
      }
      return prevImages;
    });
  };
  


  return (
    <div>
      <h1 className="text-xl mb-5 font-semibold">Drag & Drop images upload</h1>
      <label
        htmlFor="upload"
        {...getRootProps()}
        className="flex flex-col items-center justify-center gap-5 rounded-xl h-80 border border-dashed p-5 mb-2 cursor-pointer"
      >
        <input id="upload" className="hidden" type="file" {...getInputProps()} />
        <BsCloudUpload size="80px" />
        {isDragActive ? (
          <p className="font-semibold text-xl text-gray-600">Drop images here</p>
        ) : (
          <p className="font-semibold text-xl text-gray-600">
            Drop files here or click to upload.
          </p>
        )}
      </label>

      <div className="flex flex-col gap-2 items-start w-full mb-5">
        {images.map((image) => (
          // <div
          //   key={image.id} // Sử dụng id thay vì index
          //   className="flex items-center justify-between p-2 rounded-lg border border-gray-300 w-full"
          // >
          //   <div className="flex items-center gap-2">
          //     <img src={image.preview} alt="" className="w-20 h-20 rounded-sm" />
          //     <div>
          //       <h1>{image.file.name}</h1>
          //       <span>{(image.file.size / 1024).toFixed(1)} KB</span>
          //     </div>
          //   </div>
          //   <button
          //     className="max-w-[100px] w-full bg-red-400 rounded-sm text-white"
          //     onClick={() => handleDelete(image.id)}
          //   >
          //     Delete
          //   </button>
          // </div>
          <ProductImage key={image.id} image={image} id={image.id} moveImage={moveImage} handleDelete={handleDelete}></ProductImage>  
        ))}
      </div>

      <button
        className="max-w-40 w-full bg-blue-400 rounded-sm text-white text-xl font-semibold p-2 capitalize"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default ProductGallery;
