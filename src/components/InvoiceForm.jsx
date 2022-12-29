import React from "react";
import {
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

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
      <h3>{recipient}</h3>
      <div>
        <Stack spacing={3}>
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
      </div>
    </section>
  );
};

export default InvoiceForm;
