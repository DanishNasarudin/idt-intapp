import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Footer from "./(components)/Footer";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Navbar = dynamic(() => import("./(components)/Navbar"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          elements: {
            footer: "hidden",
          },
        }}
      >
        <body
          className={`${inter.className} relative text-zinc-900 dark:text-white bg-bgLight dark:bg-bgDark`}
        >
          <div className="mx-auto">{children}</div>
          {/* <div className="h-[50vh]"></div> */}
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
