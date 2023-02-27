import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/AppContext";
import { Card, CardBody, Heading, Button, Text, Flex } from "@chakra-ui/react";
const TopCards = () => {
  const { handleNavigateUser, invoiceFormState } = useGlobalContext();

  // const total = invoiceFormState.allInvoiceData.map((items) => {
  //   return items.reduce((acc, curr) => {
  //     const qty = parseInt(curr.itemQty);
  //     const price = parseFloat(curr.itemPrice);
  //     if (!isNaN(qty) && !isNaN(price)) {
  //       return acc + qty * price;
  //     }
  //     return acc;
  //   });
  // }, 0);

  const [allInvoiceRevenue, setAllInvoiceRevenue] = useState(0);

  useEffect(() => {
    const allInvoicesTotal = invoiceFormState.allInvoiceData.map((items) => {
      return items.itemContainer.reduce(
        (acc, item) =>
          acc + parseFloat(item.itemQty || 0) * parseFloat(item.itemPrice || 0),
        0
      );
    });

    setAllInvoiceRevenue(
      allInvoicesTotal.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      )
    );
  }, [invoiceFormState.allInvoiceData]);

  return (
    <>
      <Flex
        direction={innerWidth > 700 ? "row" : "column"}
        overflow="hidden"
        variant="outline"
        width="full"
        align="center"
      >
        <Card width={innerWidth > 700 ? "25vw" : "90vw"}>
          <CardBody>
            {" "}
            <Heading size="md"> Total Invoice No</Heading>
            <Text>{invoiceFormState.allInvoiceData.length}</Text>
            <Button
              onClick={() => {
                handleNavigateUser("create-invoice");
              }}
            >
              Add New Invoice
            </Button>
          </CardBody>
        </Card>
        <Card width={innerWidth > 700 ? "25vw" : "90vw"}>
          <CardBody>
            {" "}
            <Heading size="md"> Total Revenue</Heading>
            <Text>
              #
              {allInvoiceRevenue
                .toLocaleString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>{" "}
            <Button
              onClick={() => {
                handleNavigateUser("invoice-history");
              }}
            >
              See all Invoices
            </Button>
          </CardBody>
        </Card>

        <Card width={innerWidth > 700 ? "25vw" : "90vw"}>
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
