import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useGlobalContext } from "../context";
const InvoiceToPdf = () => {
  const { handleGenerateInvoicePdf } = useGlobalContext();
  return (
    // The handleGenerateInvoicePdf frpm the useContext is executed here and rendered on the App.js
    <Box mt="10px">
      <Button onClick={handleGenerateInvoicePdf} colorScheme="blue">
        Download Invoice
      </Button>
    </Box>
  );
};

export default InvoiceToPdf;
