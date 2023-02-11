import React from "react";
import { useGlobalContext } from "../context/AppContext";
import { Stack, Input, Textarea, Heading, Flex, Box } from "@chakra-ui/react";

// Props for the input values are gotten from InvoiceApp page rendered with InvoiceItems name, with data from the useState declared on the useContext component
const InvoiceItems = ({
  nameOfInvoiceItemPrice,
  nameOfInvoiceItemContent,
  nameOfInvoiceItemQty,
  valueOfInvoiceItemPrice,
  valueOfInvoiceItemContent,
  valueOfInvoiceItemQty,
  onHandleChange,
}) => {
  const { handleInputChange } = useGlobalContext();
  return (
    <div>
      {/* Item name */}
      <Stack spacing={3}>
        <Heading as="h4" size="md" mt="2">
          Items
        </Heading>

        {/* Item Contentt */}
        <Textarea
          size="sm"
          name={nameOfInvoiceItemContent}
          type="text"
          id="item-content"
          placeholder="Work you did"
          value={valueOfInvoiceItemContent}
          onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />{" "}
          </Box>
        </Flex>
      </Stack>
    </div>
  );
};

export default InvoiceItems;
