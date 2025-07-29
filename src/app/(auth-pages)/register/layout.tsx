"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isUser = pathname.includes("user");
  return (
    <div className="flex min-h-screen flex-col w-full  text-white">
      {/* Left: Registration Navigation/Content */}
      <div className="py-10 flex w-full h-fit flex-col justify-center items-center bg-[#d9b989]">
        <p className="flex gap-4 w-full px-8 font-semibold uppercase justify-center items-center text-lg text-center">
          Registering as {isUser ? "user" : "client"}
        </p>
      </div>
      <div className="w-full  flex flex-col items-center justify-center p-8 ">
        <div className="w-full">{children}</div>
        <div className="my-2 text-[#fcfcfc] text-xs w-full text-center">
          <p className="inline mr-1">Already have an account?</p>
          <a
            href="/login"
            className="underline hover:text-indigo-50 inline font-medium transition"
          >
            Login &rarr;
          </a>
        </div>
        {isUser ? (
          <>
            <Link
              href={{
                pathname: "/register/client",
              }}
              className="font-semibold text-xs underline underline-offset-8 "
            >
              Register as a Client Instead ?
            </Link>
          </>
        ) : (
          <>
            <Link
              href={{
                pathname: "/register/user",
              }}
              className="font-semibold text-xs underline underline-offset-8 "
            >
              Register as User Instead ?
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
