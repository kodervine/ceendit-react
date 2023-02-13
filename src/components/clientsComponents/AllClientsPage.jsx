import React from "react";
import logo from "../../assets/logo.png";
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  IconButton,
  Button,
  useColorModeValue,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import Nav from "../homepageComponents/Nav";
import Sidebar from "../Sidebar";

function AllClientsPage() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  return (
    <>
      <Nav />
      <Flex>
        <Sidebar />
        <Table height="10vh">
          <Thead>
            <Tr>
              <Td>
                <Flex
                  alignItems="center"
                  py=".8rem"
                  minWidth="100%"
                  flexWrap="nowrap"
                >
                  <IconButton h={"24px"} w={"24px"} me="18px" />
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="semibold"
                    minWidth="100%"
                  >
                    Name
                  </Text>
                </Flex>
              </Td>
              <Td>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="semibold"
                  pb=".5rem"
                >
                  Company
                </Text>
              </Td>
              <Td>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="semibold"
                  pb=".5rem"
                >
                  Status
                </Text>
              </Td>
              <Td>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color="blue.400"
                    fontWeight="semibold"
                    pb=".2rem"
                  >
                    Progression
                  </Text>
                  <Progress
                    colorScheme="blue"
                    size="xs"
                    value="200"
                    borderRadius="15px"
                  />
                </Flex>
              </Td>
              <Td>
                <Button p="0px" bg="transparent">
                  <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
                </Button>
              </Td>
            </Tr>
          </Thead>

          {/* Another table */}
          <Tbody>
            <Tr>
              <Td height="10vh">
                <Flex
                  align="center"
                  py=".8rem"
                  minWidth="100%"
                  flexWrap="nowrap"
                >
                  <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
                  <Flex direction="column">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="semibold"
                      minWidth="100%"
                    >
                      Chinenye Anikwenze
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      anikwenzekelly@gmail.com
                    </Text>
                  </Flex>
                </Flex>
              </Td>

              <Td>
                <Flex direction="column">
                  <Text fontSize="md" color={textColor} fontWeight="semibold">
                    domain
                  </Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    subdomain
                  </Text>
                </Flex>
              </Td>
              <Td>
                <Badge
                  bg={"status" === "Online" ? "green.400" : bgStatus}
                  color={"status" === "Online" ? "white" : colorStatus}
                  fontSize="16px"
                  p="3px 10px"
                  borderRadius="8px"
                >
                  status
                </Badge>
              </Td>
              <Td>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="semibold"
                  pb=".5rem"
                >
                  date
                </Text>
              </Td>
              <Td>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="md"
                    color="gray.400"
                    fontWeight="semibold"
                    cursor="pointer"
                  >
                    Edit
                  </Text>
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default AllClientsPage;
