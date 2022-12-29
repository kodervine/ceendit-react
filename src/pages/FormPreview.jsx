import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Stack,
  Heading,
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

const FormPreview = () => {
  const { invoiceFormData } = useGlobalContext();
  return (
    <Stack>
      {/* Date */}
      <Box>
        <Heading size="md">{invoiceFormData.billFromName}</Heading>
        <Text>{invoiceFormData.billFromPhoneNumber}</Text>
        <Text>{invoiceFormData.billFromEmail}</Text>
      </Box>

      {/* Invoice date and due date */}
      <Flex>
        <Box>
          <Heading size="sm">Invoice date</Heading>
          <Text>{invoiceFormData.dateCreated}</Text>
        </Box>
        <Spacer />
        <Box>
          <Heading size="sm">Due date</Heading>
          <Text>{invoiceFormData.dateDue}</Text>
        </Box>
      </Flex>

      {/* Billed to */}
      <Box>
        <Heading size="sm">Billed to</Heading>
        <Text>{invoiceFormData.billToName}</Text>
        <Text>{invoiceFormData.billToPhoneNumber}</Text>
        <Text>{invoiceFormData.billToEmail}</Text>
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
              <Td>{invoiceFormData.itemName}</Td>
              <Td>{invoiceFormData.itemContent}</Td>
              <Td isNumeric>{invoiceFormData.itemQty}</Td>
              <Td isNumeric>{invoiceFormData.itemTotal}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default FormPreview;
