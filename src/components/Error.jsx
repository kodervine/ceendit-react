import {
  Box,
  Flex,
  Image,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import errorImg from "@/assets/error-img.svg";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import Nav from "@/components/homepage/Nav";
import Sidebar from "@/components/homepage/Sidebar";

const Error = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  const { colorMode } = useColorMode();

  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {!smallScreenWidth && <Sidebar />}
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Image
            src={errorImg}
            width={smallScreenWidth ? "100%" : "80%"}
            height="400px"
          />

          <Box
            color={colorMode === "light" ? "blue.900" : "gray.100"}
            fontWeight="bold"
            textAlign="center"
            display="flex"
            justifyContent="center"
          >
            <Text
              fontSize={smallScreenWidth ? "md" : "2xl"}
              width={smallScreenWidth ? "100%" : "50%"}
            >
              Maybe the data on this page moved? Got deleted? Is hiding out in
              quarantine? Never existed in the first place? Let's go back to{" "}
              <Link to="/create-invoice" className="error-link">
                home
              </Link>{" "}
              and try again from there.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Error;
