import { Flex } from "@chakra-ui/react";

import ClientProfileInfo from "@/components/clients/ClientProfileInfo";
import Nav from "@/components/homepage/Nav";
import Sidebar from "@/components/homepage/Sidebar";

const ClientPage = () => {
  return (
    <>
      <Nav />
      <Flex gap="10" height="100%">
        <Sidebar />
        <Flex direction="column">
          <ClientProfileInfo />
        </Flex>
      </Flex>
    </>
  );
};

export default ClientPage;
