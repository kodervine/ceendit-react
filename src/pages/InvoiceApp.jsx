import React from "react";
import DateInput from "../components/DateInput";

const InvoiceApp = () => {
  return (
    <main>
      {/* From */}
      <section className="invoice-date-input">
        <DateInput text="Date from" />
        <DateInput text="Date to" />
      </section>
    </main>
  );
};

export default InvoiceApp;
