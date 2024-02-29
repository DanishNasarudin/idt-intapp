import {
  DashboardIcon,
  HouseIcon,
  SettingIcon,
} from "@/app/(components)/Icons";
import BackendNavbar from "@/app/(components)/BackendNavbar";

type Props = {};

const links = [
  {
    link: "/warranty",
    name: "Dashboard",
    icon: <DashboardIcon size={18} />,
  },
  {
    link: "/warranty/settings",
    name: "Settings",
    icon: <SettingIcon size={18} />,
  },
];

const linksBranch = [
  {
    link: "/warranty/ampang-hq",
    name: "Ampang HQ",
    icon: <HouseIcon size={18} />,
  },
  {
    link: "/warranty/ss2-pj",
    name: "SS2, PJ",
    icon: <HouseIcon size={18} />,
  },
  {
    link: "/warranty/setia-alam",
    name: "Setia Alam",
    icon: <HouseIcon size={18} />,
  },
  {
    link: "/warranty/jb",
    name: "Johor Bahru",
    icon: <HouseIcon size={18} />,
  },
];

const WarrantyNavbar = (props: Props) => {
  return (
    <BackendNavbar title="Warranty" topLink={links} bottomLink={linksBranch} />
  );
};

export default WarrantyNavbar;
