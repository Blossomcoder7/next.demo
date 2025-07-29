"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const BrandingSeg = () => {
  return (
    <>
      <div className="col-span-full bg-[#d9b9891c]  md:col-span-1 h-full flex-1  w-full  flex flex-col items-center px-5 justify-center space-y-5">
        <div
          onClick={() => {
            redirect("/");
          }}
          className="font-bold cursor-pointer hover:shadow-sm   flex flex-nowrap justify-center items-center gap-4 inter text-[#d9b989] w-fit  text-center text-[clamp(50px,5vw,130px)] uppercase "
        >
          <div className=" w-40 h-40 relative">
            <Image
              src={"/fav.webp"}
              alt="logo"
              fill
              className="w-full h-full object-center object-contain"
            ></Image>
          </div>
          <span>Odyssey</span>
        </div>
      </div>
    </>
  );
};

export default BrandingSeg;
