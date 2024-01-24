import { readdir, unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const folderPath = join(process.cwd(), "tmp");

  // Delete all files in 'tmp' folder before uploading new one
  const files = await readdir(folderPath);
  await Promise.all(
    files.map((filename) => unlink(join(folderPath, filename)))
  );

  // Now upload the new file
  const path = join(folderPath, file.name);
  await writeFile(path, buffer);

  return NextResponse.json({ success: true, path: path });
}
