"use client";
import useAuth from "@/_context/hooks/useAuth";
import { useSelector } from "@/_store/hooks";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const MyProfile = () => {
  const userData = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/login");
    }
  }, [isLoggedIn]);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-700 py-12 px-4">
      <div className="flex flex-col md:flex-row bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center bg-slate-800 p-8 md:w-2/5 w-full">
          <div className="w-32 h-32 relative rounded-full bg-slate-600 shadow-lg flex items-center justify-center overflow-hidden">
            {userData?.avatar ? (
              <Image
                fill
                src={userData.avatar}
                alt={`${userData.fullName ?? ""}'s avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl text-indigo-300 font-bold">
                {userData?.fullName ? userData.fullName : "?"}
              </span>
            )}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-indigo-200">
              {userData?.fullName || "Your Name"}
            </h2>
            <p className="text-indigo-400 text-sm">
              @{userData?.userName || "--"}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 p-8 flex flex-col gap-4 bg-slate-900">
          <h3 className="text-lg font-bold text-white mb-3">Profile Details</h3>
          <span className="flex items-center gap-2">
            <span className="w-28 text-indigo-300 font-semibold">Email:</span>
            <span className="text-slate-200">{userData?.email || "—"}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-28 text-indigo-300 font-semibold">Phone:</span>
            <span className="text-slate-200">{userData?.phone || "—"}</span>
          </span>
          {/* Address */}
          {userData?.address && (
            <span className="flex flex-col">
              <span className="text-indigo-300 font-semibold">Address:</span>
              <span className="ml-2 text-slate-200">
                {userData.address.street}, {userData.address.city}
                <br />
                {userData.address.country} – {userData.address.pin}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
