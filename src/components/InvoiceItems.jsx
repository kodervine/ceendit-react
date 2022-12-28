import React from "react";

const InvoiceItems = () => {
  return (
    <div>
      <h3>Item</h3>
      <input
        type="text"
        name="item-name"
        id="item-name"
        placeholder="Item name"
      />
      <input
        type="text"
        name="item-description"
        id="item-description"
        placeholder="Description"
      />
      <h4>Qty</h4>
      <input type="number" name="item-qty" id="item-qty" />
      <h4>Total</h4>
      <input type="text" name="item-total" id="item-total" />
    </div>
  );
};

export default InvoiceItems;
