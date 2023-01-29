import React from "react";
import { Input, Stack, Heading } from "@chakra-ui/react";

// Props for the input are gotten from InvoiceApp page, with data from the iseState declared on the useContext component
const InvoiceBankDetails = ({
  formNameOfInvoiceFormBankName,
  formNameOfInvoiceFormAccountName,
  formNameOfInvoiceFormBankAccount,
  valueOfInvoiceFormBankName,
  valueOfInvoiceFormAccountName,
  valueOfInvoiceFormBankAccount,
  onHandleChange,
}) => {
  return (
    <section>
      <Stack spacing={3}>
        <Heading as="h3" size="md" pt="10px">
          Bank Details
        </Heading>
        <Input
          type="text"
          variant="filled"
          name={formNameOfInvoiceFormBankName}
          id="invoice-form-bank-name"
          placeholder="Which bank should this be sent to?"
          value={valueOfInvoiceFormBankName}
          onChange={onHandleChange}
        />

        <Input
          type="text"
          name={formNameOfInvoiceFormAccountName}
          id="invoice-form-bank-Name"
          placeholder="Your full name"
          variant="filled"
          value={valueOfInvoiceFormAccountName}
          onChange={onHandleChange}
        />
        <Input
          type="number"
          name={formNameOfInvoiceFormBankAccount}
          id="invoice-form-bank-account"
          placeholder="Account Number"
          variant="filled"
          value={valueOfInvoiceFormBankAccount}
          onChange={onHandleChange}
        />
      </Stack>
    </section>
  );
};

export default InvoiceBankDetails;
