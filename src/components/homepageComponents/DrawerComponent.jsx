import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Flex,
} from "@chakra-ui/react";
import NavLoggedIn from "../NavLoggedIn";

const DrawerComponent = ({ isOpen, onClose, btnRef }) => {
  const { currentUser } = useGlobalContext();
  const navigateUser = useNavigate();
  const handleNavigateUser = () => {
    navigateUser("/signin");
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
              <NavLoggedIn />
            ) : (
              <>
                <Link>About</Link>
                <Link color="blue.500" onClick={handleNavigateUser}>
                  Log in
                </Link>
              </>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
