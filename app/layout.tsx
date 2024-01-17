import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Footer from "./(components)/Footer";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        {/* <Navbar /> */}
        <div className="mx-auto">{children}</div>
        {/* <div className="h-[50vh]"></div> */}
        <Footer />
      </body>
    </html>
  );
}
