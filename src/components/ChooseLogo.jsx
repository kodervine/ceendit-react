import React from "react";
import {
  Image,
  Heading,
  Input,
  Box,
  Flex,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useGlobalContext } from "../context";

const ChooseLogo = () => {
  const { handleLogoImageChange } = useGlobalContext();
  return (
    <Stack>
      <Heading as="h3" fontSize="lg">
        Choose your brand logo
      </Heading>
      <Flex>
        <Input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleLogoImageChange}
        />
      </Flex>
    </Stack>
  );
};

export default ChooseLogo;
