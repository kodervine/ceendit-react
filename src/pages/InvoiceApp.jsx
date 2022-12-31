import React, { useState } from "react";
import { Flex, Spacer, Box, FormControl, Button } from "@chakra-ui/react";
import { useGlobalContext } from "../context";
import DateInput from "../components/DateInput";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceItems from "../components/InvoiceItems";

const InvoiceApp = () => {
  const {
    invoiceFormData,
    handleInputChange,
    allInvoiceData,
    handleInvoiceSubmit,
    handleInvoiceEdit,
    handlePreviewData,
  } = useGlobalContext();

  console.log(allInvoiceData);
  console.log(invoiceFormData);
  return (
    <FormControl onSubmit={handleInvoiceSubmit}>
      {/* Input -  Sending and receiving dateInput rendering with data gotten from useContext - invoiceFormData variable. Plus passing the data via to the dateInput component */}
      <Flex>
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
          valueOfInvoiceFormPhoneNumber={invoiceFormData.billFromPhoneNumber}
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

      {/* InvoiceItems rendering with data gotten from useContext - invoiceFormData variable. Plus passing the data via to the InvoiceItems component*/}
      <section>
        <InvoiceItems
          nameOfInvoiceItemName="itemName"
          nameOfInvoiceItemContent="itemContent"
          nameOfInvoiceItemQty="itemQty"
          nameOfInvoiceItemTotal="itemTotal"
          valueOfInvoiceItemName={invoiceFormData.itemName}
          valueOfInvoiceItemContent={invoiceFormData.itemContent}
          valueOfInvoiceItemQty={invoiceFormData.itemQty}
          valueOfInvoiceItemTotal={invoiceFormData.itemTotal}
          onHandleChange={handleInputChange}
        />
      </section>
      <Box mt="10px">
        <Button onClick={handlePreviewData} colorScheme="blue">
          Preview Invoice
        </Button>
      </Box>
      <Box>
        <Button onClick={handleInvoiceSubmit} colorScheme="blue">
          View all Invoice
        </Button>
      </Box>
    </FormControl>
  );
};

export default InvoiceApp;
