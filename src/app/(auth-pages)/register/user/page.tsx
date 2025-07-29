"use client";
import useAuth from "@/_context/hooks/useAuth";
import { registerUser } from "@/_functions/auth";
import { useDispatch } from "@/_store/hooks";
import { login } from "@/_store/slices/auth";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  city: string;
  street: string;
  country: string;
  pin: string;
  password: string;
  confirmPassword: string;
};

const RegisterAsUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const mutation = useMutation({
    mutationFn: registerUser,
  });
  useEffect(() => {
    if (isLoggedIn) {
      redirect("/profile");
    }
  }, [isLoggedIn]);

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: async (responseData) => {
        const { email, password } = data;
        const res = await signIn("credentials", {
          redirect: false, // avoid redirect by NextAuth itself
          email,
          password,
        });
        if (res) {
          console.log({ responseData });
          dispatch(login({ user: responseData?.data }));
          setIsLoggedIn(true);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        alert(error.response?.data?.message || "Registration failed");
      },
    });
  };
  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      autoComplete="off"
    >
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            {...register("firstName", { required: "First name is required" })}
            placeholder="First Name"
            className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[#d9b989] transition"
          />
          {errors.firstName && (
            <p className="text-pink-400 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <input
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last Name"
            className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
          />
          {errors.lastName && (
            <p className="text-pink-400 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        })}
        placeholder="Email"
        className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
      />
      {errors.email && (
        <p className="text-pink-400 text-xs mt-1">{errors.email.message}</p>
      )}

      <input
        {...register("phone", { required: "Phone number is required" })}
        placeholder="Phone Number"
        className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
      />
      {errors.phone && (
        <p className="text-pink-400 text-xs mt-1">{errors.phone.message}</p>
      )}

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="date"
            {...register("dob", { required: "Date of birth is required" })}
            className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
          />
          {errors.dob && (
            <p className="text-pink-400 text-xs mt-1">{errors.dob.message}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            {...register("city", { required: "City is required" })}
            placeholder="City"
            className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
          />
          {errors.city && (
            <p className="text-pink-400 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            {...register("street", { required: "Street is required" })}
            placeholder="Street"
            className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
          />
          {errors.street && (
            <p className="text-pink-400 text-xs mt-1">
              {errors.street.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <input
            {...register("country", { required: "Country is required" })}
            placeholder="Country"
            className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
          />
          {errors.country && (
            <p className="text-pink-400 text-xs mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <input
        {...register("pin", { required: "Pin code is required" })}
        placeholder="Pin Code"
        className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
      />
      {errors.pin && (
        <p className="text-pink-400 text-xs mt-1">{errors.pin.message}</p>
      )}

      <input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 chars" },
        })}
        type="password"
        placeholder="Password"
        className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
      />
      {errors.password && (
        <p className="text-pink-400 text-xs mt-1">{errors.password.message}</p>
      )}

      <input
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
        type="password"
        placeholder="Confirm Password"
        className="w-full bg-[#262626] border border-[#d9b989] rounded-lg px-4 py-3 text-[#fcfcfc] placeholder-[#d9b989] outline-none focus:ring-2 focus:ring-[d9b989] transition"
      />
      {errors.confirmPassword && (
        <p className="text-pink-400 text-xs mt-1">
          {errors.confirmPassword.message}
        </p>
      )}

      <div className="w-full items-center justify-center">
        <button
          type="submit"
          disabled={mutation.isPending}
          className={clsx(" text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]", "min-w-xs w-full mb-10 mx-auto")}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterAsUser;
