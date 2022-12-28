import React from "react";
import DateInput from "../components/DateInput";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceItems from "../components/InvoiceItems";

const InvoiceApp = () => {
  return (
    <main>
      {/* From */}
      <section className="invoice-date-input">
        <DateInput text="Date from" />
        <DateInput text="Date due" />
      </section>

      {/* Bill names and email */}
      <section className="invoice-form-recipient">
        <InvoiceForm
          recipient="Bill from"
          placeholder="who is this invoice from"
        />
        <InvoiceForm recipient="Bill to" placeholder="who is this email to" />
      </section>
      {/* Invoice items */}
      <section>
        <InvoiceItems />
      </section>
    </main>
  );
};

export default InvoiceApp;
