import React from "react";
import { Input, Stack, Heading } from "@chakra-ui/react";

// Props for the input are gotten from InvoiceApp page, with data from the iseState declared on the useContext component
const InvoiceForm = ({
  recipient,
  placeholder,
  formNameOfInvoiceFormEmail,
  formNameOfInvoiceFormText,
  formNameOfInvoiceFormNumber,
  valueOfInvoiceFormEmail,
  valueOfInvoiceFormText,
  valueOfInvoiceFormPhoneNumber,
  onHandleChange,
}) => {
  return (
    <section>
      <Stack spacing={3}>
        <Heading as="h3" size="md" pt="10px">
          {recipient}
        </Heading>
        <Input
          type="text"
          variant="filled"
          name={formNameOfInvoiceFormText}
          id="invoice-form-name-text"
          placeholder={placeholder}
          value={valueOfInvoiceFormText}
          onChange={onHandleChange}
        />
        <Input
          type="number"
          name={formNameOfInvoiceFormNumber}
          id="invoice-form-phonenumber"
          placeholder="Phone number"
          variant="filled"
          value={valueOfInvoiceFormPhoneNumber}
          onChange={onHandleChange}
        />
        <Input
          size="md"
          variant="filled"
          placeholder="Email"
          type="email"
          name={formNameOfInvoiceFormEmail}
          id="invoice-form-email"
          value={valueOfInvoiceFormEmail}
          onChange={onHandleChange}
          required
        />
      </Stack>
    </section>
  );
};

export default InvoiceForm;
