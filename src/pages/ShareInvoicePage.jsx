import React, { useRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import {
  Box,
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
import Nav from "../components/homepageComponents/Nav";
import DrawerComponent from "../components/homepageComponents/DrawerComponent";
import Sidebar from "../components/Sidebar";
import { nanoid } from "nanoid";

const ShareInvoicePage = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const smallScreenWidth = window.innerWidth < 700;
  const { colorMode } = useColorMode();

  const { invoiceFormState, handlePreviewInvoicePdf } = useGlobalContext();

  const { id } = useParams();
  const invoiceIndex = parseInt(id, 10); // Convert id to integer
  const invoice = invoiceFormState.allInvoiceData.filter(
    (_, index) => index === invoiceIndex
  )[0];

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {/* ShareInvoicePage {id} */}
        {!smallScreenWidth && <Sidebar />}
        <Stack
          width={{ base: "100%", md: "90%", lg: "90%" }}
          maxW="960px"
          m="auto"
          mb="6"
          p="6"
          boxShadow="dark-lg"
          rounded="md"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontWeight="bold">Invoice No 0000</Text>
            </Box>
          </Flex>

          {/* Date */}
          <Box>
            <Heading size="md">{invoice.billFromName}</Heading>
            <Text>{invoice.billFromPhoneNumber}</Text>
            <Text>{invoice.billFromEmail}</Text>
          </Box>

          {/* Invoice date and due date */}
          <Flex>
            <Box>
              <Heading size="sm">Invoice date</Heading>
              <Text>{invoice.dateCreated}</Text>
            </Box>
            <Spacer />
            <Box>
              <Heading size="sm">Due date</Heading>
              <Text>{invoice.dateDue}</Text>
            </Box>
          </Flex>

          {/* Billed to */}
          <Box>
            <Heading size="sm">Billed to</Heading>
            <Text>{invoice.billToName}</Text>
            <Text>{invoice.billToPhoneNumber}</Text>
            <Text>{invoice.billToEmail}</Text>
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
                  <Td>{invoice.bankName}</Td>
                  <Td>{invoice.accountName}</Td>
                  <Td isNumeric>{invoice.bankAccount}</Td>
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
                {invoice.itemContainer.map((item, index) => {
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
              onClick={handlePreviewInvoicePdf}
              colorScheme="blue"
              mt="10px"
              width={smallScreenWidth ? "100%" : "auto"}
              maxW="960px"
            >
              {/* <InvoiceToPdf index={id} /> */}
              <Text>Download</Text>
            </Button>
          </Flex>
        </Stack>
        {/* Add more fields as needed */}
      </Flex>
    </>
  );
};

export default ShareInvoicePage;
