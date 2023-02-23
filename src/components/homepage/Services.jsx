import {
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { AiFillFilePdf } from "react-icons/ai";
import { BsHourglassSplit, BsShieldCheck } from "react-icons/bs";
import { FaBriefcase } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

import aboutUsImage from "@/assets/aboutus-image.svg";
import { useGlobalContext } from "@/context/AppContext";

const Services = () => {
  const { handleNavigateUser } = useGlobalContext();
  const [isLargerThan62] = useMediaQuery("(min-width: 62em)");

  const servicesPageArray = [
    {
      text: "Generate professional PDF invoices to download or print",
      icon: <AiFillFilePdf />,
    },
    {
      text: "Save time and increase efficiency",
      icon: <BsHourglassSplit />,
    },
    {
      text: "Reduce the risk of errors and missed payments.",
      icon: <BsShieldCheck />,
    },
    {
      text: "Improve your cash flow and get paid faster.",
      icon: <GiReceiveMoney />,
    },
    {
      text: "Impress your clients with professional invoices.",
      icon: <FaBriefcase />,
    },
  ];

  return (
    <Flex
      width="full"
      minHeight="70vh"
      alignItems="center"
      px={isLargerThan62 ? "16" : "6"}
      py="16"
      justifyContent="center"
      flexDirection={isLargerThan62 ? "row" : "column"}
    >
      <Flex
        w={isLargerThan62 ? "40%" : "full"}
        mb={isLargerThan62 ? "0" : "6"}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={aboutUsImage}
          alt="Illustration of invoice woman typing away"
          w="full"
        />
      </Flex>

      <Spacer />

      <Flex
        w={isLargerThan62 ? "60%" : "full"}
        flexDirection="column"
        ml={isLargerThan62 ? "7" : "0"}
      >
        <Text
          fontSize={isLargerThan62 ? "4xl" : "2xl"}
          fontWeight="bold"
          mb="4"
        >
          Easily create and send invoices in seconds
        </Text>

        {servicesPageArray.map((services) => {
          const { text, icon } = services;
          return (
            <Flex
              gap="2"
              alignItems="center"
              mb="6"
              opacity="0.8"
              key={nanoid()}
            >
              {icon} {text}
            </Flex>
          );
        })}

        <Button
          width="200px"
          size="lg"
          colorScheme="blue"
          onClick={() => {
            handleNavigateUser("signin");
          }}
        >
          Create your Invoice
        </Button>
      </Flex>
    </Flex>
  );
};

export default Services;
