import React, { useState } from "react";
import { useController } from "react-hook-form";
import { FaEye  , FaEyeSlash   } from "react-icons/fa";

const InputField = ({ name, control, label, type = "text", placeholder, icon, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full text-indigo-300">
      {/* Label */}
      {label && <label className="block text-gray-700 mb-1">{label}</label>}

      {/* Input + Icon */}
      <div className="relative bg-[#333A5C] w-full px-5 py-2.5  rounded-full  flex items-center gap-3">
        {icon &&  <i className="text-lg">{icon}</i>} 
        <input
          {...field}
          type={inputType}
          placeholder={placeholder}
          className={`w-full placeholder:capitalize outline-none`}
          {...props}
        />
        {/* Toggle password */}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-5 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
          </button>
        )}
      </div>

      {/* Hiển thị lỗi */}
      {error && <p className="text-red-400 font-light text-xs ml-4 mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;


