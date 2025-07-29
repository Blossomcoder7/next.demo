"use client";

import { Avatar, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { MdEdit, MdFilePresent, MdImage, MdPictureAsPdf } from "react-icons/md";

interface ImageUploadComponentProps {
  name?: string;
  icon?: "File" | "Image" | "PdfFile";
  variant?: "Rectangle" | "Round";
  imagePreview?: string | undefined;
  fileUrl?: string | null;
  children: ReactNode;
  labelName: string;
  type?: "image" | "pdf";
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  name = "Select",
  icon = "Image",
  imagePreview,
  fileUrl,
  children,
  labelName,
  variant = "Round",
  type = "image",
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  // console.log({ fileUrl });
  return (
    <>
      {children}
      <div className="hidden">
        <Avatar
          src={imagePreview}
          alt="image-preview"
          onError={() => setImageError(true)}
        />
      </div>

      {variant === "Round" && (
        <label
          htmlFor={labelName}
          className="flex justify-center items-center w-40 h-40 rounded-full relative overflow-hidden cursor-pointer"
        >
          {!imagePreview || imageError ? (
            <div className="w-full h-full rounded-lg bg-gray-400  flex flex-col justify-center items-center">
              <span>
                {icon === "File" && (
                  <MdFilePresent
                    style={{ color: "white", fontSize: "2.5rem" }}
                  />
                )}
                {icon === "Image" && (
                  <MdImage style={{ color: "white", fontSize: "2.5rem" }} />
                )}
                {icon === "PdfFile" && (
                  <MdPictureAsPdf
                    style={{ color: "white", fontSize: "2.5rem" }}
                  />
                )}
              </span>
              <span className="font-semibold text-xs text-white">{name}</span>
            </div>
          ) : (
            <Avatar
              src={imagePreview}
              alt="User"
              sx={{
                width: { sm: 140, md: 150, lg: 160, xl: 200 },
                height: { sm: 140, md: 150, lg: 160, xl: 200 },
              }}
            />
          )}

          {imagePreview && !imageError ? (
            <div className="absolute bottom-0 right-1/4 rounded-full w-8 h-8 bg-slate-50 flex justify-center items-center">
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  aria-label="upload-picture"
                  component="span"
                >
                  <MdEdit style={{ color: "#eabd32", fontSize: "1.5rem" }} />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            ""
          )}
        </label>
      )}

      {variant === "Rectangle" && (
        <>
          {type === "image" ? (
            <>
              <label
                htmlFor={labelName}
                className="flex justify-center items-center w-full  rounded-md relative overflow-hidden cursor-pointer"
              >
                {!imagePreview || imageError ? (
                  <div className="w-full  rounded-lg min-h-24 py-12 bg-gray-400  flex flex-col justify-center items-center">
                    <span>
                      {icon === "File" && (
                        <MdFilePresent
                          style={{ color: "white", fontSize: "2.5rem" }}
                        />
                      )}
                      {icon === "Image" && (
                        <MdImage
                          style={{ color: "white", fontSize: "2.5rem" }}
                        />
                      )}
                      {icon === "PdfFile" && (
                        <MdPictureAsPdf
                          style={{ color: "white", fontSize: "2.5rem" }}
                        />
                      )}
                    </span>
                    <span className="font-semibold text-xs text-white">
                      {name}
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full max-w-full flex justify-center items-center ">
                    <Image
                      src={imagePreview}
                      alt="User"
                      fill
                      className=" w-full max-w-full flex justify-center items-center object-contain"
                    />
                  </div>
                )}

                {imagePreview && !imageError ? (
                  <div className="absolute top-4 right-4 rounded-full w-8 h-8 bg-slate-50 flex justify-center items-center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        aria-label="upload-picture"
                        component="span"
                      >
                        <MdEdit
                          style={{ color: "#eabd32", fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  ""
                )}
              </label>
            </>
          ) : (
            <>
              <label
                htmlFor={labelName}
                className="flex justify-center items-center w-full  rounded-md relative overflow-hidden cursor-pointer"
              >
                {!fileUrl ? (
                  <div className="w-full  rounded-lg min-h-24 py-12 bg-gray-400  flex flex-col justify-center items-center">
                    <span>
                      {icon === "File" && (
                        <MdFilePresent
                          style={{ color: "white", fontSize: "2.5rem" }}
                        />
                      )}
                      {icon === "Image" && (
                        <MdImage
                          style={{ color: "white", fontSize: "2.5rem" }}
                        />
                      )}
                      {icon === "PdfFile" && (
                        <MdPictureAsPdf
                          style={{ color: "white", fontSize: "2.5rem" }}
                        />
                      )}
                    </span>
                    <span className="font-semibold text-xs text-white">
                      {name}
                    </span>
                  </div>
                ) : (
                  <iframe
                    src={fileUrl}
                    title="PDF Preview"
                    style={{
                      width: "100%",
                      height: "300px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                )}

                {fileUrl ? (
                  <div className="absolute bottom-8 right-8 rounded-full w-8 h-8 bg-[#eabd32] flex justify-center items-center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        aria-label="upload-picture"
                        component="span"
                      >
                        <MdEdit
                          style={{ color: "white", fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  ""
                )}
              </label>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ImageUploadComponent;
