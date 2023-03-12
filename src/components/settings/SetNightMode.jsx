import React from "react";
import { Box, useColorMode, Flex, Text } from "@chakra-ui/react";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useThemeContext } from "@/context/ThemeContext";

const SetNightMode = () => {
  const { isEvening } = useThemeContext();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Text
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="bold"
        color="gray.600"
      >
        Color Scheme
      </Text>
      <Flex justifyContent="space-between" gap="40px">
        <Box
          height="40vh"
          width={200}
          borderRadius="10px"
          cursor="pointer"
          bgGradient="linear(to-b, blue.300, pink.200, blue.100)"
        >
          <Text textAlign="center">Light mode</Text>
        </Box>
        <Box
          height="40vh"
          width={200}
          borderRadius="10px"
          cursor="pointer"
          bgGradient="linear(to-t, black, gray.700, blue.100)"
        >
          <Text textAlign="center">Dark mode</Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between">
        {" "}
        <Text fontWeight="bold" my={4}>
          Schedule Night Mode
        </Text>
        <Box my={4} onClick={toggleColorMode}>
          {" "}
          {/* {isEvening && colorMode === "dark"} */}
          {colorMode === "light" ? (
            <BsToggle2Off size="30px" />
          ) : (
            <BsToggle2On size="30px" />
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default SetNightMode;
