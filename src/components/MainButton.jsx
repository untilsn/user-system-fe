import { Button } from '@material-tailwind/react';
import React from 'react';

const MainButton = ({
  type = "button",
  children,
  isLoading = false,
  onClick = () => { }
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      loading={isLoading}
      className={`w-full py-3 rounded-full mt-6 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 
        hover:opacity-90 transition flex items-center justify-center gap-2
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {children}
    </Button>
  );
};

export default MainButton;
