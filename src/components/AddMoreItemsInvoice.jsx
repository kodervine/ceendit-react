import React from "react";
import { Stack, Input, Textarea, Heading } from "@chakra-ui/react";

const AddMoreItemsInvoice = () => {
  return (
    <Stack spacing={3}>
      <Heading as="h4" size="md">
        Item
      </Heading>
      {/* Item Content */}
      <Textarea
        size="sm"
        name="Item content"
        type="text"
        id="item-content"
        placeholder="Content owed to you"
        value=""
      />

      {/* qty */}
      <Heading as="h4" size="md">
        Qty
      </Heading>
      <Input type="number" name="qty" id="item-qty" value="" />

      <Heading as="h4" size="md">
        Price
      </Heading>
      <Input
        type="number"
        name="Price of item"
        id="price"
        placeholder="Item Price"
        value=""
      />
    </Stack>
  );
};

export default AddMoreItemsInvoice;
