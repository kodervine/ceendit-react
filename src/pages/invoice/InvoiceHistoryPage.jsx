import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import Nav from "@/components/homepage/Nav";
import Sidebar from "@/components/homepage/Sidebar";
import DeleteInvoice from "@/components/invoice/DeleteInvoice";
import { useGlobalContext } from "@/context/AppContext";

//  set up the invoice history page with data gotten from the allInvoiceData state from context.
const InvoiceHistoryPage = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  const { colorMode } = useColorMode();

  // from AppContext
  const { invoiceFormState, userInitState, handlePrint } = useGlobalContext();

  return (
    <Box>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />

      <Flex>
        {!smallScreenWidth && <Sidebar />}
        {/* Data from context.jsx. Basically, array of the invoiceData field in firebase */}
        <Box width="100%">
          {invoiceFormState.allInvoiceData.map((invoiceFirestore, index) => {
            return (
              <Stack
                key={nanoid()}
                width={{ base: "100%", md: "90%", lg: "90%" }}
                maxW="960px"
                m="auto"
                mb="6"
                p="6"
                boxShadow="dark-lg"
                rounded="md"
                ref={handlePrint}
                // ref={EachDownloadRef.current[index]}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Image src={logo} />
                  <Box>
                    <Text fontWeight="bold">Invoice No 0000{index}</Text>
                  </Box>
                </Flex>

                {/* Date */}
                <Box>
                  <Heading size="md">{invoiceFirestore.billFromName}</Heading>
                  <Text>{invoiceFirestore.billFromPhoneNumber}</Text>
                  <Text>{invoiceFirestore.billFromEmail}</Text>
                </Box>

                {/* Invoice date and due date */}
                <Flex>
                  <Box>
                    <Heading size="sm">Invoice date</Heading>
                    <Text>{invoiceFirestore.dateCreated}</Text>
                  </Box>
                  <Spacer />
                  <Box>
                    <Heading size="sm">Due date</Heading>
                    <Text>{invoiceFirestore.dateDue}</Text>
                  </Box>
                </Flex>

                {/* Billed to */}
                <Box>
                  <Heading size="sm">Billed to</Heading>
                  <Text>{invoiceFirestore.billToName}</Text>
                  <Text>{invoiceFirestore.billToPhoneNumber}</Text>
                  <Text>{invoiceFirestore.billToEmail}</Text>
                </Box>

                {/* Bank details */}
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr bg={colorMode === "light" ? "gray.100" : "blue.100"}>
                        <Th color={colorMode === "light" ? "auto" : "blue.900"}>
                          Bank Name
                        </Th>
                        <Th color={colorMode === "light" ? "auto" : "blue.900"}>
                          Account Name
                        </Th>
                        <Th
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                        >
                          Account Number
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>{invoiceFirestore.bankName}</Td>
                        <Td>{invoiceFirestore.accountName}</Td>
                        <Td isNumeric>{invoiceFirestore.bankAccount}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                {/* Invoice Items */}
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr bg={colorMode === "light" ? "gray.100" : "blue.100"}>
                        <Th color={colorMode === "light" ? "auto" : "blue.900"}>
                          Item Details
                        </Th>
                        <Th
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                        >
                          Qty
                        </Th>
                        <Th
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                          textAlign="center"
                        >
                          Item Price
                        </Th>
                        <Th
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                        >
                          Items Total
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {invoiceFirestore.itemContainer.map((item, index) => {
                        return (
                          <Tr key={nanoid()}>
                            <Td>{item.itemContent}</Td>
                            <Td isNumeric textAlign="center">
                              {item.itemQty}
                            </Td>
                            <Td textAlign="center">{item.itemPrice}</Td>
                            <Td isNumeric>
                              #{parseInt(item.itemQty * item.itemPrice)}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>

                {/* Buttons  */}
                <Flex direction={smallScreenWidth ? "column" : "row"}>
                  <Button
                    onClick={() => handlePrint(invoiceFirestore, index)}
                    colorScheme="blue"
                    mt="10px"
                    width={smallScreenWidth ? "100%" : "auto"}
                    maxW="960px"
                  >
                    <Text>Download</Text>
                  </Button>
                  <Button
                    marginLeft={smallScreenWidth ? "0" : "12px"}
                    colorScheme="blue"
                    mt="10px"
                    width={smallScreenWidth ? "100%" : "auto"}
                    maxW="960px"
                  >
                    <Link
                      to={`/invoices/${userInitState.currentUser.displayName}/${index}`}
                    >
                      Share invoice
                    </Link>
                  </Button>

                  {/* same id from the map from firestore */}
                  <DeleteInvoice id={index} />
                </Flex>
              </Stack>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default InvoiceHistoryPage;
