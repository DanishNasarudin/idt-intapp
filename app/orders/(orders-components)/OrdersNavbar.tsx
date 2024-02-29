import BackendNavbar from "@/app/(components)/BackendNavbar";
import {
  DashboardIcon,
  OrdersIcon,
  CartIcon,
  CouponIcon,
} from "@/app/(components)/Icons";

const links = [
  {
    link: "/orders",
    name: "Dashboard",
    icon: <DashboardIcon size={18} />,
  },
];

const linksBranch = [
  {
    link: "/orders/ampang-hq",
    name: "Ampang HQ",
    icon: <DashboardIcon size={18} />,
  },
  {
    link: "/orders/ss2-pj",
    name: "SS2, PJ",
    icon: <OrdersIcon size={18} />,
  },
  {
    link: "/orders/setia-alam",
    name: "Setia Alam",
    icon: <CartIcon size={18} />,
  },
  {
    link: "/orders/jb",
    name: "Johor Bahru",
    icon: <CouponIcon size={18} />,
  },
];

const OrdersNavbar = () => {
  return (
    <BackendNavbar title="Orders" topLink={links} bottomLink={linksBranch} />
  );
};

export default OrdersNavbar;
