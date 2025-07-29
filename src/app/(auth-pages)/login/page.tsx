"use client";
import useAuth from "@/_context/hooks/useAuth";
import { getLoginApi } from "@/_functions/auth";
import { useDispatch } from "@/_store/hooks";
import { login } from "@/_store/slices/auth";
import { btnClasses } from "@/app/page";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { signIn } from "next-auth/react";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: getLoginApi,
  });

  const dispatch = useDispatch();
  /**
   * Handles form submission for user login
   *
   * @param {FormValues} data - Form data, containing email and password
   *
   * @description
   * Calls `getLoginApi` mutation with the given form data. If the mutation
   * fails, it alerts the user about the failure. If the mutation succeeds, it
   * alerts the user that the login was successful, and dispatches the
   * `login` action with the response data to store the user in the
   * application state.
   */

  const onSubmit = (data: FormValues) => {
    console.log({ data });
    mutation.mutate(data, {
      onError: (error) => {
        console.log({ error });
        alert(`Unable to login, Please try again later`);
      },
      onSuccess: async (resdata) => {
        await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        dispatch(login({ user: resdata?.data }));
        setIsLoggedIn(true);
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      redirect("/profile");
    }
  }, [isLoggedIn]);

  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="bg-[#202020]  p-10 w-full h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold text-[#fcfcfc] mb-2">Welcome Back</h2>
        <p className="text-[#fcfcfc] mb-8 tracking-wide">
          Login to your account to continue
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          autoComplete="off"
        >
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Email"
              className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[#d9b989] transition"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-[red] text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              placeholder="Password"
              className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[#d9b989] transition"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-[red] text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={clsx(btnClasses, "min-w-xs")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-[#fcfcfc] text-sm">
          <span>{"Don't"} have an account? </span>
          <a
            href="/register"
            className="underline hover:text-indigo-50 font-medium transition"
          >
            Sign up &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
