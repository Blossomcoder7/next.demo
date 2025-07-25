import * as jwt from "jsonwebtoken";
import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import ClientModel from "@/_models/users/client/Client";
import UserModel from "@/_models/users/user/User";
import parseBody from "@/_utils/parseBody";
import { NextRequest, NextResponse } from "next/server";
import { getModelByName } from "@/_utils/models";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const parsedBody = await parseBody(req);
    const { email, password } = parsedBody;
    const user =
      (await ClientModel.findOne({ email }, " -updatedAt -createdAt -_v")) ||
      UserModel.findOne({ email }, " -updatedAt -createdAt -_v");
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
    const isLogin = await user.matchPassword(password);
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
    if (!token) {
      console.log("No token found");
      const error: any = new Error(`Unauthorized access`);
      error.status = 401;
      throw error;
    } else {
      console.log({ token });
      const decoded = await jwt.verify(token.value, process.env.JWT_SECRET!);
      console.log({ decoded });
      if (!decoded || typeof decoded === "string") {
        const error: any = new Error(
          "Expired or Invalid auth, Please refresh your access"
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
      if (!data || !model) {
        const error: any = new Error(`User not found`);
        error.status = 404;
        throw error;
      }
      return NextResponse.json(
        {
          success: true,
          message: "Refresh auth success",
          data: data?.toObject(),
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return handleApiErrors(error);
  }
}
