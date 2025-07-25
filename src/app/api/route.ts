import { NextResponse } from "next/server";

/**
 * Returns a 200 response with a JSON payload indicating whether the
 * request was successful or not. If the request fails, returns a 500
 * response with a JSON payload that includes an error message.
 */
export async function GET() {
  try {
    const res = { success: true, message: "Ping successful" };
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        success: false,
        message: `Internal server error`,
      },
      { status: 500 }
    );
  }
}
