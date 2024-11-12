import { Metadata } from "next";
import dynamic from "next/dynamic";
import SideNavbarContent from "../../components/common/SideNavbarContent";

const GalleryNavbar = dynamic(
  () => import("../../components/gallery/GalleryNavbar"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Ideal Tech PC Internal App",
  description: "App PC Gallery",
  icons: {
    icon: "/icon?<generated>",
  },
  appleWebApp: true,
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative`}>
      <GalleryNavbar />
      <SideNavbarContent className="px-16 pt-4 w-full">
        {children}
      </SideNavbarContent>
      <div className="h-[50vh]" />
    </div>
  );
}
