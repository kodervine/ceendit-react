import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/AppContext";
import { Card, CardBody, Heading, Button, Text, Flex } from "@chakra-ui/react";
const TopCards = () => {
  const { handleNavigateUser, invoiceFormState } = useGlobalContext();

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

  // Due today invoices
  useEffect(() => {
    const invoicesWithTodayDueDate = invoiceFormState.allInvoiceData.filter(
      (invoices) => {
        const { dateDue } = invoices;
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
        return invoiceDueDate === todayDate;
      }
    );
    if (invoicesWithTodayDueDate.length) {
      const invoiceTotal = invoicesWithTodayDueDate.reduce(
        (acc, invoices) =>
          acc +
          invoices.itemContainer.reduce(
            (total, item) =>
              total +
              parseFloat(item.itemQty || 0) * parseFloat(item.itemPrice || 0),
            0
          ),
        0
      );
      setInvoiceDueDateState(invoiceTotal);
    } else {
      return;
    }
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
                handleNavigateUser("invoices");
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
