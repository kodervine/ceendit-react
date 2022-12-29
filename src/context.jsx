import React, { useContext, useState } from "react";
import App from "./App";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [invoiceFormData, setInvoiceFormData] = useState({
    dateCreated: "",
    dateDue: "",
    billFromEmail: "",
    billFromName: "",
    billFromPhoneNumber: "",
    billToEmail: "",
    billToName: "",
    billToPhoneNumber: "",
    itemName: "",
    itemContent: "",
    itemQty: "",
    itemTotal: "",
  });

  // Save all the invoices created in state
  const [allInvoiceData, setAllInvoiceData] = useState([]);

  // This function ensures that the input values on each form are saved in state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceFormData({
      ...invoiceFormData,
      [name]: value,
    });
  };

  // The function handles each invoice submit and save it to the `allInvoice` useState. The goal is to have access to each invoice in memory in case they want to get the older form and download again.
  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    setAllInvoiceData(allInvoiceData.concat(invoiceFormData));
  };

  return (
    <AppContext.Provider
      value={{
        invoiceFormData,
        handleInputChange,
        allInvoiceData,
        handleInvoiceSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
