"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error }: ErrorProps) => {
  const router = useRouter();
  return (
    <div className="text-[red] flex items-center justify-center w-full h-screen text-center px-4">
      <div>
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm">{error.message}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Error;
