import React from "react";
import { useGlobalContext } from "@/context/AppContext";
import { Card, CardBody, Heading, Button, Text, Flex } from "@chakra-ui/react";
const TopCards = () => {
  const { handleNavigateUser } = useGlobalContext();
  return (
    <>
      <Flex
        direction={{ sm: "column", lg: "row" }}
        overflow="hidden"
        variant="outline"
        width="full"
        align="center"
      >
        <Card width={{ sm: "100vw", lg: "25vw" }}>
          <CardBody>
            {" "}
            <Heading size="md"> Total Invoice No</Heading>
            <Text>70</Text>
            <Button
              onClick={() => {
                handleNavigateUser("create-invoice");
              }}
            >
              Add New Invoice
            </Button>
          </CardBody>
        </Card>
        <Card width={{ sm: "100vw", lg: "25vw" }}>
          <CardBody>
            {" "}
            <Heading size="md"> Total Revenue</Heading>
            <Text>#1,298,987</Text>
            <Button
              onClick={() => {
                handleNavigateUser("invoice-history");
              }}
            >
              See all Invoices
            </Button>
          </CardBody>
        </Card>

        <Card width={{ sm: "100vw", lg: "25vw" }}>
          <CardBody>
            {" "}
            <Heading size="md">Clients No</Heading>
            <Text>#17</Text>
            <Button onClick={() => handleNavigateUser("my-clients")}>
              See All Clients
            </Button>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default TopCards;
