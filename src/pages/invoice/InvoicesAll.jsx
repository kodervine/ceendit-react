import { useRef } from "react";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import Nav from "@/components/homepage/Nav";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import ClientMenu from "@/components/clients/ClientMenu";
import Sidebar from "@/components/homepage/Sidebar";
import { useGlobalContext } from "@/context/AppContext";
import { nanoid } from "nanoid";

function Invoices() {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const {
    invoiceFormState,
    userInitState,
    handlePrint,
    handlePreviewInvoicePdf,
  } = useGlobalContext();

  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {innerWidth > 700 && <Sidebar />}

        <Table height="10vh">
          <Thead>
            <Tr>
              {innerWidth > 700 && (
                <Td>
                  {" "}
                  <Tooltip label="Add New Client">
                    <Button>
                      {" "}
                      <AiOutlinePlus />
                    </Button>
                  </Tooltip>
                </Td>
              )}

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
              {innerWidth > 700 && (
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
              )}

              {innerWidth > 700 && (
                <Td>
                  <Flex direction="column">
                    <Text
                      fontSize="md"
                      color="blue.400"
                      fontWeight="semibold"
                      pb=".2rem"
                    >
                      Debt
                    </Text>
                    <Progress
                      colorScheme="blue"
                      size="xs"
                      value="200"
                      borderRadius="15px"
                    />
                  </Flex>
                </Td>
              )}

              {innerWidth < 700 && (
                <Td>
                  {" "}
                  <Tooltip label="Add New Client">
                    <Button>
                      {" "}
                      <AiOutlinePlus />
                    </Button>
                  </Tooltip>
                </Td>
              )}
            </Tr>
          </Thead>

          {/* Another table */}
          <Tbody>
            {invoiceFormState.allInvoiceData.map((invoices, index) => {
              const { billToName, dateDue, itemContainer } = invoices;
              const numericDate = dateDue;
              const date = new Date(numericDate);
              const options = {
                // weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const textDate = date.toLocaleDateString("en-UK", options);
              return (
                <Tr key={nanoid()}>
                  {innerWidth > 700 && (
                    <Td>
                      <Avatar />
                    </Td>
                  )}
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
                        {textDate}
                      </Text>
                    </Flex>
                  </Td>
                  {innerWidth > 700 && (
                    <Td>
                      <Badge
                        bg="green.400"
                        color="white"
                        fontSize="14px"
                        p="3px 10px"
                        borderRadius="8px"
                      >
                        NOT DUE
                      </Badge>
                    </Td>
                  )}
                  {innerWidth > 700 && (
                    <Td>
                      {itemContainer.map((item, id) => {
                        return (
                          <Flex direction="column" key={nanoid()}>
                            <Text
                              fontSize="md"
                              color={textColor}
                              fontWeight="semibold"
                              minWidth="100%"
                            >
                              {item.itemContent}
                            </Text>
                            <Text
                              fontSize="sm"
                              color="gray.400"
                              fontWeight="normal"
                            >
                              #{item.itemPrice} * {item.itemQty}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Td>
                  )}
                  <Td>
                    <ClientMenu
                      delete="Delete Invoice"
                      moreDetails="More Details"
                      view="View Invoices"
                      navigate={`invoices/${userInitState.currentUser.displayName}/${index}`}
                      download="Download Invoice"
                      handleDownload={handlePreviewInvoicePdf}

                      // {handlePrint(invoices, index)}
                    />
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

export default Invoices;
