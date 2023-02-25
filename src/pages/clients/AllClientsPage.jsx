import {
  Avatar,
  Badge,
  Button,
  Flex,
  Icon,
  IconButton,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEllipsisV, FaPersonBooth } from "react-icons/fa";
import Nav from "@/components/homepage/Nav";
import ClientMenu from "@/components/clients/ClientMenu";
import Sidebar from "@/components/homepage/Sidebar";

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
                    Duration
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
                  <Avatar />
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
                <Badge
                  bg="green.400"
                  color="white"
                  fontSize="14px"
                  p="3px 10px"
                  borderRadius="8px"
                >
                  Active
                </Badge>
              </Td>
              <Td>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="semibold"
                  pb=".5rem"
                >
                  View invoices
                </Text>
              </Td>
              <Td>
                <ClientMenu />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default AllClientsPage;
