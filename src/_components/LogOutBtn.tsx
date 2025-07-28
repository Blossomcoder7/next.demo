import useAuth from "@/_context/hooks/useAuth";
import { userLogout } from "@/_functions/auth";
import { useDispatch } from "@/_store/hooks";
import { logout } from "@/_store/slices/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React from "react";
import Swal from "sweetalert2";

const LogOutBtn = () => {
  const mutation = useMutation({
    mutationFn: userLogout,
  });
  const router = useRouter();
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
                dispatch(logout());
                setIsLoggedIn(false);
                router.push("/");
              },
            });
          }
        });
      }}
      className=" flex items-center cursor-pointer hover:bg-red-600 border border-red-600 text-[red] hover:text-white justify-center w-fit h-7 rounded-2xl px-5"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
