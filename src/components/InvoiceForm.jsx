import React from "react";

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
        <input
          type="email"
          name={formNameOfInvoiceFormEmail}
          id="invoice-form-email"
          placeholder="Email"
          value={valueOfInvoiceFormEmail}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name={formNameOfInvoiceFormText}
          id="invoice-form-name-text"
          placeholder={placeholder}
          value={valueOfInvoiceFormText}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <input
          type="number"
          name={formNameOfInvoiceFormNumber}
          id="invoice-form-phonenumber"
          placeholder="Phone number"
          value={valueOfInvoiceFormPhoneNumber}
          onChange={onHandleChange}
        />
      </div>
    </section>
  );
};

export default InvoiceForm;
