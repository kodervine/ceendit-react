import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";
import { logOutUser } from "../../firebase-config";

const DrawerComponent = ({ isOpen, onClose, btnRef }) => {
  const { currentUser, handleNavigateUser } = useGlobalContext();
  const loggingOutUser = () => {
    logOutUser();
    handleNavigateUser("signin");
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      zIndex="popover"
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Ceendit</DrawerHeader>

        <DrawerBody mb="4">
          <Flex flexDirection="column" gap="3">
            {currentUser ? (
              <>
                <Link to="/create-invoice">Create Invoice</Link>
                <Link to="/form-preview">Form Preview</Link>
                <Link to="/invoice-history">See all Invoice</Link>
                <Link to="/my-clients">My clients</Link>

                <Text
                  onClick={loggingOutUser}
                  cursor="pointer"
                  color="blue.500"
                >
                  Log out
                </Text>
              </>
            ) : (
              // <NavLoggedIn />
              <>
                <Link>About</Link>
                <Text
                  color="blue.500"
                  onClick={() => handleNavigateUser("signin")}
                >
                  Log in
                </Text>
              </>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
