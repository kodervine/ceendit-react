import React, { useContext, useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
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
    isEditing: false,
    originalData: {},
  });
  const [showPreviewComponent, setShowPreviewComponent] = useState(false);
  const [showAllInvoice, setShowAllInvoice] = useState(false);

  // Save all the invoices created in array state for the invoiceHistory page and get saved data from local storage on reload. If nothing is there, return an empty array
  const LOCAL_STORAGE_KEY = "invoiceData";
  const [allInvoiceData, setAllInvoiceData] = useState(() => {
    return JSON.parse(localStorage.getItem("invoiceData")) || [];
  });

  // Save data from allInvoiceData to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allInvoiceData));
  }, [allInvoiceData]);

  // This function ensures that the input values on the forms are saved to the invoiceFormData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInvoiceFormData({
      ...invoiceFormData,
      [name]: value,
    });
  };

  // FormPreview function - Checks if any of the input is empty. If not, it setShowPreviewComponent to false initially. Thus, when the PreviewData button is clicked on the InvoiceApp component, it renders the FormPreview Component on the App.js
  const handlePreviewData = () => {
    const checkEmptyInput = Object.values(invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }

    return setShowPreviewComponent(true);
  };

  // Handles each invoice submit and pushes it to the `allInvoice` array in useState. The goal is to have access to each invoice in memory in case they want to get the older form and download again.
  const handleInvoiceSubmit = (e) => {
    e.preventDefault();

    setAllInvoiceData(allInvoiceData.concat([invoiceFormData]));
    setShowAllInvoice(true);
  };

  // Deletes each invoice when it Checks if the index of the clicked array in the allInvoiceData and return only the ones that don't match it, then update the state. Sent this to DeleteInvoice component and InvoiceHistory page.
  const handleDeleteInvoice = (id) => {
    const updatedInvoiceArray = allInvoiceData.filter(
      (invoice) => allInvoiceData.indexOf(invoice) !== id
    );
    setAllInvoiceData(updatedInvoiceArray);
  };

  //Handle form edit
  // const handleInvoiceEdit = () => {
  //   setInvoiceFormData({
  //     ...invoiceFormData,
  //     isEditing: true,
  //     dateCreated: invoiceFormData.originalData.dateCreated,
  //     dateDue: invoiceFormData.originalData.dateDue,
  //     billFromEmail: invoiceFormData.originalData.billFromEmail,
  //     billFromName: invoiceFormData.originalData.billFromName,
  //     billFromPhoneNumber: invoiceFormData.originalData.billFromPhoneNumber,
  //     billToEmail: invoiceFormData.originalData.billToEmail,
  //     billToName: invoiceFormData.originalData.billToName,
  //     billToPhoneNumber: invoiceFormData.originalData.billToPhoneNumber,
  //     itemName: invoiceFormData.originalData.itemName,
  //     itemContent: invoiceFormData.originalData.itemContent,
  //     itemQty: invoiceFormData.originalData.itemQty,
  //     itemTotal: invoiceFormData.originalData.itemTotal,
  //   });
  // };

  // Used the jdpdf library to convert FormPreview page to pdf. Documentation used - https://pspdfkit.com/blog/2022/how-to-convert-html-to-pdf-using-react/. Sent the handleGenerateInvoicePdf function to the InvoiceToPdf component
  const FormPreviewRef = useRef();
  const invoiceHistoryRef = useRef();
  const handleGenerateInvoicePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      // format: [1125, 793],
      unit: "mm",
    });
    doc.html(FormPreviewRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        invoiceFormData,
        handleInputChange,
        allInvoiceData,
        setAllInvoiceData,
        handleInvoiceSubmit,
        handleDeleteInvoice,
        // handleInvoiceEdit,
        showAllInvoice,
        showPreviewComponent,
        handlePreviewData,
        handleGenerateInvoicePdf,
        FormPreviewRef,
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
