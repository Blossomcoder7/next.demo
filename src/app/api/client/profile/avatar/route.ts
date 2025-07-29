import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import parseBody from "@/_utils/parseBody";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectDb();
    const body = await parseBody(req);
    console.log({ body });
  } catch (error) {
    return handleApiErrors(error);
  }
}
