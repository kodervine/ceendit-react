import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useGlobalContext } from "../context";

const DeleteInvoice = () => {
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
        onClick={handleDeleteInvoice}
        colorScheme="blue"
        borderColor="gray.200"
        boxShadow="lg"
      >
        DeleteInvoice
      </Button>
    </Box>
  );
};

export default DeleteInvoice;
