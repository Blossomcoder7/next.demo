"use client";

import LogOutBtn from "@/_components/LogOutBtn";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import { redirect, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  if (status !== "loading" && status === "unauthenticated") {
    return router.push("/login");
  }
  if (status === "loading") {
    return (
      <div className=" flex justify-center items-center w-full h-screen">
        <CircularProgress size={20} sx={{ color: "gold" }} />
      </div>
    );
  }
  return (
    <div className="w-full bg-[#262626] h-full flex flex-col mt-14 py-14 relative">
      <div className="fixed top-3 z-10 h-10 w-full flex items-center justify-end gap-2 px-4">
        <div
          className={clsx(
            " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-1.5 rounded-[33px]"
          )}
          onClick={() => redirect("/")}
        >
          Home
        </div>
        <div
          className={clsx(
            " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-1.5 rounded-[33px]"
          )}
          onClick={() => redirect("/movies")}
        >
          Movies
        </div>
        <div
          className={clsx(
            " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-1.5 rounded-[33px]"
          )}
          onClick={() => redirect("/profile")}
        >
          Profile
        </div>
        <div
          className={clsx(
            " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-1.5 rounded-[33px]"
          )}
        >
          <LogOutBtn />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
