import React from "react";
import { Stack, Input, Textarea, Heading } from "@chakra-ui/react";

// Props for the input values are gotten from InvoiceApp page rendered with InvoiceItems name, with data from the useState declared on the useContext component
const InvoiceItems = ({
  nameOfInvoiceItemName,
  nameOfInvoiceItemContent,
  nameOfInvoiceItemQty,
  nameOfInvoiceItemTotal,
  valueOfInvoiceItemName,
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
        <Input
          type="text"
          name={nameOfInvoiceItemName}
          id="item-name"
          placeholder="Item name"
          value={valueOfInvoiceItemName}
          onChange={onHandleChange}
        />
        {/* Item Contentt */}
        <Textarea
          size="sm"
          name={nameOfInvoiceItemContent}
          type="text"
          id="item-content"
          placeholder="Content owed to you"
          value={valueOfInvoiceItemContent}
          onChange={onHandleChange}
        />

        {/* qty */}
        <Heading as="h4" size="md">
          Qty
        </Heading>
        <Input
          type="number"
          name={nameOfInvoiceItemQty}
          id="item-qty"
          value={valueOfInvoiceItemQty}
          onChange={onHandleChange}
        />
        {/* Total */}
        <Heading as="h4" size="md">
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
