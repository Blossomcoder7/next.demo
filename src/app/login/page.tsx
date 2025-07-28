"use client";
import useAuth from "@/_context/hooks/useAuth";
import { getLoginApi } from "@/_functions/auth";
import { useDispatch } from "@/_store/hooks";
import { login } from "@/_store/slices/auth";
import { useMutation } from "@tanstack/react-query";
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
      onSuccess: (data) => {
        dispatch(login({ user: data?.data }));
        setIsLoggedIn(true);
      },
    });
  };
  useEffect(() => {
    console.log({ isLoggedIn });
    if (isLoggedIn) {
      redirect("/my-profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-slate-900/90 rounded-lg shadow-2xl p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-indigo-200 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 mb-8 tracking-wide">
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
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-indigo-100 placeholder-indigo-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-pink-400 text-xs mt-1">
                {errors.email.message}
              </p>
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
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-indigo-100 placeholder-indigo-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-pink-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold shadow-lg transition mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-indigo-300 text-sm">
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
