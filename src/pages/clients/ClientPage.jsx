import { Flex } from "@chakra-ui/react";

import Sidebar from "@/components/Sidebar";
import ClientProfileInfo from "@/components/clientsComponents/ClientProfileInfo";
import Nav from "@/components/homepageComponents/Nav";

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
