import { NextResponse } from "next/server";

export default function handleApiErrors(error: any) {
  if (process.env.NODE_ENV === "development") {
    console.log(`Error in the api handler at ${error?.stack}`, { error });
  }
  return NextResponse.json(
    {
      success: false,
      message: error?.message || `Internal server error`,
    },
    { status: error?.status || 500 }
  );
}
