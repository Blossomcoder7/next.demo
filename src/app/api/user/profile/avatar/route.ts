import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import UserModel from "@/_models/users/user/User";
import parseBody from "@/_utils/parseBody";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session) {
      const error: any = new Error(`Unauthorized access`);
      error.status = 401;
      throw error;
    }
    const id = (session as any)?.user?._id;
    const body = await parseBody(req);
    console.log({ body });
    const updated = await UserModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId.createFromHexString(id) },
      {
        $set: { avatar: body.url },
      },
      {
        new: true,
      }
    );
    console.log({ updated });
    return NextResponse.json(
      {
        success: true,
        message: "Updated Profile picture successfully",
        data: updated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleApiErrors(error);
  }
}
