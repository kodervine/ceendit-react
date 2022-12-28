import React from "react";
import { useGlobalContext } from "../context";

import DateInput from "../components/DateInput";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceItems from "../components/InvoiceItems";

const InvoiceApp = () => {
  const { invoiceFormData } = useGlobalContext();
  console.log(invoiceFormData);
  return (
    <main>
      {/* date to send and receive invoice plus passing the props to the DateInput component */}
      <section className="invoice-date-input">
        <DateInput text="Date from" />
        <DateInput text="Date due" />
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
