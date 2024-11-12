import dynamic from "next/dynamic";
import SideNavbarContent from "../../components/common/SideNavbarContent";

const OrdersNavbar = dynamic(
  () => import("../../components/orders/OrdersNavbar"),
  { ssr: false }
);

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative`}>
      <OrdersNavbar />
      <SideNavbarContent className="px-16 pt-4 w-full">
        {children}
      </SideNavbarContent>
      <div className="h-[50vh]" />
    </div>
  );
}
