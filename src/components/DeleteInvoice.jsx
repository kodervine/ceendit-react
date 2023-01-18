import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useGlobalContext } from "../context";

// Id parameter is the index of each of invoice mapped from the invoiceHistory page.
const DeleteInvoice = ({ id }) => {
  const smallScreenWidth = window.innerWidth < 700;
  const { handleDeleteInvoice } = useGlobalContext();
  return (
    // The handleGenerateInvoicePdf frpm the useContext is executed here and rendered on the App.js
    <Box
      width={{ base: "100%", md: "90%", lg: "70%" }}
      maxW="960px"
      margin="auto"
      mt="10px"
      mb="10px"
    >
      <Button
        onClick={() => {
          handleDeleteInvoice(id);
        }}
        colorScheme="blue"
        borderColor="gray.200"
        boxShadow="lg"
        width={smallScreenWidth ? "100%" : "auto"}
      >
        Delete Invoice
      </Button>
    </Box>
  );
};

export default DeleteInvoice;
