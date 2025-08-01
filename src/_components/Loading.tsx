import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen fixed inset-0 bg-[#262626] text-[#fcfcfc] ">
      <CircularProgress size={35} sx={{ color: "gold" }} />
    </div>
  );
};

export default Loading;
