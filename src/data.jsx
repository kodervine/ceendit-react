import { AiOutlineSetting } from "react-icons/ai";
import { FaFileInvoiceDollar, FaUserCheck } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { HiUsers, HiViewGrid } from "react-icons/hi";
import { MdMobileScreenShare, MdPreview } from "react-icons/md";

export const linksData = [
  {
    title: "Overview",
    linkItems: [
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
    ],
  },
  {
    title: "Others",
    linkItems: [
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
