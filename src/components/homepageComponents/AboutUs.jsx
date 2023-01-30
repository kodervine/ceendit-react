import React from "react";
import { Flex, Spacer, Text, useMediaQuery, Icon } from "@chakra-ui/react";
import { FaTools, FaHandshake, FaStar } from "react-icons/fa";
import { nanoid } from "nanoid";

const AboutUs = () => {
  const [isLargerThan48] = useMediaQuery("(min-width: 48em)");

  const array = [
    {
      id: 1,
      text: " Solving world ... [truncated]",
      icon: FaTools,
    },
    {
      id: 2,
      text: "Through team work, ... [truncated]",
      icon: FaHandshake,
    },
    {
      id: 3,
      text: "Five star service with ... [truncated]",
      icon: FaStar,
    },
  ];

  return (
    <Flex
      minH="70vh"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="16"
      px={isLargerThan48 ? "16" : "6"}
      flexWrap="wrap"
      flexDirection={isLargerThan48 ? "row" : "column"}
    >
      {array.map((arr) => (
        <>
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
            key={nanoid}
          >
            <Icon as={arr.icon} boxSize={14} color="blue.600" mb="5" />
            <Text>{arr.text}</Text>
          </Flex>

          <Spacer />
        </>
      ))}
    </Flex>
  );
};

export default AboutUs;
