import { SocketProvider } from "@/lib/providers/socket-provider";
import dynamic from "next/dynamic";
import SideNavbarContent from "../(components)/SideNavbarContent";

const Navbar = dynamic(() => import("./(components)/WarrantyNavbar"), {
  ssr: false,
});

export default function WarrantyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative`}>
      <Navbar />
      <SideNavbarContent className="w-full">
        <SocketProvider>{children}</SocketProvider>
      </SideNavbarContent>
      {/* <div className="h-[50vh]" /> */}
    </div>
  );
}
