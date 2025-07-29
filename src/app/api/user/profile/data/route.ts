import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/_models/users/user/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  console.log("Incoming req");
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session) {
      const error = new Error(`Unauthorized access`);
      (error as any).status = 401;
      throw error;
    }
    const id = (session as any).user?._id;
    const data = await UserModel.findById(id).select("-createAt -updatedAt");
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "User profile not found",
          data,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Fetched user profile successfully",
        data: data.toObject(),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleApiErrors(error);
  }
}
