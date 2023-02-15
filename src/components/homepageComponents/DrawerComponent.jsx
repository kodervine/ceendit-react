import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import { nanoid } from "nanoid";
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
import { sidebarData } from "../../data";

const DrawerComponent = ({ isOpen, onClose, btnRef }) => {
  const { userInitState, handleNavigateUser } = useGlobalContext();
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
            {userInitState.currentUser ? (
              <>
                {sidebarData.map((menuItems) => {
                  const { links } = menuItems;
                  return links.map((links) => {
                    const { name, link } = links;
                    return (
                      <Link to={link} key={nanoid()}>
                        {name}
                      </Link>
                    );
                  });
                })}

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
