import { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/common/Footer";
import "./globals.css";

import { Providers } from "@/lib/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? `https://${process.env.HOSTNAME}`
      : "http://localhost:3000"
  ),
  title: "Ideal Tech PC Internal App",
  description: "Internal",
  icons: {
    icon: "/icon?<generated>",
  },
  appleWebApp: true,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative text-zinc-900 dark:text-white bg-bgLight dark:bg-bgDark`}
      >
        <Providers>
          <div className="mx-auto">{children}</div>
          <Footer />
          <Toaster richColors theme="dark" closeButton />
        </Providers>
      </body>
    </html>
  );
}
