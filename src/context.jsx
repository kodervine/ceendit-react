import React, { useContext, useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  setDoc,
  query,
  orderBy,
  getFirestore,
  doc,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase-config";

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
    const queryMessage = query(
      collection(db, "invoiceData"),
      orderBy("createdAt")
    );
    await getDocs(queryMessage).then((invoiceQuery) => {
      const newInvoiceData = invoiceQuery.docs.map((doc) => ({
        ...doc.data(),

        id: doc.id,
      }));

      setAllInvoiceData(newInvoiceData);
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

    // Save to firestore and fetch the updated data
    // try {
    //   const docRef = await addDoc(collection(db, "invoiceData"), {
    //     invoice: invoiceFormData,
    //     createdAt: serverTimestamp(),
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " =>", doc.data().invoiceData);
      });
    } catch (e) {
      console.log(e);
    }

    const userId = auth.currentUser.uid;

    try {
      const userRef = doc(db, "users", "ugkv6ABFEnSokVLBFYnx");
      updateDoc(userRef, { invoiceData: invoiceFormData });
    } catch (e) {
      console.log(e);
    }

    fetchInvoiceData();
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

  // Deletes each invoice from firebase. Sent this to DeleteInvoice component and InvoiceHistory page.
  const handleDeleteInvoice = async (invoice) => {
    await deleteDoc(doc(db, "invoiceData", invoice.id));
    fetchInvoiceData();
  };

  // handle each individual download with jspdf. This youtube video was helpful - https://www.youtube.com/watch?v=ygPIjzhKB2s
  const EachDownloadRef = useRef([]);
  EachDownloadRef.current = [];

  const handlePrint = (el, index) => {
    if (el && !EachDownloadRef.current.includes(el)) {
      EachDownloadRef.current.push(el);
    }
    console.log(EachDownloadRef.current);
    const content = EachDownloadRef.current[index];
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
  };

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
