"use client";
import { submitContactUsForm } from "@/_functions/submitContactUsForm";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const mutate = useMutation({ mutationFn: submitContactUsForm });
  const onSubmit = async (data: ContactFormValues) => {
    console.log("Contact form submitted:", data);
    mutate.mutate(data, {
      onSuccess: () => {
        Swal.fire({
          title: "Thanks !",
          text: "We will contact you back soon.",
        });
        reset();
      },
    });
  };

  return (
    <div className="flex flex-col items-center py-5 justify-start w-full h-full min-h-screen bg-[#262626]">
      <h2 className="text-2xl uppercase  inter font-bold text-center text-white mb-4">
        Contact Us
      </h2>
      <div className="w-10/12  h-auto  rounded-[33px] flex items-center justify-center px-6 py-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 text-[#d9b989]"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="px-4 py-2 rounded-md border focus:outline-none"
            />
            {errors.name && (
              <span className="text-sm text-red-700 mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="px-4 py-2 rounded-md border focus:outline-none"
            />
            {errors.email && (
              <span className="text-sm text-red-700 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* Subject */}
          <div className="flex flex-col">
            <label htmlFor="sub" className="font-semibold">
              Subject
            </label>
            <input
              id="sub"
              type="text"
              {...register("subject", {
                required: "Subject is required",
              })}
              className="px-4 py-2 rounded-md border focus:outline-none"
            />
            {errors.subject && (
              <span className="text-sm text-red-700 mt-1">
                {errors.subject.message}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="font-semibold">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", {
                required: "Message is required",
                maxLength: {
                  message: "Maximum 2000 characters are allowed.",
                  value: 2000,
                },
              })}
              className="px-4 py-2 rounded-md border focus:outline-none"
            />
            {errors.message && (
              <span className="text-sm text-red-700 mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              " text-center bg-[#fcfcfc]  hover:bg-[#d9b989] text-[#262626] cursor-pointer transition-all duration-200 ease-in  hover:text-white font-semibold px-6 py-3 rounded-[33px]",
              "col-span-1 "
            )}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
