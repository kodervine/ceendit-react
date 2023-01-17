import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import jsPDF from "jspdf";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";
import { nanoid } from "nanoid";

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
    accountName: "",
    bankAccount: "",
    itemContent: "",
    itemQty: "",
    itemPrice: "",
  });

  const [showPreviewComponent, setShowPreviewComponent] = useState(false);
  const [showAllInvoice, setShowAllInvoice] = useState(false);

  // Save all the invoices for the invoiceHistory page and get data from firebase store
  const [allInvoiceData, setAllInvoiceData] = useState([]);

  const fetchInvoiceData = async () => {
    await getDocs(collection(db, "invoiceData")).then((invoiceQuery) => {
      const newInvoiceData = invoiceQuery.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllInvoiceData(newInvoiceData);
      console.log(newInvoiceData);
    });
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  // This function ensures that the input values on the forms are saved to the invoiceFormData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceFormData({
      ...invoiceFormData,
      [name]: value,
    });
    setShowPreviewComponent(true);
  };

  // FormPreview function - Checks if any of the input is empty. If not, setShowPreviewComponent to false. If it evealuated to true, it renders the FormPreview Page on the App.js
  const handlePreviewData = () => {
    const checkEmptyInput = Object.values(invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }
  };

  // Handles each invoice submit and pushes it to the `allInvoice` array state. The goal is to have access to each invoice in memory in case they want to get the older form and download again.
  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    const checkEmptyInput = Object.values(invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }
    setAllInvoiceData(allInvoiceData.concat([invoiceFormData]));

    // Save to firestore
    try {
      const docRef = await addDoc(collection(db, "invoiceData"), {
        invoice: invoiceFormData,
      });
      console.log("document saved", docRef.id);
    } catch (e) {
      console.log(e);
    }

    setShowAllInvoice(true);
    setInvoiceFormData((data) => {
      return {
        ...data,
        dateCreated: "",
        dateDue: "",
        billFromEmail: "",
        billFromName: "",
        billFromPhoneNumber: "",
        billToEmail: "",
        billToName: "",
        billToPhoneNumber: "",
        bankName: "",
        accountName: "",
        bankAccount: "",
        itemContent: "",
        itemQty: "",
        itemPrice: "",
      };
    });
  };
  console.log(allInvoiceData);

  // Deletes each invoice when it Checks if the index of the clicked array in the allInvoiceData and return only the ones that don't match it, then update the state. Sent this to DeleteInvoice component and InvoiceHistory page.
  const handleDeleteInvoice = (id) => {
    // setAllInvoiceData((prevData) =>
    //   prevData.filter((invoice) => invoice.id !== id)
    // );

    const updatedInvoiceArray = allInvoiceData.filter(
      (invoice) => allInvoiceData.indexOf(invoice) !== id
    );
    setAllInvoiceData(updatedInvoiceArray);
  };

  // handle each individual download with jspdf.
  const EachDownloadRef = useRef([]);
  const handlePrint = useCallback((id) => {
    if (allInvoiceData.length > 0 && allInvoiceData[id]) {
      const content = EachDownloadRef.current[id].current.innerHTML;
      const doc = new jsPDF("p", "pt", [800, 800]);
      doc.setFontSize(12);
      doc.html(content, {
        callback: function (doc) {
          doc.save("document");
        },
        x: 20,
        y: 20,
        width: 800,
        windowWidth: 800,
        margin: -20,
      });
    }
  }, []);

  useEffect(() => {
    const refs = Array(allInvoiceData.length)
      .fill()
      .map(() => useRef(null));
    EachDownloadRef.current = refs;
  }, []);

  // Used the jspdf library to convert FormPreview page to pdf. Sent the handleGenerateInvoicePdf function to the InvoiceToPdf component
  const FormPreviewRef = useRef();
  const handlePreviewInvoicePdf = () => {
    // src code - https://github.com/parallax/jsPDF/issues/3504#issuecomment-1290812020

    const doc = new jsPDF("p", "pt", [800, 800]);
    doc.setFontSize(12);
    doc.html(FormPreviewRef.current, {
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
        setInvoiceFormData,
        handleInputChange,
        allInvoiceData,
        setAllInvoiceData,
        handleInvoiceSubmit,
        handleDeleteInvoice,
        showAllInvoice,
        setShowAllInvoice,
        showPreviewComponent,
        handlePreviewData,
        handlePreviewInvoicePdf,
        handlePrint,
        FormPreviewRef,
        EachDownloadRef,
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
