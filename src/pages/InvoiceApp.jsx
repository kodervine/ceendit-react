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

      {/* Bill from and to input with names and email. Also passing the props to InvoiceForm component*/}
      <section className="invoice-form-recipient">
        <InvoiceForm
          recipient="Bill from"
          placeholder="who is this invoice from"
          email={invoiceFormData.billFromEmail}
        />
        <InvoiceForm recipient="Bill to" placeholder="who is this email to" />
      </section>

      {/* Invoice items with qty, description. Passing the props to the InvoiceItems component*/}
      <section>
        <InvoiceItems />
      </section>
    </main>
  );
};

export default InvoiceApp;
