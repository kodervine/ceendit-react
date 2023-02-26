import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
  USER_INITIAL_STATE,
  authUserReducer,
} from "../reducers/AuthUserReducer";
import {
  INVOICE_INITIAL_STATE,
  invoiceFormReducer,
} from "../reducers/InvoiceFormReducer";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const navigateUser = useNavigate();
  const handleNavigateUser = (link) => {
    navigateUser(`/${link}`);
  };

  // Know the current user on the site to be used to fetch the invoicedata from firestore subsequently
  const [userInitState, authDispatch] = useReducer(
    authUserReducer,
    USER_INITIAL_STATE
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authDispatch({ type: "USER_LOGGED_IN", payload: user });
        console.log(`user ${user.email} is logged in`);
      } else {
        console.log("user logged out");
        authDispatch({ type: "USER_LOGGED_OUT", payload: user });
      }
    });
  }, [auth, userInitState.currentUser]);

  // Form data to be updated to be previewed, and concanated to the state pushed to firestore
  const [invoiceFormState, formDispatch] = useReducer(invoiceFormReducer, {
    invoiceFormData: INVOICE_INITIAL_STATE,
    allInvoiceData: [],
  });

  // Combined variables to get reducer form proper

  const INVOICE_FORM_LOCAL_STORAGE_KEY = "invoiceFormData";
  useEffect(() => {
    const invoiceFormState = localStorage.getItem(
      INVOICE_FORM_LOCAL_STORAGE_KEY
    );
    if (invoiceFormState.invoiceFormData) {
      formDispatch({
        type: "SET_INVOICE_FORM_DATA",
        payload: JSON.parse(invoiceFormState.invoiceFormData),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      INVOICE_FORM_LOCAL_STORAGE_KEY,
      JSON.stringify(invoiceFormState.invoiceFormData)
    );
  }, [invoiceFormState.invoiceFormData]);

  const [showPreviewComponent, setShowPreviewComponent] = useState(false);
  const [showAllInvoice, setShowAllInvoice] = useState(false);

  // Save all the invoices for the invoiceHistory page and get data from firebase store
  const fetchInvoiceData = async () => {
    if (userInitState.userUpdated) {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          const userInfoInFirebase = document.data();
          if (userInfoInFirebase.uid == userInitState.currentUser.uid) {
            const newInvoiceData = document.data().invoiceData;
            formDispatch({
              type: "FETCH_FIREBASE_INVOICE_DATA",
              payload: newInvoiceData,
            });
            userInitState.userUpdated;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (userInitState.currentUser) {
      fetchInvoiceData();
    }
  }, [userInitState.currentUser]);

  // Handles the create Invoice input values on the forms are saved to the invoiceFormData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formDispatch({
      type: "UPDATE_INVOICE_FORM_DATA",
      payload: { name, value },
    });
    setShowPreviewComponent(true);
  };

  // Handle that extra invoice Data items by creating new objects dynamically
  const addNewInvoiceItems = () => {
    formDispatch({ type: "ADD_ITEM_CONTAINER_DATA" });
  };

  // FormPreview function - If it evealuated to true, it renders the FormPreview Page on the App.js
  const handlePreviewData = () => {
    const checkEmptyInput = Object.values(invoiceFormState.invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }
  };

  // Handle form reset from InvoiceFormReducer
  const handleInvoiceFormReset = () => {
    formDispatch({
      type: "RESET_FORM",
      payload: INVOICE_INITIAL_STATE,
    });
  };

  // Handles each invoice submit and pushes it to be stored in firestore
  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    const checkEmptyInput = Object.values(invoiceFormState.invoiceFormData);
    if (checkEmptyInput.some((input) => !input)) {
      alert("please fill out all fields");
      return;
    }

    // Add new invoice to the array in the state
    formDispatch({
      type: "SUBMIT_INVOICE_FORM_DATA",
      payload: invoiceFormState.invoiceFormData,
    });

    // Save to firestore and fetch the updated data from function below
    handleUpdateDataInFirebase(invoiceFormState.allInvoiceData);
    // from function above
    fetchInvoiceData();
    setShowAllInvoice(true);
    handleInvoiceFormReset();
  };

  // General update the invoiceData fieldset in firebase. Accepts parameter of the updated invoices to update
  const handleUpdateDataInFirebase = async (updatedInvoice) => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const userInfoInFirebase = document.data();

        // Important for each user - should be sent to the handlePreview though as it overwrites the current data there
        const userRef = doc(db, "users", document.id);
        // current user Id is gotten from the onAuthChanged state above.
        if (userInfoInFirebase.uid == userInitState.currentUser.uid) {
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

  // Handle edit invoice
  const handleEditInvoice = (editedInvoice, id) => {
    return {
      type: "EDIT_INVOICE",
      payload: {
        editedInvoice,
        id,
      },
    };
  };

  const handleUpdateEditedInvoice = () => {
    handleNavigateUser("create-invoice");
    handleInputChange();
  };

  // Sent this to DeleteInvoice component and InvoiceHistory page.
  const handleDeleteInvoice = (deleteindex) => {
    formDispatch({
      type: "DELETE_INVOICE",
      payload: { deleteindex },
    });
    handleUpdateDataInFirebase(invoiceFormState.allInvoiceData);
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
        userInitState,
        handleNavigateUser,
        invoiceFormState,
        handleInputChange,
        addNewInvoiceItems,
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

// Comments
// This is a React component that sets up a context provider to be used throughout an app. The provider holds several state values that affect various components in the app. It also has several helper functions that are used to manipulate this state.

// The component uses a context API to create a context object and a context provider to wrap other components. The state of the app is managed using the useReducer hook, which takes a reducer function and an initial state. The reducer functions are defined in separate files and are imported as needed.

// The component fetches data from Firestore and uses the onAuthStateChanged method from the Firebase Authentication library to track user authentication status. It also has a helper function that generates a PDF invoice using the jspdf library.

// The component also uses several other hooks such as useEffect, useState, and useRef to manage the state of the app and perform various side effects. Each helper function is used to perform a specific task, and they are all clearly named for their purposes.
