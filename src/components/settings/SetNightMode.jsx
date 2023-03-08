import React from "react";
import { Box, useColorMode, Flex, Text } from "@chakra-ui/react";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useThemeContext } from "@/context/ThemeContext";

const SetNightMode = () => {
  const { isEvening } = useThemeContext();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Text>Color Scheme</Text>
      <Flex justifyContent="space-between">
        <Box height={20} backgroundColor="blue">
          <Text>Light mode</Text>
        </Box>
        <Box height={20} backgroundColor="gray">
          <Text>Dark mode</Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between">
        {" "}
        <Text>Schedule Night Mode</Text>
        {isEvening ? <BsToggle2Off /> : <BsToggle2On />}
      </Flex>

      <Text>Turn on</Text>
      <Text>Turn off</Text>
    </div>
  );
};

export default SetNightMode;
