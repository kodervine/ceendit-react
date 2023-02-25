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
  Tooltip,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Nav from "@/components/homepage/Nav";
import ClientMenu from "@/components/clients/ClientMenu";
import Sidebar from "@/components/homepage/Sidebar";
import { useGlobalContext } from "@/context/AppContext";
import { nanoid } from "nanoid";

function AllClientsPage() {
  const textColor = useColorModeValue("gray.700", "white");

  const { invoiceFormState } = useGlobalContext();
  console.log(invoiceFormState.allInvoiceData);

  return (
    <>
      <Nav />
      <Flex>
        <Sidebar />

        <Table height="10vh">
          <Thead>
            <Tr>
              <Td>
                {" "}
                <Tooltip label="Add New Client">
                  <Button>
                    {" "}
                    <AiOutlinePlus />
                  </Button>
                </Tooltip>
              </Td>
              <Td>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="semibold"
                  minWidth="100%"
                >
                  Name
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
                <Button p="0px" bg="transparent"></Button>
              </Td>
            </Tr>
          </Thead>

          {/* Another table */}
          <Tbody>
            {invoiceFormState.allInvoiceData.map((clients, index) => {
              const { billToName, billToEmail, dateCreated, dateDue } = clients;
              return (
                <Tr key={nanoid()}>
                  {" "}
                  <Td>
                    <Avatar />
                  </Td>
                  <Td height="10vh">
                    <Flex direction="column">
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="semibold"
                        minWidth="100%"
                      >
                        {billToName}
                      </Text>
                      <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        {billToEmail}
                      </Text>
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
                      {dateDue}
                    </Text>
                  </Td>
                  <Td>
                    <ClientMenu />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default AllClientsPage;
