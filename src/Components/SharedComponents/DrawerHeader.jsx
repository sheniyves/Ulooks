import React from "react";
import arrowLeft from "../../assets/Images/arrow-left.svg";
const DrawerHeader = ({ title, drawerRef }) => {
  return (
    <>
      <div
        onClick={() => drawerRef.current?.closeDrawer()}
        className="flex items-center gap-2 my-6 cursor-pointer"
      >
        <img src={arrowLeft} alt="Arrow left" />
        <h1 className="font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion  text-[1.75rem]">
          {title}
        </h1>
      </div>
    </>
  );
};

export default DrawerHeader;
