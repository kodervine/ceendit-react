import React, { useRef } from "react";
import logo from "../assets/logo.png";
import {
  Box,
  Image,
  Button,
  Stack,
  Heading,
  Flex,
  Spacer,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";
import DeleteInvoice from "../components/DeleteInvoice";
import Nav from "../components/homepageComponents/Nav";
import DrawerComponent from "../components/homepageComponents/DrawerComponent";

//  set up the invoice history page with data gotten from the allInvoiceData state from context.
const InvoiceHistory = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  const { colorMode } = useColorMode();
  // javascript
  const { allInvoiceData, handlePrint, EachDownloadRef } = useGlobalContext();

  return (
    <Box>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      {/* Data from context.jsx. Basically, array of the invoiceData field in firebase */}
      {allInvoiceData.map((invoiceFirestore, index) => {
        return (
          <Stack
            key={nanoid()}
            width={{ base: "100%", md: "90%", lg: "70%" }}
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
                  <Tr>
                    <Td>{invoiceFirestore.itemContent}</Td>
                    <Td isNumeric>{invoiceFirestore.itemQty}</Td>
                    <Td isNumeric>{invoiceFirestore.itemPrice}</Td>
                    <Td isNumeric>
                      #
                      {parseInt(
                        invoiceFirestore.itemQty * invoiceFirestore.itemPrice
                      )}
                    </Td>
                  </Tr>
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

              {/* same id from the map from firestore */}
              <DeleteInvoice id={index} />
            </Flex>
          </Stack>
        );
      })}
    </Box>
  );
};

export default InvoiceHistory;

// The data for the invoices is obtained from a state called "allInvoiceData" in the context.jsx file.

// The "Invoice History" page also has a drawer component and a navigation bar. The drawer component is used to display additional information when opened and the navigation bar provides navigation to other pages in the app.

// Each invoice is mapped over and its details are displayed using a Stack component. Some of the data for each invoice, such as the invoice number, is dynamically generated using a unique key from the "nanoid" library and the index of the mapped over array.

// The "Invoice History" page has functionalities for printing invoices and downloading invoices as PDF files. The print function is triggered using the "handlePrint" function from the context, and the download function uses "EachDownloadRef".
