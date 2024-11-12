import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Footer from "../components/common/Footer";
import "./globals.css";

import { Providers } from "@/lib/providers";
import { Toaster } from "sonner";

const Navbar = dynamic(() => import("../components/common/Navbar"), {
  ssr: false,
});

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
      {/* <ClerkProvider
        appearance={{
          baseTheme: dark,
          elements: {
            footer: "hidden",
          },
        }}
      > */}
      <body
        className={`${inter.className} relative text-zinc-900 dark:text-white bg-bgLight dark:bg-bgDark`}
      >
        <Providers>
          <div className="mx-auto">{children}</div>
          {/* <div className="h-[50vh]"></div> */}
          <Footer />
          <Toaster richColors theme="dark" closeButton />
        </Providers>
      </body>
      {/* </ClerkProvider> */}
    </html>
  );
}
