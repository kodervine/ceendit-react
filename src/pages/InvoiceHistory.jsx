import React from "react";
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
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";
import DeleteInvoice from "../components/DeleteInvoice";

//  set up the invoice history page with data gotten from the allInvoiceData state from context.
const InvoiceHistory = () => {
  const {
    allInvoiceData,
    handlePrint,
    handlePreviewInvoicePdf,
    EachDownloadRef,
  } = useGlobalContext();

  return (
    <div>
      {allInvoiceData.map((invoiceFirestore, index) => {
        const { invoice, id } = invoiceFirestore;

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
            bg="white"
            ref={EachDownloadRef.current[index]}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Image src={logo} />
              <Box>
                <Text fontWeight="bold">Invoice No 0000{index}</Text>
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
                  <Tr bg="gray.100">
                    <Th>Bank Name</Th>
                    <Th>Account Name</Th>
                    <Th isNumeric>Account Number</Th>
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
                  <Tr bg="gray.100">
                    <Th>Item Details</Th>
                    <Th isNumeric>Qty</Th>
                    <Th isNumeric>Item Price</Th>
                    <Th isNumeric>Items Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{invoice.itemContent}</Td>
                    <Td isNumeric>{invoice.itemQty}</Td>
                    <Td isNumeric>{invoice.itemPrice}</Td>
                    <Td isNumeric>
                      #{parseInt(invoice.itemQty * invoice.itemPrice)}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            {/* Buttons  */}
            <Flex>
              <Button
                onClick={() => handlePrint(index)}
                colorScheme="blue"
                mt="10px"
              >
                <Text>Download</Text>
              </Button>

              <Box>
                {/* same id from the map from firestore */}
                <DeleteInvoice id={invoiceFirestore} />
                {/* {console.log(invoiceFirestore.id)} */}
              </Box>
            </Flex>
          </Stack>
        );
      })}
    </div>
  );
};

export default InvoiceHistory;
