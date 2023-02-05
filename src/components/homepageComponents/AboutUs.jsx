import React from "react";
import { Flex, Spacer, Text, useMediaQuery, Icon } from "@chakra-ui/react";
import { FaTools, FaHandshake, FaStar } from "react-icons/fa";
import { nanoid } from "nanoid";

const AboutUs = () => {
  const [isLargerThan48] = useMediaQuery("(min-width: 48em)");
  const [isLargerThan62] = useMediaQuery("(min-width: 62em)");

  const array = [
    {
      id: 1,
      text: "We understand the pain of manual invoicing and the hassle of keeping track of payments. That's why we created Ceendit. Our mission is to simplify the invoicing process for businesses of all sizes, allowing them to focus on what they do best.",
      icon: FaTools,
    },
    {
      id: 2,
      text: "Our team is comprised of experienced professionals who are passionate about technology and dedicated to delivering a high-quality product. We believe in transparency, simplicity, and providing exceptional customer support.",
      icon: FaHandshake,
    },
    {
      id: 3,
      text: "Effortlessly create invoices with just a few clicks. Easily manage your payment history and stay on top of your finances. Join us on our mission to revolutionize invoicing and take control of your payment process. Sign up for free today and see the difference for yourself.",
      icon: FaStar,
    },
  ];

  return (
    <>
      <Text
        fontSize={isLargerThan62 ? "4xl" : "2xl"}
        fontWeight="bold"
        mb="4"
        textAlign="center"
      >
        Who we Are
      </Text>

      <Flex
        minH="70vh"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        py="6"
        px={isLargerThan48 ? "16" : "6"}
        flexWrap="wrap"
        flexDirection={isLargerThan48 ? "row" : "column"}
      >
        {array.map((arr) => (
          <Flex
            height="300px"
            bg="blackAlpha.200"
            width={isLargerThan48 ? "32%" : "full"}
            shadow="md"
            p="6"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            flexDirection="column"
            textAlign="center"
            mb={isLargerThan48 ? "0" : "4"}
            border="1px solid #C4DDFF"
            key={nanoid()}
          >
            <Icon as={arr.icon} boxSize={14} color="blue.600" mb="5" />
            <Text>{arr.text}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default AboutUs;
