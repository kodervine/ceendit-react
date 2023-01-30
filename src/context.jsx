import React, { useContext, useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  // Get current user
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("state = definitely signed in");
        setCurrentUserId(user.uid);
        setCurrentUser(user);
      } else {
        console.log("state = definitely signed out");
      }
    });
  }, []);

  // Form data to be updated to be previewed, and concatated to firestore
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
    // const queryMessage = query(
    //   collection(db, "invoiceData"),
    //   orderBy("createdAt")
    // );
    // await getDocs(queryMessage).then((invoiceQuery) => {
    //   const newInvoiceData = invoiceQuery.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));

    //   setAllInvoiceData(newInvoiceData);
    // });

    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const userInfoInFirebase = document.data();
        if (userInfoInFirebase.uid == currentUserId) {
          const newInvoiceData = document.data().invoiceData;
          setAllInvoiceData(newInvoiceData);
          console.log(newInvoiceData);
        }
      });
    } catch (e) {
      console.log(e);
    }
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
  const [firebaseAllInvoiceArray, setFirebaseAllInvoiceArray] = useState([]);
  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    const checkEmptyInput = Object.values(invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }

    setFirebaseAllInvoiceArray((prevdata) => {
      return [...prevdata, invoiceFormData];
    });
    // Save to firestore and fetch the updated data
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const userInfoInFirebase = document.data();
        console.log(document.id, " =>", userInfoInFirebase.invoiceData);
        // Add to the existing fieldset in the firebase for each user - should be sent to the handlePreview though as it overwrites the current data there
        const userRef = doc(db, "users", document.id);
        if (userInfoInFirebase.uid == currentUserId) {
          updateDoc(userRef, { invoiceData: firebaseAllInvoiceArray });
        }
      });
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
        currentUser,
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
