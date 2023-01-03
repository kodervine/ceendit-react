import React, { useContext, useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
    bankName: "",
    bankAccount: "",
    itemName: "",
    itemContent: "",
    itemQty: "",
    itemTotal: "",
  });
  const [showPreviewComponent, setShowPreviewComponent] = useState(false);
  const [showAllInvoice, setShowAllInvoice] = useState(false);
  const [isFormEditing, setIsFormEditing] = useState(false);

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

  const handleAllInvoiceHistory = () => {
    const checkEmptyInput = Object.values(invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }
    setAllInvoiceData(allInvoiceData.concat([invoiceFormData]));
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

    const checkEmptyInput = Object.values(invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }
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

  // Handle form edit
  const handleEditInvoice = (id) => {
    const editingInvoice = allInvoiceData.filter((item) => {
      return allInvoiceData.indexOf(item) === id;
    });
    setInvoiceFormData(editingInvoice);
    setIsFormEditing(true);
  };

  // Used the jspdf library to convert FormPreview page to pdf. Sent the handleGenerateInvoicePdf function to the InvoiceToPdf component
  const FormPreviewRef = useRef();
  let invoiceHistoryRef = useRef();

  const handleGenerateInvoicePdf = (invoiceRef, id) => {
    // src code - https://github.com/parallax/jsPDF/issues/3504#issuecomment-1290812020
    // const doc = new jsPDF("p", "pt", [800, 800]);
    // doc.setFontSize(12);
    // doc.html(FormPreviewRef.current, {
    //   callback: function (doc) {
    //     doc.save("document");
    //   },
    //   x: 20,
    //   y: 20,
    //   width: 800,
    //   windowWidth: 800,
    //   margin: -20,
    // });

    const doc = new jsPDF("p", "pt", [800, 800]);
    doc.setFontSize(12);
    doc.html(invoiceHistoryRef.current, {
      callback: function (doc) {
        doc.save("document");
      },
      x: 20,
      y: 20,
      width: 800,
      windowWidth: 800,
      margin: -20,
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
        handleAllInvoiceHistory,
        handleDeleteInvoice,
        handleEditInvoice,
        isFormEditing,
        showAllInvoice,
        showPreviewComponent,
        handlePreviewData,
        handleGenerateInvoicePdf,
        FormPreviewRef,
        invoiceHistoryRef,
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
