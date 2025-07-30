import handleApiErrors from "@/_lib/apiErrorHandler";
import connectDb from "@/_lib/mongodb";
import ContactUsModel from "@/_models/others/contact_submission";
import parseBody from "@/_utils/parseBody";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await parseBody(req);
    console.log({ body });
    const contact = new ContactUsModel(body);
    console.log({ contact });
    await contact.save();
    return NextResponse.json(
      {
        success: true,
        message: "Your form has been submitted successfully",
      },
      { status: 200, statusText: "Successful" }
    );
  } catch (error) {
    return handleApiErrors(error);
  }
}
