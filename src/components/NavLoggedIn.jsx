import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Tabs, TabList, Tab, useDisclosure } from "@chakra-ui/react";
import { logOutUser } from "../firebase-config";

const NavLoggedIn = () => {
  const smallScreenWidth = window.innerWidth < 700;
  const navigateUser = useNavigate();
  const loggingOutUser = () => {
    logOutUser();
    navigateUser("/signin");
  };
  return (
    <Box>
      <Tabs
        variant="soft-rounded"
        colorScheme="blue"
        ml={{ base: "0", md: "60", lg: "15%" }}
      >
        <TabList
          mt="4"
          mb="4"
          flexDirection={smallScreenWidth ? "column" : "row"}
        >
          <Tab>
            <Link to="create-invoice">Create Invoice</Link>
          </Tab>

          <Tab>
            <Link to="/form-preview">Form Preview</Link>
          </Tab>
          <Tab>
            <Link to="/invoice-history">See all Invoice</Link>
          </Tab>
          <Tab onClick={loggingOutUser}>Log out</Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};

export default NavLoggedIn;
