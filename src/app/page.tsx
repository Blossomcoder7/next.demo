"use client";
import LogOutBtn from "@/_components/LogOutBtn";
import useAuth from "@/_context/hooks/useAuth";
import { useSelector } from "@/_store/hooks";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import BrandingSeg from "@/_components/BrandingSeg";
import GA4 from "@/_components/GA4";
import CustomStats from "@/_components/CustomStats";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="flex   fixed bottom-2 left-2 space-x-4 px-4 gap-2">
        <GA4 />
        <CustomStats />
      </div>
      {/* <CustomStats /> */}
      <div className="w-full min-h-screen  grid grid-cols-1 md:grid-cols-2 bg-[#262626] text-[#fcfcfc]">
        <BrandingSeg />
        <div className="col-span-full md:col-span-1  h-full  w-full  flex flex-col items-center px-5 justify-center space-y-5">
          {isLoggedIn ? (
            <div className="flex flex-col justify-center items-center space-y-10">
              <p className="text-[#fcfcfc] text-center  tracking-wide">
                You have already signed up on our platform as
              </p>
              {isLoggedIn ? (
                <p className="text-[#fcfcfc] text-center  tracking-wide">
                  {user?.fullName || user?.firstName || user?.email || "You"}
                </p>
              ) : null}
              <div className="grid grid-cols-2 gap-5 w-full">
                <button
                  onClick={() => router.push("/profile")}
                  className={clsx(
                    " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]",
                    "col-span-1"
                  )}
                >
                  View Profile
                </button>
                <div
                  className={clsx(
                    " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold  rounded-[33px]",
                    "col-span-1 "
                  )}
                >
                  <LogOutBtn
                    className={clsx(
                      " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]",
                      "col-span-1 "
                    )}
                  />
                </div>
              </div>
              <p className="text-[#fcfcfc] text-sm text-center mb-8 tracking-wide">
                This platform is powered by
              </p>
              <div className="w-full h-32 mt-10 relative">
                <Image
                  src="/next.svg"
                  alt="Brand image"
                  className="rounded-lg  max-w-md aspect-video mx-auto"
                  fill
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <p className="text-[#fcfcfc] text-center mb-8 tracking-wide">
                  Get started in seconds.
                </p>
                <div className="w-full grid gap-4 grid-cols-2">
                  <button
                    onClick={() => router.push("/login")}
                    className={clsx(
                      " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]",
                      "col-span-1"
                    )}
                  >
                    Login With Email
                  </button>

                  <button
                    onClick={() =>
                      signIn("google", {
                        redirect: true,
                        callbackUrl: "/profile",
                      })
                    }
                    className={clsx(
                      " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]",
                      "col-span-1"
                    )}
                  >
                    Sign in with Google
                  </button>

                  <button
                    onClick={() => router.push("/register")}
                    className={clsx(
                      " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]",
                      "col-span-2"
                    )}
                  >
                    Register
                  </button>
                </div>
              </div>
            </>
          )}
          <p className="text-gray-600 text-center mt-8 text-sm">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
