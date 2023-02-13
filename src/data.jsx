import { HiUsers, HiViewGrid } from "react-icons/hi";
import { GoHome, GoSignOut } from "react-icons/go";
import { FaFileInvoiceDollar, FaUserCheck } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

export const sidebarData = [
  {
    title: "Home",
    links: [
      {
        name: "Dashboard",
        icon: <GoHome />,
        link: "/dashboard",
      },
      {
        name: "Create Invoice",
        icon: <FaFileInvoiceDollar />,
        link: "/create-invoice",
      },
      {
        name: "Preview Invoice",
        icon: <MdPreview />,
        link: "/form-preview",
      },
      {
        name: "See All Invoice",
        icon: <HiViewGrid />,
        link: "/invoice-history",
      },
      {
        name: "My clients",
        icon: <HiUsers />,
        link: "/my-clients",
      },
      {
        name: "One client",
        icon: <HiUsers />,
        link: "/client",
      },
    ],
  },
  {
    title: "Others",
    links: [
      {
        name: "Settings",
        icon: <AiOutlineSetting />,
      },
      {
        name: "Subscription",
        icon: <FaUserCheck />,
      },
    ],
  },
];
