import Movie from "@/_types/movie";
import Image from "next/image";
import React from "react";
import Button from "./Button";

const MovieCard = ({ movie }: { movie?: Movie }) => {
  const imageSrc =
    movie?.poster ||
    "/vercel.svg"; 

  return (
    <div className="flex flex-col h-[500px] bg-[#d9b989] rounded-[33px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Poster */}
      <div className="w-full h-[60%] relative flex items-center  bg-[#262626] text-white justify-center">
        <Image
          src={imageSrc}
          alt={`${movie?.title || "Movie"} poster`}
          fill
          className="object-cover object-center text-center flex items-center justify-center"
          sizes="300px"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-3  rounded-t-[33px] text-white flex flex-col justify-between">
        <div className="flex flex-col rounded-[33px] gap-1 bg-[#262626] h-full text-center justify-center items-center">
          <h3 className="text-lg font-semibold truncate w-full line-clamp-1 px-4">{movie?.title}</h3>
          <p className="text-sm text-gray-300">
            Year: <span className="font-medium">{movie?.year}</span>
          </p>
          <p className="text-sm text-gray-300">
            Language{movie?.languages?.length !== 1 ? "s" : ""}:{' '}
            <span className="font-medium">
              {movie?.languages?.join(", ") || "N/A"}
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <Button _id={movie?._id?.toString()} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
