import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Footer from "./(components)/Footer";
import "./globals.css";

import SessionProvider from "./(hooks)/SessionProvider";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <SessionProvider session={session}>
          <div className="mx-auto">{children}</div>
          {/* <div className="h-[50vh]"></div> */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
