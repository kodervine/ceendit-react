import React from "react";
import { useNavigate } from "react-router-dom";
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

const DrawerComponent = ({ isOpen, onClose, btnRef }) => {
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
            <Link>About</Link>
            <Link color="blue.500" onClick={handleNavigateUser}>
              Log in
            </Link>
            <Link to="create-invoice">Create Invoice</Link>
            <Link to="/form-preview">Form Preview</Link>
            <Link to="/invoice-history">See all Invoice</Link>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
