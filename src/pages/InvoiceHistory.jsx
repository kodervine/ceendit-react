import React from "react";
import {
  Box,
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
import { useGlobalContext } from "../context";
import InvoiceToPdf from "../components/InvoiceToPdf";
import DeleteInvoice from "../components/DeleteInvoice";

//  set up the invoice history page with data gotten from the allInvoiceData state from context.
const InvoiceHistory = () => {
  const { allInvoiceData, handleDeleteInvoice } = useGlobalContext();
  return (
    <div>
      {allInvoiceData.map((invoice, index) => {
        const {
          dateCreated,
          dateDue,
          billFromEmail,
          billFromName,
          billFromPhoneNumber,
          billToEmail,
          billToName,
          billToPhoneNumber,
          itemName,
          itemContent,
          itemQty,
          itemTotal,
        } = invoice;
        return (
          <Stack
            key={index}
            width={{ base: "100%", md: "90%", lg: "70%" }}
            maxW="960px"
            m="auto"
            mb="6"
            p="6"
            boxShadow="dark-lg"
            rounded="md"
            bg="white"
          >
            {/* Date */}
            <Box>
              <Heading size="md">{billFromName}</Heading>
              <Text>{billFromPhoneNumber}</Text>
              <Text>{billFromEmail}</Text>
            </Box>

            {/* Invoice date and due date */}
            <Flex>
              <Box>
                <Heading size="sm">Invoice date</Heading>
                <Text>{dateCreated}</Text>
              </Box>
              <Spacer />
              <Box>
                <Heading size="sm">Due date</Heading>
                <Text>{dateDue}</Text>
              </Box>
            </Flex>

            {/* Billed to */}
            <Box>
              <Heading size="sm">Billed to</Heading>
              <Text>{billToName}</Text>
              <Text>{billToPhoneNumber}</Text>
              <Text>{billToEmail}</Text>
            </Box>

            {/* Invoice Items */}
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Item Name</Th>
                    <Th>Item Details</Th>
                    <Th isNumeric>Qty</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{itemName}</Td>
                    <Td>{itemContent}</Td>
                    <Td isNumeric>{itemQty}</Td>
                    <Td isNumeric>{itemTotal}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            {/* Buttons  */}
            <Flex>
              <Box>
                <InvoiceToPdf />
              </Box>
              ``
              <Box>
                {/* same index from the map above */}
                <DeleteInvoice id={index} />
              </Box>
            </Flex>
          </Stack>
        );
      })}
    </div>
  );
};

export default InvoiceHistory;
