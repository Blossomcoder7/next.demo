import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import ClientModel from "@/_models/users/client/Client";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);

    if (!session) {
      const error = new Error(`Unauthorized access`);
      (error as any).status = 401;
      throw error;
    }
    const id = (session as any).user?._id;
    const data = await ClientModel.findById(id).select("-createdAt -updatedAt");
   
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Client Profile not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Fetched client profile successfully",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleApiErrors(error);
  }
}
