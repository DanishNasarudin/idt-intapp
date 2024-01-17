import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  // console.log(data);
  if (!data) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }

  // const fileName =
  //   process.env.NODE_ENV === "production"
  //     ? data.attach.split("/").pop()
  //     : data.attach.split("\\").pop();

  try {
    const transporter = nodemailer.createTransport({
      service: "v5787.securen.net",
      host: "v5787.securen.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from: `Ideal Tech PC <${process.env.EMAIL}>`,
      to: data.values.email,
      cc: process.env.EMAIL,
      replyTo: data.values.email,
      subject: `Service Invoice for ${data.values.name}`,
      html: data.template,
    };

    await transporter.sendMail(mailOption);
    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }
}
