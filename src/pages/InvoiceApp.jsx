import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Text,
  Flex,
  Spacer,
  Box,
  FormControl,
  Button,
  useDisclosure,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useGlobalContext } from "../context/AppContext";
import logo from "../assets/logo.png";
import DateInput from "../components/DateInput";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceItems from "../components/InvoiceItems";
import InvoiceBankDetails from "../components/InvoiceBankDetails";
import Nav from "../components/homepageComponents/Nav";
import DrawerComponent from "../components/homepageComponents/DrawerComponent";
import Sidebar from "../components/Sidebar";
import { nanoid } from "nanoid";

const InvoiceApp = () => {
  const {
    invoiceFormData,
    setInvoiceFormData,
    handleInputChange,
    allInvoiceData,
    handleInvoiceSubmit,
    showPreviewComponent,
    handlePreviewData,
  } = useGlobalContext();

  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const smallScreenWidth = window.innerWidth < 700;

  // Add extra invoice Data dynamically
  const addNewInvoiceItems = () => {
    setInvoiceFormData({
      ...invoiceFormData,
      itemContainer: [
        ...invoiceFormData.itemContainer,
        {
          itemContent: "",
          itemQty: "",
          itemPrice: "",
        },
      ],
    });
  };

  // Const total from items price and quantity
  const invoiceItemsTotal = invoiceFormData.itemContainer.reduce(
    (acc, item) =>
      acc + parseFloat(item.itemQty || 0) * parseFloat(item.itemPrice || 0),
    0
  );

  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {!smallScreenWidth && <Sidebar />}
        <FormControl
          onSubmit={handleInvoiceSubmit}
          width={{ base: "100%", md: "90%", lg: "70%" }}
          maxW="960px"
          margin="auto"
          border="1px"
          borderColor="gray.200"
          boxShadow="md"
          p="6"
          rounded="md"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Image src={logo} />
            <Box>
              <Text fontWeight="bold">Invoice No ---</Text>
            </Box>
          </Flex>
          {/* Input -  Sending and receiving dateInput rendering with data gotten from useContext - invoiceFormData variable. Plus passing the data via to the dateInput component */}
          <Flex direction={smallScreenWidth ? "column" : "row"}>
            <DateInput
              text="Date Created"
              nameOfDateInput="dateCreated"
              onHandleChange={handleInputChange}
              valueofDateInput={invoiceFormData.dateCreated}
            />
            <Spacer />
            <DateInput
              text="Date due"
              nameOfDateInput="dateDue"
              onHandleChange={handleInputChange}
              valueOfDateInput={invoiceFormData.dateDue}
            />
          </Flex>

          {/* InvoiceForm Bill from and to input rendering with name, phone number and email with data gotten from the useGlobalContext from useContext. 
      
      Also passing the data via props to InvoiceForm component*/}
          <Box>
            <InvoiceForm
              recipient="Bill from"
              placeholder="who is this invoice from"
              formNameOfInvoiceFormEmail="billFromEmail"
              formNameOfInvoiceFormText="billFromName"
              formNameOfInvoiceFormNumber="billFromPhoneNumber"
              valueOfInvoiceFormEmail={invoiceFormData.billFromEmail}
              valueOfInvoiceFormText={invoiceFormData.billFromName}
              valueOfInvoiceFormPhoneNumber={
                invoiceFormData.billFromPhoneNumber
              }
              onHandleChange={handleInputChange}
            />
            <Spacer />
            {/* BillTo InvoiceForm rendering */}
            <InvoiceForm
              recipient="Bill to"
              placeholder="who is this email to"
              formNameOfInvoiceFormEmail="billToEmail"
              formNameOfInvoiceFormText="billToName"
              formNameOfInvoiceFormNumber="billToPhoneNumber"
              valueOfInvoiceFormEmail={invoiceFormData.billToEmail}
              valueOfInvoiceFormText={invoiceFormData.billToName}
              valueOfInvoiceFormPhoneNumber={invoiceFormData.billToPhoneNumber}
              onHandleChange={handleInputChange}
            />
          </Box>
          {/* InvoiceForm Bank account details from and to input rendering with name, phone number and email with data gotten from the useGlobalContext from useContext. 
      
      Also passing the data via props to InvoiceForm component*/}
          <Box>
            <InvoiceBankDetails
              formNameOfInvoiceFormBankName="bankName"
              formNameOfInvoiceFormBankAccount="bankAccount"
              formNameOfInvoiceFormAccountName="accountName"
              valueOfInvoiceFormBankName={invoiceFormData.bankName}
              valueOfInvoiceFormAccountName={invoiceFormData.accountName}
              valueOfInvoiceFormBankAccount={invoiceFormData.bankAccount}
              onHandleChange={handleInputChange}
            />
          </Box>

          {/* InvoiceItems rendering with data gotten from useContext - invoiceFormData variable. Plus passing the data via to the InvoiceItems component*/}
          <section>
            {invoiceFormData.itemContainer.map((item, index) => {
              // const formItemsTotal = invoiceFormData.itemContainer.reduce(
              //   (acc, item) =>
              //     acc +
              //     parseFloat(item.itemQty || 0) *
              //       parseFloat(item.itemPrice || 0),
              //   0
              // );
              // setInvoiceItemsTotal(formItemsTotal);
              return (
                <InvoiceItems
                  key={index}
                  nameOfInvoiceItemPrice={`itemContainer.${index}.itemPrice`}
                  nameOfInvoiceItemContent={`itemContainer.${index}.itemContent`}
                  nameOfInvoiceItemQty={`itemContainer.${index}.itemQty`}
                  nameOfInvoiceItemTotal="itemTotal"
                  valueOfInvoiceItemPrice={item.itemPrice}
                  valueOfInvoiceItemContent={item.itemContent}
                  valueOfInvoiceItemQty={item.itemQty}
                  onHandleChange={handleInputChange}
                />
              );
            })}

            {/* Add more invoice items */}
            <Button
              colorScheme="blue"
              onClick={addNewInvoiceItems}
              width="100%"
              marginTop="3"
              marginBottom="3"
            >
              Add more items
            </Button>
            {/* Invoice Total */}
            <Box>
              <Heading as="h4" size="lg">
                Total
              </Heading>
              <Text>{invoiceItemsTotal}</Text>
            </Box>
          </section>
          <Flex pt="6" gap="2" direction={smallScreenWidth ? "column" : "row"}>
            {/* Disable preview invoice button if the forms haven't been filled */}
            <Box>
              {!showPreviewComponent ? (
                <Button
                  onClick={handlePreviewData}
                  colorScheme="blue"
                  type="submit"
                  width={smallScreenWidth ? "100%" : "auto"}
                  disabled
                >
                  {" "}
                  <Link disabled> Preview Invoice</Link>
                </Button>
              ) : (
                <Button
                  onClick={handlePreviewData}
                  colorScheme="blue"
                  type="submit"
                  width={smallScreenWidth ? "100%" : "auto"}
                >
                  {" "}
                  {showPreviewComponent && (
                    <Link to="/form-preview"> Preview Invoice</Link>
                  )}
                </Button>
              )}
            </Box>
            <Box>
              {/* Eventually this should show only the submit */}
              <Button
                onClick={handleInvoiceSubmit}
                colorScheme="blue"
                width={smallScreenWidth ? "100%" : "auto"}
              >
                Save to Invoice History
              </Button>
            </Box>
            <Box>
              {/* View all invoice */}
              <Button
                colorScheme="blue"
                width={smallScreenWidth ? "100%" : "auto"}
              >
                <Link to="/invoice-history">View all Invoice</Link>
              </Button>
            </Box>
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
};

export default InvoiceApp;
