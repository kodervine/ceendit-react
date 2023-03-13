import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { useGlobalContext } from "@/context/AppContext";

const RecentInvoices = () => {
  const { userInitState, invoiceFormState, handleNavigateUser } =
    useGlobalContext();
  return (
    <Box
      width={innerWidth > 700 ? "50%" : "90%"}
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
        {invoiceFormState.allInvoiceData
          .slice()
          .reverse()
          .map((items, index) => {
            const { billToName, dateDue } = items;
            return (
              <Flex
                p={2}
                my={3}
                cursor="pointer"
                key={index}
                justifyContent="space-between"
              >
                <Box
                  backgroundColor="blue.600"
                  padding={3}
                  borderRadius="lg"
                  color="white"
                >
                  <FaFileInvoiceDollar className="text-purple-800" />
                </Box>
                <Text
                  textAlign="left"
                  flex={2}
                  paddingLeft="3"
                  onClick={() => {
                    const itemIndex = invoiceFormState.allInvoiceData.findIndex(
                      (item) => item === items
                    );
                    handleNavigateUser(
                      `invoices/${userInitState.currentUser.displayName}/${itemIndex}`
                    );
                  }}
                >
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
