import React from "react";
import { useGlobalContext } from "../../context/AppContext";
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
  const { currentUser, handleNavigateUser } = useGlobalContext();

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
                <Link
                  color="blue.500"
                  onClick={() => handleNavigateUser("signin")}
                >
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
