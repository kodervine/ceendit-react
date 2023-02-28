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
  const [invoiceDueDateState, setInvoiceDueDateState] = useState(0);

  // Top cards
  useEffect(() => {
    if (invoiceFormState.allInvoiceData.length > 1) {
      const allInvoicesTotal = invoiceFormState.allInvoiceData.map((items) => {
        return items.itemContainer.reduce(
          (acc, item) =>
            acc +
            parseFloat(item.itemQty || 0) * parseFloat(item.itemPrice || 0),
          0
        );
      });

      setAllInvoiceRevenue(
        allInvoicesTotal.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      );
    }
  }, [invoiceFormState.allInvoiceData]);

  // Due Today invoice total
  useEffect(() => {
    invoiceFormState.allInvoiceData.map((invoices) => {
      const { dateDue, itemContainer } = invoices;
      console.log(dateDue);
      const numericDate = dateDue;
      const invoiceCurrentDate = new Date(numericDate);
      const options = {
        // weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const invoiceDueDate = invoiceCurrentDate.toLocaleDateString(
        "en-UK",
        options
      );
      const todayDate = new Date().toLocaleDateString("en-UK", options);
      if (invoiceDueDate === todayDate) {
        return setInvoiceDueDateState(
          itemContainer.reduce(
            (acc, item) =>
              acc +
              parseFloat(item.itemQty || 0) * parseFloat(item.itemPrice || 0),
            0
          )
        );
      } else {
        return;
      }
    });
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
            <Heading size="md">Due today</Heading>
            <Text>
              #
              {invoiceDueDateState
                .toLocaleString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Button onClick={() => handleNavigateUser("my-clients")}>
              See All Clients
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
      </Flex>
    </>
  );
};

export default TopCards;
