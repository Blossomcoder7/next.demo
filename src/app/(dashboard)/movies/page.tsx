// app/movies/page.tsx
import { getMovies } from "@/_functions/movies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import MovieCard from "./MovieCard";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ page: string }>;
}
export default async function Page({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const { page: p } = await searchParams;
  const page = parseInt(p || "1");
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
        <Link
          href={`?page=${page - 1}`}
          className={`px-4 py-2 bg-[#d9b989] rounded-xl ${
            page <= 1 ? "pointer-events-none opacity-30" : ""
          }`}
        >
          Previous
        </Link>
        <Link
          href={`?page=${page + 1}`}
          className="px-4 py-2 bg-[#d9b989] rounded-xl"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
