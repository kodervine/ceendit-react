import React, { useState } from "react";
import { Stack, Input, Textarea, Heading, Box, Flex } from "@chakra-ui/react";

const AddMoreItemsInvoice = () => {
  const [addedInvoiceContent, setAddedInvoiceContent] = useState("");
  const [addedInvoiceQty, setAddedInvoiceQty] = useState("");
  const [addedInvoicePrice, setAddedInvoicePrice] = useState("");

  return (
    <Stack spacing={3}>
      <Heading as="h4" size="sm">
        Item
      </Heading>
      {/* Item Content */}
      <Textarea
        size="sm"
        name="addedInvoiceContent"
        type="text"
        placeholder="Work you did"
        value={addedInvoiceContent}
        onChange={(e) => setAddedInvoiceContent(e.target.value)}
      />

      {/* qty */}
      <Flex alignItems="center" gap="2">
        <Box w="100%">
          <Heading as="h4" size="sm" pb="2">
            Qty
          </Heading>
          <Input
            type="number"
            name="addedInvoiceQty"
            value={addedInvoiceQty}
            onChange={(e) => setAddedInvoiceQty(e.target.value)}
          />
        </Box>
        <Box w="100%">
          <Heading as="h4" size="sm" pb="2">
            Price
          </Heading>
          <Input
            type="number"
            name="addedInvoicePrice"
            placeholder="Item Price"
            value={addedInvoicePrice}
            onChange={(e) => setAddedInvoicePrice(e.target.value)}
          />
        </Box>
      </Flex>
    </Stack>
  );
};

export default AddMoreItemsInvoice;
