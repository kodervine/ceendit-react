import React, { useContext, useState } from "react";
import App from "./App";
import FormPreview from "./pages/FormPreview";

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

  // Save all the invoices created in array state to be used when I can acess all the invoices in the past
  const [allInvoiceData, setAllInvoiceData] = useState([]);

  const [showPreviewComponent, setShowPreviewComponent] = useState(false);

  // This function ensures that the input values on the forms are saved to the invoiceFormData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceFormData({
      ...invoiceFormData,
      [name]: value,
    });
  };

  // FormPreview function - setShowPreviewComponent to false initially. Thus, when the PreviewData is clicked on the InvoiceApp component, it renders the FormPreview Component on the App.js
  const handlePreviewData = (e) => {
    return setShowPreviewComponent(true);
  };

  // The function handles each invoice submit and pushes it to the `allInvoice` array useState. The goal is to have access to each invoice in memory in case they want to get the older form and download again.
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
        showPreviewComponent,
        handlePreviewData,
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
