import React from "react";
import { useGlobalContext } from "../context";
const FormPreview = () => {
  const {
    invoiceFormData,
    handleInputChange,
    allInvoiceData,
    handleInvoiceSubmit,
  } = useGlobalContext();
  return (
    <section>
      {/* Date */}
      <div>
        {invoiceFormData.dateCreated}
        {invoiceFormData.dateDue}
      </div>

      {/* Billed */}
      <div>
        {invoiceFormData.billFromName}
        {invoiceFormData.billFromPhoneNumber}
        {invoiceFormData.billFromEmail}
      </div>
      <div>
        {invoiceFormData.billToName}
        {invoiceFormData.billToPhoneNumber}
        {invoiceFormData.billToEmail}
      </div>

      {/* Items */}
      <div>
        {invoiceFormData.itemName}
        {invoiceFormData.itemContent}
        {invoiceFormData.itemQty}
        {invoiceFormData.itemTotal}
      </div>
    </section>
  );
};

export default FormPreview;
