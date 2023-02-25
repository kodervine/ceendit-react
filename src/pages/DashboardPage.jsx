import { useRef } from "react";
import Nav from "@/components/homepage/Nav";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Sidebar from "@/components/homepage/Sidebar";
import BarChart from "@/components/dashboardComponents/BarChart";
import RecentInvoices from "@/components/dashboardComponents/RecentInvoices";
import TopCards from "@/components/dashboardComponents/TopCards";

const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {innerWidth > 700 && <Sidebar />}
        <Flex direction="column">
          <TopCards />
          <Flex mt="10px" direction={{ sm: "column", lg: "row" }}>
            <BarChart />
            <RecentInvoices />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardPage;
