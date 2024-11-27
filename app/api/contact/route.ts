import { WarrantyDataType } from "@/services/warranty/warrantyActions";
import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = (await req.json()) as {
    template: string;
    values: WarrantyDataType;
    pdf: number[];
  };
  // console.log(data);
  if (!data) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "mail.idealtech.com.my",
      host: "mail.idealtech.com.my",
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
      subject: `Service Receipt: ${data.values.serviceNo} ${data.values.name}`,
      html: data.template,
      attachments: [
        {
          filename: `${data.values.serviceNo}_IdealTechPC_Service.pdf`,
          content: Buffer.from(data.pdf),
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }
}
