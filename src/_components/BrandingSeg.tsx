"use client";
import clsx from "clsx";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const BrandingSeg = () => {
  const pathname = usePathname();
  const isContactUs = pathname.includes("contact-us");
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
        {isContactUs ? null : (
          <div
            onClick={() => redirect("/contact-us")}
            className={clsx(
              " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]",
              "col-span-1"
            )}
          >
            Contact Us
          </div>
        )}
      </div>
    </>
  );
};

export default BrandingSeg;
