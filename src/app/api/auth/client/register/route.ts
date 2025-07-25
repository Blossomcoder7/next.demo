import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import ClientModel from "@/_models/users/client/Client";
import parseBody from "@/_utils/parseBody";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await parseBody(req);
    const client = await ClientModel.create(body);
    const payload = {
      _id: client?._id,
      username: client?.userName,
      firstName: client?.firstName,
      lastName: client?.lastName,
      address: client?.address,
    };
    if (client) {
      const token = await jwt.sign(payload, secret, {
        expiresIn: 2592000,
      });
      const response = NextResponse.json(
        {
          success: true,
          message: "Registration successful",
          data: payload,
        },
        { status: 201 }
      );
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2592000,
        path: "/",
      });
      return response;
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "Something went wrong while user registration, Please try again later",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return Response.json(
        {
          error: "Email already exists, try signing in.",
          status: "error",
        },
        { status: 409 }
      );
    }

    return handleApiErrors(error);
  }
}
