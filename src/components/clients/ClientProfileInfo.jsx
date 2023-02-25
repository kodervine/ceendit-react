import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const ClientProfileInfo = () => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody>
        <Flex direction="column">
          <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
            About client
          </Text>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Full Name:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              Chinenye Anikwenze
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Mobile:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              0819393949494
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Email:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              anikwenzekelly@gmail.com
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ClientProfileInfo;
