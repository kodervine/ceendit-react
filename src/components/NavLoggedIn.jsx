import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { Text, Flex, useMediaQuery } from "@chakra-ui/react";
import { logOutUser } from "../firebase-config";

const NavLoggedIn = () => {
  const { handleNavigateUser } = useGlobalContext();
  const loggingOutUser = () => {
    logOutUser();
    handleNavigateUser("signin");
  };

  const [isLargerThan48] = useMediaQuery("(min-width: 48em)");

  return (
    <Flex
      direction={isLargerThan48 ? "row" : "column"}
      gap="5"
      fontWeight="500"
    >
      <Link to="/create-invoice">Create Invoice</Link>
      <Link to="/form-preview">Form Preview</Link>
      <Link to="/invoice-history">See all Invoice</Link>
      <Text onClick={loggingOutUser} cursor="pointer" color="blue.500">
        Log out
      </Text>
    </Flex>
  );
};

export default NavLoggedIn;
