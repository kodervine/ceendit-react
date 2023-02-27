import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  IconButton,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useGlobalContext } from "@/context/AppContext";
import { logOutUser } from "@/utils/auth";

const Nav = ({ onOpen, btnRef }) => {
  const { userInitState, handleNavigateUser } = useGlobalContext();
  const loggingOutUser = () => {
    logOutUser();
    handleNavigateUser("signin");
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
        <Link to="/dashboard"> Ceendit</Link>
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
            {userInitState.currentUser ? (
              <Text onClick={loggingOutUser} cursor="pointer" color="blue.500">
                Log out
              </Text>
            ) : (
              <Link color="blue.500" to="/signin">
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
