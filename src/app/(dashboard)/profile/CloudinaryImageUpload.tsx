"use client";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";
import { updateAvatar } from "@/_functions/profile";
import { useSession } from "next-auth/react";
import User from "@/_types/user";
import { useQueryClient } from "@tanstack/react-query";
import { FC, HTMLAttributes, ReactNode, useCallback } from "react";
import clsx, { ClassValue } from "clsx";

interface CloudinaryImageUploadProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void | Promise<void> | undefined;
  childrenClassName?: ClassValue | undefined;
  children?: ReactNode | undefined;
}
const CloudinaryImageUpload: FC<CloudinaryImageUploadProps> = ({
  children,
  onClose,
  className,
  childrenClassName,
  ...rest
}) => {
  const { data } = useSession();
  const user = data?.user as User;
  const queryClient = useQueryClient();
  const handleSuccess = useCallback(
    async (result: any) => {
      console.log({ res: result });
      await updateAvatar(result.info.secure_url, user?.userType);
    },
    [user]
  );

  const handleError = (err: any) => {
    console.log({ err });
    Swal.fire("Unable to save the image, Please try again later.");
  };

  const handleOnClose = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [`${user?.userType}-profile-data`],
    });
    await onClose?.();
  }, [onClose, queryClient, user]);

  return (
    <>
      <div
        {...rest}
        className={clsx("flex w-full h-full flex-col items-center", className)}
      >
        <CldUploadWidget
          options={{
            maxFiles: 1,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"], 
          }}
          uploadPreset="my_unsigned_preset"
          onSuccess={handleSuccess}
          onError={handleError}
          onClose={handleOnClose}
        >
          {({ open }) => (
            <>
              <div
                className={clsx(
                  "w-full h-full bg-[#fcfcfc] flex items-center justify-center cursor-pointer hover:text-[#fcfcfc] transition-all duration-200 ease-in hover:bg-[#d9b989] text-black",
                  childrenClassName
                )}
                onClick={() => open?.()}
              >
                {children || "Upload Image"}
              </div>
            </>
          )}
        </CldUploadWidget>
      </div>
    </>
  );
};
export default CloudinaryImageUpload;
