import React, { useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useGlobalContext } from "../context";
const InvoiceToPdf = () => {
  const { handlePreviewInvoicePdf } = useGlobalContext();

  return (
    // The handlePreviewInvoicePdf from the useContext is executed here and rendered on the FormPreview page
    <Box
      width={{ base: "100%", md: "90%", lg: "70%" }}
      maxW="960px"
      margin="auto"
      mt="10px"
      mb="10px"
    >
      <Button
        onClick={handlePreviewInvoicePdf}
        colorScheme="blue"
        borderColor="gray.200"
        boxShadow="lg"
      >
        Download Invoice
      </Button>
    </Box>
  );
};

export default InvoiceToPdf;
