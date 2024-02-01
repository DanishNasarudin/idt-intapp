import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  // console.log(data);
  if (!data) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }

  try {
    if (data.attach) {
      // Convert the Data URI to a Buffer
      const pdfBase64 = data.attach.split("base64,").pop();
      const pdfBuffer = Buffer.from(pdfBase64, "base64");

      const transporter = nodemailer.createTransport({
        service: "v5787.securen.net",
        host: "v5787.securen.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
        pool: true,
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOption = {
        from: `Ideal Tech PC Service <${process.env.EMAIL}>`,
        to: data.values.email,
        cc: process.env.EMAIL,
        replyTo: process.env.EMAIL,
        subject: `Service Receipt: ${data.values.service_no} ${data.values.name}`,
        html: data.template,
        attachments: [
          {
            filename: `${data.values.service_no}_IdealTechPC_Service.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      };

      await transporter.sendMail(mailOption);
    } else {
      const transporter = nodemailer.createTransport({
        service: "v5787.securen.net",
        host: "v5787.securen.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
        pool: true,
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOption = {
        from: `Ideal Tech PC Service <${process.env.EMAIL}>`,
        to: data.values.email,
        cc: process.env.EMAIL,
        replyTo: process.env.EMAIL,
        subject: `Service Receipt: ${data.values.service_no} ${data.values.name}`,
        html: data.template,
      };

      await transporter.sendMail(mailOption);
    }

    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }
}
