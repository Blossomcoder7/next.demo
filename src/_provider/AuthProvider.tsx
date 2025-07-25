"use client";
import AuthContext from "@/_context/AuthContext";
import { refreshAuth } from "@/_functions/profile";
import { useDispatch } from "@/_store/hooks";
import { login, logout } from "@/_store/slices/auth";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect, useState } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-auth"],
    queryFn: refreshAuth,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    console.log({ data });
    if (data?.data) {
      setIsLoggedIn(true);
      dispatch(login({ user: data?.data }));
    } else {
      setIsLoggedIn(false);
      dispatch(logout());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {isLoading ? (
        <div className="fixed top-4 right-4 z-10 flex items-center w-4 h-4 justify-center text-red-500">
          Loading .....
        </div>
      ) : null}
      {error ? (
        <div className="fixed top-4 right-4 z-10 flex items-center w-4 h-4 justify-center text-red-500">
          Error in Auth ...
          <button type="button">Retry</button>
        </div>
      ) : null}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
