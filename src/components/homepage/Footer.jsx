import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      w="full"
      bg="blackAlpha.50"
      minHeight="20vh"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      <Text mb="3">
        Provided by{" "}
        <Link
          href="https://github.com/kodervine/ceendit-react"
          isExternal
          color="blue.500"
        >
          Chinenye Anikwenze
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
