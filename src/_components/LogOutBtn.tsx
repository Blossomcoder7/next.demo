"use client";
import useAuth from "@/_context/hooks/useAuth";
import { userLogout } from "@/_functions/auth";
import { useDispatch } from "@/_store/hooks";
import { logout } from "@/_store/slices/auth";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { signOut } from "next-auth/react";

import React, { HTMLAttributes } from "react";
import Swal from "sweetalert2";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next?: () => Promise<void | Record<string, any>> | void;
}
const LogOutBtn = ({ next, className, ...rest }: Props) => {
  const mutation = useMutation({
    mutationFn: userLogout,
  });

  const { setIsLoggedIn } = useAuth();
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      {...rest}
      className={clsx(
        "w-full flex items-center justify-center h-full",
        className
      )}
      onClick={() => {
        Swal.fire({
          title: "Are you sure you want to logout ?",
          text: "You will be logged out of the current session if you confirm !",
          confirmButtonText: "Yes, logout",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            mutation.mutate(undefined, {
              onSuccess: () => {
                setIsLoggedIn(false);
                dispatch(logout());
                signOut();
                next?.();
              },
            });
          }
        });
      }}
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
