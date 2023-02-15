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
  Box,
} from "@chakra-ui/react";
import { logOutUser } from "../../firebase-config";
import { linksData } from "../../data";

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
                {linksData.map((items) => {
                  const { linkItems } = items;
                  return linkItems?.map((links) => {
                    const { name, link } = links;
                    return (
                      <Box
                        py="1"
                        pl="3"
                        borderRadius="8px"
                        _hover={{ bg: "blue.100" }}
                        _active={{ bg: "blue.100" }}
                        key={nanoid()}
                      >
                        <Link to={link}>{name}</Link>
                      </Box>
                    );
                  });
                })}

                <Text
                  onClick={loggingOutUser}
                  cursor="pointer"
                  color="blue.500"
                  pl="3"
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
