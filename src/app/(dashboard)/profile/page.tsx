"use client";

import LogOutBtn from "@/_components/LogOutBtn";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { useSelector } from "@/_store/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/_functions/profile";
import User from "@/_types/user";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

import CloudinaryImageUpload from "./CloudinaryImageUpload";


const MyProfile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const user = useSelector((state) => state.auth.user);

  const type = user?.userType === "user" ? "user" : "client";
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: [`${type}-profile-data`],
    enabled: !!type,
    queryFn: () => fetchProfile(type),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#262626] text-white flex-col">
        <CircularProgress sx={{ color: "gold" }} size={22} />
        Loading profile...
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#262626] text-white">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#262626] py-12 px-4">
      <div className="flex flex-col md:flex-row bg-[#1f1f1f] rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full border border-[#333]">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center bg-[#1a1a1a] p-8 md:w-2/5 w-full">
          <span className="text-white text-xl mb-4">My Profile</span>

          <div className="w-32 h-32 relative rounded-full bg-[#3a3a3a] shadow-lg flex items-center justify-center overflow-hidden">
            {!isEditing ? (
              userData?.avatar ? (
                userData?.avatar?.includes("res.cloudinary.com") ? (
                  <CldImage
                    alt="Profile Picture"
                    src={userData.avatar}
                    width="500"
                    height="500"
                    crop={{ type: "auto", source: true }}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={userData?.avatar}
                    alt="Profile Picture"
                    width={200}
                    height={200}
                    className="object-cover rounded-full"
                  />
                )
              ) : (
                <span className="text-white">No Image</span>
              )
            ) : (
              <CloudinaryImageUpload
                onClose={() => {
                  setIsEditing(false);
                }}
              ></CloudinaryImageUpload>
            )}
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 text-[#d9b989] hover:underline"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-3 text-[#d9b989] hover:underline"
              >
                Done
              </button>
            </>
          )}

          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-white">
              {userData?.fullName ||
                `${userData?.firstName} ${userData?.lastName}`}
            </h2>
            <p className="text-[#d9b989] text-sm">
              @{userData?.userName || "username"}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 p-8 flex flex-col gap-4 bg-[#262626] text-white">
          <h3 className="text-lg font-bold mb-3 text-[#d9b989]">
            Profile Details
          </h3>

          <span className="flex items-center gap-2">
            <span className="w-28 text-[#d9b989] font-semibold">Email:</span>
            <span>{userData?.email}</span>
          </span>

          <span className="flex items-center gap-2">
            <span className="w-28 text-[#d9b989] font-semibold">Phone:</span>
            <span>{userData?.phone || "—"}</span>
          </span>

          <span className="flex items-center gap-2">
            <span className="w-28 text-[#d9b989] font-semibold">DOB:</span>
            <span>{new Date(userData?.dob)?.toDateString()}</span>
          </span>

          <span className="flex items-center gap-2">
            <span className="w-28 text-[#d9b989] font-semibold">Age:</span>
            <span>{userData?.age}</span>
          </span>

          <span className="flex items-center gap-2">
            <span className="w-28 text-[#d9b989] font-semibold">
              User Type:
            </span>
            <span className="uppercase">{userData?.userType}</span>
          </span>

          {userData?.address?.fullAddress && (
            <div className="flex flex-col">
              <span className="text-[#d9b989] font-semibold">Address:</span>
              <span className="ml-2">{userData?.address.fullAddress}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
