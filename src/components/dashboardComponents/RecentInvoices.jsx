import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Box, Flex, Grid, Text, Heading } from "@chakra-ui/react";
import { useGlobalContext } from "@/context/AppContext";

const RecentInvoices = () => {
  const { invoiceFormState } = useGlobalContext();
  return (
    <Box
      width={{ sm: "90%", lg: "50%" }}
      position="relative"
      height={{ sm: "50vh", lg: "70vh" }}
      margin="auto"
      boxShadow="lg"
      borderRadius="lg"
      overflowY="scroll"
      padding={5}
    >
      <Heading as="h5" size="md">
        Recent Invoices
      </Heading>
      <ul>
        {invoiceFormState.allInvoiceData.map((items, index) => {
          const { billToName, dateDue } = items;
          return (
            <Flex
              p={2}
              my={3}
              cursor="pointer"
              key={index}
              justifyContent="space-between"
            >
              <Box backgroundColor="blue.100" padding={3} borderRadius="lg">
                <FaShoppingBag className="text-purple-800" />
              </Box>
              <Text textAlign="left" flex={2} paddingLeft="3">
                {billToName}
              </Text>
              <Text textAlign="right">{dateDue}</Text>
            </Flex>
          );
        })}
      </ul>
    </Box>
  );
};

export default RecentInvoices;
