import { useRef } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ClientProfileInfo from "@/components/clients/ClientProfileInfo";
import Nav from "@/components/homepage/Nav";
import Sidebar from "@/components/homepage/Sidebar";
import DrawerComponent from "@/components/homepage/DrawerComponent";

const ClientPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />

      <Flex gap="10" height="100%">
        {innerWidth > 700 && <Sidebar />}
        <Flex direction="column">
          <ClientProfileInfo />
        </Flex>
      </Flex>
    </>
  );
};

export default ClientPage;
