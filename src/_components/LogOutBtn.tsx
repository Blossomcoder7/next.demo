"use client";
import useAuth from "@/_context/hooks/useAuth";
import { userLogout } from "@/_functions/auth";
import { useDispatch } from "@/_store/hooks";
import { logout } from "@/_store/slices/auth";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import React from "react";
import Swal from "sweetalert2";

const LogOutBtn = () => {
  const mutation = useMutation({
    mutationFn: userLogout,
  });

  const { setIsLoggedIn } = useAuth();
  const dispatch = useDispatch();

  return (
    <button
      type="button"
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
