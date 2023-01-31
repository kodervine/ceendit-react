import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Text, Flex } from "@chakra-ui/react";
import { logOutUser } from "../firebase-config";

const NavLoggedIn = () => {
  const navigateUser = useNavigate();
  const loggingOutUser = () => {
    logOutUser();
    navigateUser("/signin");
  };

  return (
    <Flex direction="column" gap="3">
      <Link to="/create-invoice">Create Invoice</Link>
      <Link to="/form-preview">Form Preview</Link>
      <Link to="/invoice-history">See all Invoice</Link>
      <Text onClick={loggingOutUser} cursor="pointer">
        Log out
      </Text>
    </Flex>
  );
};

export default NavLoggedIn;
