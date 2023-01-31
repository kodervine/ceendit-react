import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { logOutUser } from "../../firebase-config";
import {
  Text,
  Flex,
  Link,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaAlignJustify } from "react-icons/fa";

const Nav = ({ onOpen, btnRef }) => {
  const { currentUser } = useGlobalContext();

  const navigateUser = useNavigate();
  const handleNavigateUser = () => {
    navigateUser("/signin");
  };

  const loggingOutUser = () => {
    logOutUser();
    navigateUser("/signin");
  };

  const [scroll, setScroll] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue("white", "blackAlpha.200");
  const [isLargerThan48] = useMediaQuery("(min-width: 48em)");

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener("scroll", changeScroll);

  return (
    <Flex
      h="12vh"
      alignItems="center"
      p="6"
      boxShadow={scroll ? "base" : "none"}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="full"
      bg={navBg}
    >
      {/* <Image src={logo} alt="ceendit logo" /> */}
      <Text fontSize="xl" fontWeight="bold">
        Ceendit
      </Text>

      <Spacer />

      <Flex alignItems="center">
        <IconButton mr="10" w={6} h={6} p={5} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </IconButton>

        {isLargerThan48 ? (
          <>
            <Text fontSize="md" mr="10">
              About
            </Text>
            <Text fontSize="md" mr="10">
              Features
            </Text>
            {currentUser ? (
              <Link color="blue.500" onClick={loggingOutUser}>
                Log Out
              </Link>
            ) : (
              <Link color="blue.500" onClick={handleNavigateUser}>
                Log in
              </Link>
            )}
          </>
        ) : (
          // ------ The ref and OnOpen function is added -----
          <IconButton ref={btnRef} onClick={onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        )}
      </Flex>
    </Flex>
  );
};

export default Nav;
