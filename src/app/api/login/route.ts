/* eslint-disable @typescript-eslint/no-explicit-any */
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

/**
 * Handles user login requests.
 *
 * @param {NextRequest} req - The incoming request object containing login credentials in the body.
 * @returns {Promise<NextResponse>} - A JSON response indicating success or failure of the login attempt.
 *
 * @description
 * This function connects to the database and parses the request body to extract the email and password.
 * It attempts to find a user in the database with the provided email, checking both client and user models.
 * If the user is not found or the password does not match, it returns a 401 response with an "Invalid Credentials" message.
 * On successful login, it returns a 200 response with a success message and user data, excluding sensitive fields.
 * A JWT is generated and set in the cookies for authentication purposes.
 * Any errors encountered during the process are handled by the `handleApiErrors` function.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
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

    const isLogin = await user.matchPassword?.(password);

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

/**
 * Handles GET requests for user authentication status.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A JSON response indicating the authentication status.
 *
 * @description
 * This function checks for an existing authentication session or a token in the request cookies.
 * - If neither a session nor a token is found, it returns a 401 response with an "Unauthorized access" message.
 * - If a session is found, it returns a 200 response with the session user data.
 * - If a token is found, it verifies the token and returns a 200 response with the user data associated with the token.
 * - If the token is invalid or expired, or if the user is not found, it throws an error.
 * Any errors encountered during the process are handled by the `handleApiErrors` function.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDb();

    const token = req.cookies.get("token");
    const session = await getServerSession(authOptions);

    // If neither session nor token, block access
    if (!token && !session) {
      const error: any = new Error(`Unauthorized access`);
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access",
          error,
        },
        {
          status: 401,
          statusText: "Unauthorized access",
        }
      );
    }

    if ((session as any)?.user) {
      // console.log("Authenticated via session", (session as any)?.user);
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
