import { HiUsers, HiViewGrid } from "react-icons/hi";
import { GoHome, GoSignOut } from "react-icons/go";
import { FaFileInvoiceDollar, FaUserCheck } from "react-icons/fa";
import { MdPreview, MdMobileScreenShare } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";

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
        name: "Share Invoice",
        icon: <MdMobileScreenShare />,
        link: "/share-invoice",
      },
      {
        name: "My clients",
        icon: <HiUsers />,
        link: "/my-clients",
      },
      {
        name: "One client",
        icon: <BsFillPersonPlusFill />,
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
