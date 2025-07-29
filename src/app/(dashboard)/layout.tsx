"use client";

import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
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
  return <>{children}</>;
};

export default Layout;
