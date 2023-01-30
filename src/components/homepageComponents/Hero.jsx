import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  const [isLargerThan62] = useMediaQuery("(min-width: 62em)");

  const navigateUser = useNavigate();
  const handleNavigateUser = () => {
    navigateUser("/signin");
  };

  return (
    <Flex
      alignItems="center"
      w="full"
      px={isLargerThan62 ? "16" : "6"}
      py="16"
      minHeight="90vh"
      justifyContent="space-between"
      flexDirection={isLargerThan62 ? "row" : "column"}
    >
      <Box mr={isLargerThan62 ? "6" : "0"} w={isLargerThan62 ? "60%" : "full"}>
        <Text
          fontSize={isLargerThan62 ? "5xl" : "4xl"}
          fontWeight="bold"
          mb="4"
        >
          {" "}
          Ceendit Invoice Generator
        </Text>

        <Text mb="6" fontSize={isLargerThan62 ? "lg" : "base"} opacity={0.7}>
          Create a professional invoice in pdf format for your clients in less
          than a minute
        </Text>

        <Button
          w="200px"
          colorScheme="blue"
          variant="solid"
          h="50px"
          size={isLargerThan62 ? "lg" : "md"}
          mb={isLargerThan62 ? "0" : "10"}
          onClick={handleNavigateUser}
        >
          Get started
        </Button>
      </Box>

      <Spacer />

      <Flex
        w={isLargerThan62 ? "40%" : "full"}
        alignItems="center"
        justifyContent="center"
      >
        <Image src="" alt="Chakra UI" />
      </Flex>
    </Flex>
  );
};

export default Hero;
