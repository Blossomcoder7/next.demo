// app/movies/page.tsx
import { getMovies } from "@/_functions/movies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import MovieCard from "./MovieCard";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const page = parseInt(searchParams.page || "1");
  const movies = await getMovies(page);

  return (
    <div className="flex flex-col items-center justify-center bg-[#262626] min-h-screen text-[#fcfcfc]">
      <div className="w-full grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 px-5 py-10">
        {movies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-4 mb-10">
        <a
          href={`?page=${page - 1}`}
          className={`px-4 py-2 bg-[#d9b989] rounded-xl ${
            page <= 1 ? "pointer-events-none opacity-30" : ""
          }`}
        >
          Previous
        </a>
        <a
          href={`?page=${page + 1}`}
          className="px-4 py-2 bg-[#d9b989] rounded-xl"
        >
          Next
        </a>
      </div>
    </div>
  );
}
