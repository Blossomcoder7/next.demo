import BrandingSeg from "@/_components/BrandingSeg";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row w-full max-h-screen overflow-hidden min-h-screen h-screen bg-[#262626]">
      <div className="w-1/2 h-full hidden md:flex flex-col justify-center items-center">
        <BrandingSeg />
      </div>
      <div className="md:w-1/2 w-full h-screen flex max-h-screen overflow-auto flex-col md:justify-center md:items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
