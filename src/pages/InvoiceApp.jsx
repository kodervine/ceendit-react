import React from "react";
import { useGlobalContext } from "../context";

import DateInput from "../components/DateInput";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceItems from "../components/InvoiceItems";

const InvoiceApp = () => {
  const { invoiceFormData, handleInputChange } = useGlobalContext();
  console.log(invoiceFormData);
  return (
    <main>
      {/* Sending and receiving dateInput rendering with data gotten from useContext - invoiceFormData variable. Plus passing the data via to the dateInput component */}
      <section className="invoice-date-input">
        <DateInput
          text="Date Created"
          nameOfDateInput="dateCreated"
          onHandleChange={handleInputChange}
          valueofDateInput={invoiceFormData.dateCreated}
        />
        <DateInput
          text="Date due"
          nameOfDateInput="dateDue"
          onHandleChange={handleInputChange}
          valueOfDateInput={invoiceFormData.dateDue}
        />
      </section>

      {/* InvoiceForm Bill from and to input rendering with name, phone number and email with data gotten from the useGlobalContext from useContext. 
      
      Also passing the data via props to InvoiceForm component*/}
      <section className="invoice-form-recipient">
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
        {/* Bill to InvoiceForm rendering */}
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
      </section>

      {/* Invoice items with qty, description. Passing the props to the InvoiceItems component*/}
      <section>
        <InvoiceItems />
      </section>
    </main>
  );
};

export default InvoiceApp;
