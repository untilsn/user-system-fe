import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ProductImage = ({ image, id, moveImage, handleDelete }) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { id },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        moveImage(draggedItem.id, id);
        draggedItem.id = id;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="cursor-pointer flex items-center justify-between p-2 rounded-lg border border-gray-300 w-full">
      <div className="flex items-center gap-2">
        <img src={image.preview} alt="" className="w-20 h-20 rounded-sm" />
        <div>
          <h1>{image.file.name}</h1>
          <span>{(image.file.size / 1024).toFixed(1)} KB</span>
        </div>
      </div>
      <button
        className="max-w-[100px] w-full bg-red-400 rounded-sm text-white"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ProductImage;
