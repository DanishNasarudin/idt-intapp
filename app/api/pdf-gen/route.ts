import { NextResponse, type NextRequest } from "next/server";
import puppeteer from "puppeteer";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  let checkPass = 0;
  // const executablePath = path.join(
  //   process.cwd(),
  //   "chrome/win64-120.0.6099.109/chrome-win64",
  //   "chrome.exe"
  // );
  // console.log(executablePath);

  if (!data) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }
  try {
    const htmlContent = data.htmlContent;
    checkPass = checkPass + 1;

    const browser = await puppeteer.launch({
      headless: "new",
      ignoreDefaultArgs: ["--disable-extensions"],
      // executablePath: executablePath,
    });
    checkPass = checkPass + 1;
    const page = await browser.newPage();
    checkPass = checkPass + 1;
    await page.setContent(htmlContent);
    checkPass = checkPass + 1;
    const pdfBuffer = await page.pdf({ format: "A4" });
    checkPass = checkPass + 1;
    await browser.close();
    checkPass = checkPass + 1;

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="document.pdf"`,
      },
    });
  } catch (error: unknown) {
    let errorMessage = "PDF generation failed";
    if (error instanceof Error) {
      errorMessage = `PDF generation failed: ${error.message}`;
    }
    return new Response(JSON.stringify({ error: errorMessage + checkPass }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
