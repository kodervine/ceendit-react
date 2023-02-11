import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const navigateUser = useNavigate();
  const handleNavigateUser = (link) => {
    navigateUser(`/${link}`);
  };

  // Know the current user on the site to be used to fetch the invoicedata from firestore subsequently
  const [currentUser, setCurrentUser] = useState("");
  const [userUpdated, setUserUpdated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`note: user, ${user.email} is signed in`);
        setCurrentUser(user);
        setUserUpdated(true);
        localStorage.setItem("isUserSignedIn", true);
      } else {
        console.log("note: user is signed out");
        setUserUpdated(false);
        localStorage.removeItem("isUserSignedIn");
      }
    });
  }, [auth, currentUser]);

  // Form data to be updated to be previewed, and concanated to the state pushed to firestore
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
    itemContainer: [
      {
        itemContent: "",
        itemQty: "",
        itemPrice: "",
      },
    ],
  });
  const [showPreviewComponent, setShowPreviewComponent] = useState(false);
  const [showAllInvoice, setShowAllInvoice] = useState(false);

  // Save all the invoices for the invoiceHistory page and get data from firebase store
  const [allInvoiceData, setAllInvoiceData] = useState([]);
  const fetchInvoiceData = async () => {
    if (userUpdated) {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          const userInfoInFirebase = document.data();
          if (userInfoInFirebase.uid == currentUser.uid) {
            const newInvoiceData = document.data().invoiceData;
            setAllInvoiceData(newInvoiceData);
            setUserUpdated(true);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchInvoiceData();
    }
  }, [currentUser]);

  // Handles the create Invoice input values on the forms are saved to the invoiceFormData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("itemContainer")) {
      const [index, field] = name.split(".");
      if (index < invoiceFormData.itemContainer.length) {
        const newItemContainer = [...invoiceFormData.itemContainer];
        newItemContainer[index][field] = value;
        setInvoiceFormData({
          ...invoiceFormData,
          itemContainer: newItemContainer,
        });
      }
    } else {
      setInvoiceFormData({
        ...invoiceFormData,
        [name]: value,
      });
    }
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

  // Handles each invoice submit and pushes it to be stored in firestore
  const [firebaseAllInvoiceArray, setFirebaseAllInvoiceArray] =
    useState(allInvoiceData);
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
    console.log(firebaseAllInvoiceArray);

    // Save to firestore and fetch the updated data from function below
    handleUpdateDataInFirebase(firebaseAllInvoiceArray);
    // from function above
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
        itemContainer: [
          {
            itemContent: "",
            itemQty: "",
            itemPrice: "",
          },
        ],
      };
    });
  };

  // General update the invoiceData fieldset in firebase. Accepts parameter of the updates invoices to update
  const handleUpdateDataInFirebase = async (updatedInvoice) => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const userInfoInFirebase = document.data();

        // Add to the existing fieldset in the firebase for each user - should be sent to the handlePreview though as it overwrites the current data there
        const userRef = doc(db, "users", document.id);
        // current user Id is gotten from the onAuthChanged state above.
        if (userInfoInFirebase.uid == currentUser.uid) {
          updateDoc(userRef, {
            invoiceData: updatedInvoice,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
    fetchInvoiceData();
  };

  // Deletes each invoice from firebase. Sent this to DeleteInvoice component and InvoiceHistory page.
  const handleDeleteInvoice = (index) => {
    const updateDeletedArray = allInvoiceData.filter((item, i) => {
      console.log(i, index);
      return i !== index;
    });

    setAllInvoiceData(updateDeletedArray);
    console.log(updateDeletedArray);
    handleUpdateDataInFirebase(updateDeletedArray);
    console.log(allInvoiceData);
  };

  // handle each individual download with jspdf. This youtube video was helpful - https://www.youtube.com/watch?v=ygPIjzhKB2s
  const EachDownloadRef = useRef([]);
  EachDownloadRef.current = [];

  const handlePrint = (el, index) => {
    if (el && !EachDownloadRef.current.includes(el)) {
      EachDownloadRef.current.push(el);
    }
    // console.log(EachDownloadRef.current);
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
        userUpdated,
        handleNavigateUser,
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

/*
context.jsx - This file serves as the state management of the application.
It includes functionalities like getting the current user, setting up the form data,
handling input change, handling form preview and submitting invoices to Firebase.

Imports:
1. React - core library for building UI components
2. jsPDF - a library for generating PDF documents
3. Firebase functions - for connecting and performing CRUD operations on the database

AppContext & AppProvider:
- creates the context object and a component that provides the context value
- the context holds the following state values:
* currentUserId & currentUser: holds the ID and user object of the current user
* invoiceFormData: holds the data for the invoice form
* showPreviewComponent: determines if the FormPreview component should be displayed
* showAllInvoice: determines if the InvoiceHistory component should be displayed
* allInvoiceData: holds all the invoice data retrieved from the database

handleInputChange:
- updates the invoiceFormData state with the values from the input fields

handlePreviewData:
- checks if all the input fields have values
- if any field is empty, shows an alert message

handleInvoiceSubmit:
- prevents the default submit behavior
- checks if all the input fields have values
- if any field is empty, shows an alert message
- adds the invoice data to Firebase and updates the allInvoiceData state
- resets the invoiceFormData state

fetchInvoiceData:
- retrieves the invoice data from Firebase for the current user and updates the allInvoiceData state
*/
