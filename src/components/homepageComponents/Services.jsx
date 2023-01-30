import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Spacer,
  Image,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";

const Services = () => {
  const [isLargerThan62] = useMediaQuery("(min-width: 62em)");

  const array = [
    {
      text: "Generate professional PDF invoices to download or print",
      icon: FaTools,
    },
    {
      text: "Save time and increase efficiency",
      icon: FaHandshake,
    },
    {
      text: "Reduce the risk of errors and missed payments.",
      icon: FaStar,
    },
    {
      text: "Improve your cash flow and get paid faster.",
      icon: FaStar,
    },
    {
      text: "Impress your clients with professional invoices.",
      icon: FaStar,
    },
  ];

  const navigateUser = useNavigate();
  const handleNavigateUser = () => {
    navigateUser("/signin");
  };

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
        <Image src="" alt="Chakra Team" w="full" />
      </Flex>

      <Spacer />

      <Flex
        w={isLargerThan62 ? "60%" : "full"}
        flexDirection="column"
        ml={isLargerThan62 ? "7" : "0"}
      >
        <Text fontSize={isLargerThan62 ? "5xl" : "4xl"} fontWeight="bold">
          Easily create and send invoices in seconds
        </Text>

        <Text mb="6" opacity="0.8">
          Generate professional PDF invoices to download or print
        </Text>
        <Text mb="6" opacity="0.8">
          Save time and increase efficiency
        </Text>
        <Text mb="6" opacity="0.8">
          Reduce the risk of errors and missed payments
        </Text>
        <Text mb="6" opacity="0.8">
          Improve your cash flow and get paid faster
        </Text>
        <Text mb="6" opacity="0.8">
          Impress your clients with professional invoices
        </Text>

        <Button
          width="200px"
          size="lg"
          colorScheme="blue"
          onClick={handleNavigateUser}
        >
          Create your Invoice
        </Button>
      </Flex>
    </Flex>
  );
};

export default Services;
