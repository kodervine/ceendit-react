import React from "react";

const InvoiceForm = ({ recipient, placeholder }) => {
  return (
    <section>
      <h3>{recipient}</h3>
      <div>
        <input type="email" name="email" id="email" placeholder="Email" />
      </div>
      <div>
        <input
          type="text"
          name="name-text"
          id="name-text"
          placeholder={placeholder}
        />
      </div>
    </section>
  );
};

export default InvoiceForm;
