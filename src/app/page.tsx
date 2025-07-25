"use client";
import { useSelector } from "@/_store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Left Column: Branding/Visual */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 px-10 bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800">
        <div className="w-full h-full p-40 relative">
          <Image
            src="/next.svg"
            alt="Brand image"
            className="rounded-lg shadow-2xl mt-8 max-w-md aspect-video mx-auto"
            fill
          />
        </div>
      </div>

      {/* Right Column: CTA */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8">
        {user?._id ? (
          <>
            <div className="bg-gray-900/80 shadow-xl rounded-xl p-10 w-full max-w-md text-center">
              <h2 className="text-3xl font-bold text-indigo-200 mb-2">
                Welcome!
              </h2>
              <p className="text-gray-400 mb-8 tracking-wide">
                {user.fullName}
              </p>
              <div className="flex flex-col gap-4">
                <p className="text-gray-300  tracking-wide">{user.email}</p>
                <p className="text-gray-300  tracking-wide">{user.userName}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-900/80 shadow-xl rounded-xl p-10 w-full max-w-md text-center">
            <h2 className="text-3xl font-bold text-indigo-200 mb-2">
              Welcome!
            </h2>
            <p className="text-gray-400 mb-8 tracking-wide">
              Get started in seconds.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => router.push("/login")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-gray-800 border border-indigo-600 hover:bg-indigo-600 hover:border-indigo-700 text-indigo-300 hover:text-white font-semibold px-6 py-3 rounded-lg shadow transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
        <p className="text-gray-600 mt-8 text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
