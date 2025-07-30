"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = ({ _id }: { _id?: string }) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => {
          router.push(`/movies/details/${_id}`);
        }}
        className="w-11/12 min-h-fit  hover:transform-3d hover:-translate-y-2 transition-all duration-200 ease-in cursor-pointer hover:bg-[#262626de] mx-auto py-3 rounded-[33px]  flex items-center justify-center bg-[#262626] text-[#fcfcfc]"
      >
        More Details
      </div>
    </>
  );
};

export default Button;
