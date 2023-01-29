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
  const smallScreenWidth = window.innerWidth < 700;
  const { allInvoiceData, handlePrint, EachDownloadRef } = useGlobalContext();

  return (
    <div>
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
            bg="white"
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
                  <Tr bg="gray.100">
                    <Th>Bank Name</Th>
                    <Th>Account Name</Th>
                    <Th isNumeric>Account Number</Th>
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
                  <Tr bg="gray.100">
                    <Th>Item Details</Th>
                    <Th isNumeric>Qty</Th>
                    <Th isNumeric>Item Price</Th>
                    <Th isNumeric>Items Total</Th>
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
              <DeleteInvoice id={invoiceFirestore} />
            </Flex>
          </Stack>
        );
      })}
    </div>
  );
};

export default InvoiceHistory;
