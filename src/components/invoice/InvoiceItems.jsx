import { Box, Flex, Heading, Input, Stack, Textarea } from "@chakra-ui/react";

/* Props for the input values are gotten from InvoiceApp page rendered with InvoiceItems name, with data from the useState declared on the useContext component */

const InvoiceItems = ({
  nameOfInvoiceItemPrice,
  nameOfInvoiceItemContent,
  nameOfInvoiceItemQty,
  valueOfInvoiceItemPrice,
  valueOfInvoiceItemContent,
  valueOfInvoiceItemQty,
  onHandleChange,
}) => {
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
          placeholder="Work you did"
          value={valueOfInvoiceItemContent}
          onChange={onHandleChange}
        />
        <Flex gap="2" alignItems="center">
          {/* qty */}
          <Box width="100%">
            <Heading as="h4" size="sm" pb="2">
              Qty
            </Heading>
            <Input
              type="number"
              placeholder="Number of items"
              name={nameOfInvoiceItemQty}
              value={valueOfInvoiceItemQty}
              onChange={onHandleChange}
            />
          </Box>
          <Box width="100%">
            <Heading as="h4" size="sm" pb="2">
              Price
            </Heading>
            <Input
              type="number"
              name={nameOfInvoiceItemPrice}
              placeholder="Item Price"
              value={valueOfInvoiceItemPrice}
              onChange={onHandleChange}
            />{" "}
          </Box>
        </Flex>
      </Stack>
    </div>
  );
};

export default InvoiceItems;
