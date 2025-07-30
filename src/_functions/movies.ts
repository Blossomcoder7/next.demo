import connectDb from "@/_lib/mongodb";
import Movie from "@/_types/movie";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function getMovies(
  page: number = 1,
  limit: number = 9
): Promise<Movie[] | null | undefined> {
  await connectDb();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized access");
  }
  const collection = mongoose?.connection?.db?.collection("movies");
  const docs = await collection
    ?.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
  return docs?.map((a) => a as unknown as Movie);
}
export async function getMovieById(id: string): Promise<Movie | null> {
  await connectDb();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized access");
  }
  const collection = mongoose?.connection?.db?.collection("movies");
  const doc = await collection?.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return doc as unknown as Movie;
}
