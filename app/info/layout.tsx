import { Metadata } from "next";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./(components)/Navbar"), { ssr: false });

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative`}>
      <Navbar />
      <div className="flex w-full">
        <div className="w-[280px] hidden xs:block"></div>
        {children}
      </div>
      <div className="h-[50vh]" />
    </div>
  );
}
