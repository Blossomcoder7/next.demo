"use client";
import useAuth from "@/_context/hooks/useAuth";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    alert(`isLoggedIn, transporting to profile page`);
  }, [isLoggedIn]);

  return (
    <div className="flex min-h-screen w-full bg-slate-900 text-white">
      {/* Left: Registration Navigation/Content */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-indigo-700 via-violet-900 to-slate-900 p-10">
        <h2 className="text-3xl font-extrabold mb-8 tracking-tight drop-shadow-lg text-indigo-100">
          Register
        </h2>
        <p className="text-lg text-indigo-200 mb-8 text-center max-w-xs">
          Choose your registration mode. Whether {"you're"} a user or a
          client—start your journey with us!
        </p>
        <div className="flex gap-4">
          <Link
            href={{
              pathname: "/register/user",
            }}
            className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 focus:ring focus:ring-indigo-300 text-white font-semibold shadow transition"
          >
            Register as User
          </Link>
          <Link
            href={{
              pathname: "/register/client",
            }}
            className="px-6 py-3 rounded-lg bg-violet-700 hover:bg-violet-800 border border-violet-500 focus:ring focus:ring-violet-300 text-indigo-100 font-semibold shadow transition"
          >
            Register as Client
          </Link>
        </div>
        <div className="mt-12 text-indigo-300 text-xs">
          <p>Already have an account?</p>
          <a
            href="/login"
            className="underline hover:text-indigo-50 font-medium transition"
          >
            Login &rarr;
          </a>
        </div>
      </div>

      {/* Right: Registration Form or Children */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-800">
        <div className="w-full max-w-md bg-slate-900/90 rounded-lg shadow-2xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
