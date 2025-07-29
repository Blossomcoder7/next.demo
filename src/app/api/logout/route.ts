import { NextResponse } from "next/server";
import handleApiErrors from "@/_lib/apiErrorHandler";
export async function GET() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return handleApiErrors(error);
  }
}
