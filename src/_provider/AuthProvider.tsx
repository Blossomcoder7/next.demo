"use client";
import AuthContext from "@/_context/AuthContext";
import { refreshAuth } from "@/_functions/profile";
import { useDispatch } from "@/_store/hooks";
import { login, logout } from "@/_store/slices/auth";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren, useEffect, useState } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data: userData, status } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["user-auth"],
    queryFn: refreshAuth,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: status !== "authenticated",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    console.log({ data, userData });
    if (data?.data || userData?.user) {
      setIsLoggedIn(true);
      dispatch(login({ user: data?.data || userData?.user }));
    } else {
      setIsLoggedIn(false);
      dispatch(logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userData]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {isLoading ? (
        <div className="fixed top-4 right-4 z-10 flex items-center  justify-center text-red-500">
          <CircularProgress sx={{ color: "goldenrod" }} size={18} />
        </div>
      ) : null}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
