import React, { useState } from "react";
import {
  Stack,
  Input,
  Textarea,
  Heading,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import AddMoreItemsInvoice from "./AddMoreItemsInvoice";

// Props for the input values are gotten from InvoiceApp page rendered with InvoiceItems name, with data from the useState declared on the useContext component
const InvoiceItems = ({
  nameOfInvoiceItemPrice,
  nameOfInvoiceItemContent,
  nameOfInvoiceItemQty,
  nameOfInvoiceItemTotal,
  valueOfInvoiceItemPrice,
  valueOfInvoiceItemContent,
  valueOfInvoiceItemQty,
  valueOfInvoiceItemTotal,
  onHandleChange,
}) => {
  return (
    <div>
      {/* Item name */}
      <Stack spacing={3}>
        <Heading as="h4" size="md">
          Item
        </Heading>

        {/* Item Contentt */}
        <Textarea
          size="sm"
          name={nameOfInvoiceItemContent}
          type="text"
          id="item-content"
          placeholder="Work you did"
          value={valueOfInvoiceItemContent}
          onChange={onHandleChange}
        />
        <Flex gap="2" alignItems="center">
          {/* qty */}
          <Box>
            <Heading as="h4" size="sm" pb="2">
              Qty
            </Heading>
            <Input
              type="number"
              name={nameOfInvoiceItemQty}
              id="item-qty"
              value={valueOfInvoiceItemQty}
              onChange={onHandleChange}
            />
          </Box>
          <Box>
            <Heading as="h4" size="sm" pb="2">
              Price
            </Heading>
            <Input
              type="number"
              name={nameOfInvoiceItemPrice}
              id="item-price"
              placeholder="Item Price"
              value={valueOfInvoiceItemPrice}
              onChange={onHandleChange}
            />{" "}
          </Box>
        </Flex>

        {/* Total */}

        <Heading as="h4" size="lg">
          Total
        </Heading>
        <Input
          type="number"
          name={nameOfInvoiceItemTotal}
          id="item-total"
          value={valueOfInvoiceItemTotal}
          onChange={onHandleChange}
        />
      </Stack>
    </div>
  );
};

export default InvoiceItems;
