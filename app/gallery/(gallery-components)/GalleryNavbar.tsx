import BackendNavbar, { LinkType } from "@/app/(components)/BackendNavbar";
import { DashboardIcon, OrdersIcon } from "@/app/(components)/Icons";

const links: LinkType[] = [];

const linksBranch = [
  {
    link: "/gallery",
    name: "Home",
    icon: <DashboardIcon size={18} />,
  },
  {
    link: "/gallery/entry",
    name: "Data Entry",
    icon: <OrdersIcon size={18} />,
  },
  // {
  //   link: "/orders/setia-alam",
  //   name: "Setia Alam",
  //   icon: <CartIcon size={18} />,
  // },
  // {
  //   link: "/orders/jb",
  //   name: "Johor Bahru",
  //   icon: <CouponIcon size={18} />,
  // },
];

const GalleryNavbar = () => {
  return (
    <BackendNavbar title="Gallery" topLink={links} bottomLink={linksBranch} />
  );
};

export default GalleryNavbar;
