import { HiUsers, HiBriefcase } from "react-icons/hi";
import {
  BsFillPersonCheckFill,
  BsFillPersonXFill,
  BsFillPersonPlusFill,
  BsPiggyBank,
  BsBank,
} from "react-icons/bs";
import { GiReceiveMoney, GiTakeMyMoney, GiWaxSeal } from "react-icons/gi";
import { FaChartBar, FaCoins, FaHandshake, FaScroll } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import {
  MdMiscellaneousServices,
  MdPersonSearch,
  MdPhoneAndroid,
} from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { AiOutlineAudit } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";

export const sidebarData = [
  {
    title: "",
    links: [
      {
        name: "Switch Organisation",
        icon: <HiBriefcase />,
        arrow: <RiArrowDropDownLine />,
      },
    ],
  },
  {
    title: "",
    links: [
      {
        name: "Dashboard",
        icon: <GoHome />,
      },
    ],
  },
  {
    title: "Customers",
    links: [
      {
        name: "Users",
        icon: <HiUsers />,
      },
      {
        name: "Guarantors",
        icon: <BsFillPersonCheckFill />,
      },
      {
        name: "Loans",
        icon: <GiTakeMyMoney />,
      },
      {
        name: "Decison Models",
        icon: <FaHandshake />,
      },
      {
        name: "Savings",
        icon: <BsPiggyBank />,
      },
      {
        name: "Loan Requests",
        icon: <GiReceiveMoney />,
      },
      {
        name: "Whitelist",
        icon: <BsFillPersonPlusFill />,
      },
      {
        name: "Karma",
        icon: <BsFillPersonXFill />,
      },
    ],
  },
  {
    title: "Business",
    links: [
      {
        name: "Organization",
        icon: <HiBriefcase />,
      },

      {
        name: "Loans Products",
        icon: <GiTakeMyMoney />,
      },
      {
        name: "Savings Products",
        icon: <BsBank />,
      },
      {
        name: "Fees and Charges",
        icon: <FaCoins />,
      },
      {
        name: "Transactions",
        icon: <MdPhoneAndroid />,
      },

      {
        name: "Services",
        icon: <MdMiscellaneousServices />,
      },
      {
        name: "Service Account",
        icon: <MdPersonSearch />,
      },
      {
        name: "Settlements",
        icon: <FaScroll />,
      },
      {
        name: "Reports",
        icon: <FaChartBar />,
      },
    ],
  },
  {
    title: "Settings",
    links: [
      {
        name: "Preferences",
        icon: <TbAdjustmentsHorizontal />,
      },
      {
        name: "Fees and Pricing",
        icon: <GiWaxSeal />,
      },
      {
        name: "Audit Log",
        icon: <AiOutlineAudit />,
      },
    ],
  },
];
