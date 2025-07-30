import React from "react";
import Image from "next/image";
import { getMovieById } from "@/_functions/movies";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) {
    return <div className="bg-[#262626] text-white p-4">Movie not found</div>;
  }

  return (
    <div className="bg-[#262626]  text-white min-h-screen p-6 max-w-5xl mx-auto rounded-lg">
      <h1 className="text-4xl font-bold mb-4">
        {movie.title} ({movie.year})
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster Image */}
        <div className="w-full md:w-1/3 relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={movie.poster}
            alt={`${movie.title} poster`}
            fill
            unoptimized
            unselectable={"on"}
            className="object-cover object-center rounded-lg"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <p>
            <strong>Plot:</strong> {movie.plot}
          </p>
          <p>
            <strong>Full Plot:</strong> {movie.fullplot}
          </p>
          <p>
            <strong>Genres:</strong> {movie?.genres?.join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Cast:</strong> {movie?.cast?.join(", ")}
          </p>
          <p>
            <strong>Languages:</strong> {movie?.languages?.join(", ")}
          </p>
          <p>
            <strong>Director(s):</strong> {movie?.directors?.join(", ")}
          </p>
          <p>
            <strong>Rated:</strong> {movie.rated}
          </p>
          <p>
            <strong>Awards:</strong> {movie.awards.text}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {movie.imdb.rating} (
            {movie.imdb.votes} votes)
          </p>
          <p>
            <strong>Countries:</strong> {movie?.countries?.join(", ")}
          </p>
          <p>
            <strong>Type:</strong> {movie.type}
          </p>
          <p>
            <strong>Number of Comments:</strong> {movie.num_mflix_comments}
          </p>
          {/* Add more fields if you want */}
        </div>
      </div>
    </div>
  );
}
