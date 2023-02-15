import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Nav from "../components/homepageComponents/Nav";
import DrawerComponent from "../components/homepageComponents/DrawerComponent";
import Sidebar from "../components/Sidebar";

const ShareInvoicePage = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {!smallScreenWidth && <Sidebar />}
        <Flex direction="column">
          ShareInvoicePage
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};

export default ShareInvoicePage;
