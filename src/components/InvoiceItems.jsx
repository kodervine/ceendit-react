import React from "react";

// Props for the input values are gotten from InvoiceApp page rendered with InvoiceItems name, with data from the useState declared on the useContext component
const InvoiceItems = ({
  nameOfInvoiceItemName,
  nameOfInvoiceItemContent,
  nameOfInvoiceItemQty,
  nameOfInvoiceItemTotal,
  valueOfInvoiceItemName,
  valueOfInvoiceItemContent,
  valueOfInvoiceItemQty,
  valueOfInvoiceItemTotal,
  onHandleChange,
}) => {
  return (
    <div>
      <h3>Item</h3>
      {/* Item name */}
      <input
        type="text"
        name={nameOfInvoiceItemName}
        id="item-name"
        placeholder="Item name"
        value={valueOfInvoiceItemName}
        onChange={onHandleChange}
      />
      {/* Item Contentt */}
      <input
        type="text"
        name={nameOfInvoiceItemContent}
        id="item-content"
        placeholder="Content owed to you"
        value={valueOfInvoiceItemContent}
        onChange={onHandleChange}
      />
      {/* qty */}
      <h4>Qty</h4>
      <input
        type="number"
        name={nameOfInvoiceItemQty}
        id="item-qty"
        value={valueOfInvoiceItemQty}
        onChange={onHandleChange}
      />
      {/* Total */}
      <h4>Total</h4>
      <input
        type="text"
        name={nameOfInvoiceItemTotal}
        id="item-total"
        value={valueOfInvoiceItemTotal}
        onChange={onHandleChange}
      />

      {/* Add new item description */}
      <div>
        <button>Add New item</button>
      </div>
    </div>
  );
};

export default InvoiceItems;
