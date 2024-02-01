import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
// import "../globals.css";

const Navbar = dynamic(() => import("./(components)/Navbar"), { ssr: false });

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Ideal Tech PC Internal App",
//   description: "Internal",
//   icons: {
//     icon: "/icon?<generated>",
//   },
//   appleWebApp: true,
// };

export default function WarrantyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative`}>
      <Navbar />
      <div className="flex">
        <div className="w-[280px]"></div>
        {children}
      </div>
      {/* <div className="h-[50vh]" /> */}
    </div>
  );
}
