import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="w-full h-screen bg-[#262626] fixed inset-0 flex items-center justify-center">
        <CircularProgress sx={{ color: "gold" }} size={55} />
      </div>
    </div>
  );
};

export default Loading;
