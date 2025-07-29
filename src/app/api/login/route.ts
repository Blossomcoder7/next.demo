import * as jwt from "jsonwebtoken";
import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import ClientModel from "@/_models/users/client/Client";
import UserModel from "@/_models/users/user/User";
import parseBody from "@/_utils/parseBody";
import { NextRequest, NextResponse } from "next/server";
import { getModelByName } from "@/_utils/models";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const parsedBody = await parseBody(req);
    const { email, password } = parsedBody;
    const user =
      (await ClientModel.findOne({ email })) ||
      (await UserModel.findOne({ email }));
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }
    console.log({ user });
    const isLogin = await user.matchPassword?.(password);
    console.log({ isLogin });
    if (!isLogin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }
    const data = user.toObject();
    delete data.password;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.__v;
    const response = NextResponse.json(
      {
        success: true,
        message: `Login successful !`,
        data: data,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", jwt.sign(data, process.env.JWT_SECRET!), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    return response;
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const token = req.cookies.get("token");
    const session = await getServerSession(authOptions);

    // If neither session nor token, block access
    if (!token && !session) {
      const error: any = new Error(`Unauthorized access`);
      error.status = 401;
      throw error;
    }

    if ((session as any)?.user) {
      console.log("Authenticated via session", (session as any)?.user);
      return NextResponse.json(
        {
          success: true,
          message: "Session auth success",
          data: (session as any)?.user,
        },
        { status: 200 }
      );
    }

    if (token) {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET!);

      if (!decoded || typeof decoded === "string") {
        const error: any = new Error(
          "Expired or invalid auth. Please log in again."
        );
        error.status = 401;
        throw error;
      }

      const userType = (decoded as jwt.JwtPayload)?.userType;
      const model = await getModelByName(userType as "user" | "client");
      const data = await model?.findById(
        decoded._id,
        "-password -createdAt -updatedAt -_v -iat"
      );

      if (!data) {
        const error: any = new Error(`User not found`);
        error.status = 404;
        throw error;
      }

      return NextResponse.json(
        {
          success: true,
          message: "Token auth success",
          data: data.toObject(),
        },
        { status: 200 }
      );
    }
    const error: any = new Error(`Unauthorized`);
    error.status = 401;
    throw error;
  } catch (error) {
    return handleApiErrors(error);
  }
}
