"use client";

import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";
import { updateAvatar } from "@/_functions/profile";
import { useSession } from "next-auth/react";
import User from "@/_types/user";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileImageUploader({
  onClose,
}: {
  onClose?: () => void | Promise<void>;
}) {
  const { data } = useSession();
  const user = data?.user as User;
  const queryClient = useQueryClient();

  return (
    <div className="flex w-full h-full flex-col items-center gap-4">
      <CldUploadWidget
        uploadPreset="my_unsigned_preset"
        onSuccess={async (result: any) => {
          console.log({ res: result.info.secure_url });
          await updateAvatar(
            result.info.secure_url,
            user?.userType,
            async () => {
              await queryClient.invalidateQueries({
                queryKey: [`${user?.userType}-profile-data`],
              });
              onClose?.();
            }
          );
        }}
        onError={(err) => {
          console.log({ err });
          Swal.fire("Unable to save the image to db");
        }}
      >
        {({ open }) => (
          <button
            className="w-full h-full  bg-yellow-600 text-black "
            onClick={() => open?.()}
          >
            Upload Profile Image
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
