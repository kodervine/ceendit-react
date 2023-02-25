import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Box, Flex, Grid, Text, Heading } from "@chakra-ui/react";

const RecentInvoices = () => {
  return (
    <Box
      width="100%"
      position="relative"
      height={{ sm: "50vh", lg: "70vh" }}
      margin="auto"
      border="1px solid gray"
      borderRadius="lg"
      overflow="scroll"
      className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll"
    >
      <Heading as="h4">Recent Invoices</Heading>
      <ul>
        <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
          <Box className="bg-purple-100 rounded-lg p-3">
            <FaShoppingBag className="text-purple-800" />
          </Box>
          <Box className="pl-4">
            <Text className="text-gray-800 font-bold">$order.total</Text>
            <p className="text-gray-400 text-sm">order.name.first</p>
          </Box>
          <Text className="lg:flex md:hidden absolute right-6 text-sm">
            order date
          </Text>
        </li>
      </ul>
    </Box>
  );
};

export default RecentInvoices;
