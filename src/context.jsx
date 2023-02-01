import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  // Create user with email and password
  const navigateUser = useNavigate();
  const handleNavigateUser = (link) => {
    navigateUser(`/${link}`);
  };

  const handleCreateUserWithEmailAndPassword = async (
    email,
    password,
    name = "username"
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      // confirm if users email already exists in the collection but not properly working yet
      const q = query(collection(db, "users"));
      const docs = await getDocs(q);
      docs.forEach((items) => {
        if (items.data().email == user.email) {
          alert("Email already exists, log in instead");
          handleNavigateUser(signin);
          // return;
        } else {
          addDoc(collection(db, "users"), {
            uid: user.uid,
            createdAt: serverTimestamp(),
            name,
            authProvider: "local",
            email,
            password,
            invoiceData: [],
          });
          console.log("user created");
          handleNavigateUser("create-invoice");
        }
      });
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("The email address is already in use, log in instead");
        handleNavigateUser("signin");
      } else if (error.code == "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code == "auth/operation-not-allowed") {
        alert("Operation not allowed.");
      } else if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
      }
    }
  };

  // Handle log in users with email and password
  const handleUserLogInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleNavigateUser("create-invoice");
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        alert("This is a wrong email/password");
      }
    }
  };

  // Know the current user on the site
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

  // Handles the create Invoice input values on the forms are saved to the invoiceFormData state
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

  // Handles each invoice submit and pushes it to be stored in firestore
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
    console.log(firebaseAllInvoiceArray);

    // Save to firestore and fetch the updated data
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const userInfoInFirebase = document.data();

        // Add to the existing fieldset in the firebase for each user - should be sent to the handlePreview though as it overwrites the current data there
        const userRef = doc(db, "users", document.id);
        // current user Id is gotten from the onAuthChanged state above.
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

  const handleUpdateDataInFirebase = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const userInfoInFirebase = document.data();

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
  };

  // Deletes each invoice from firebase. Sent this to DeleteInvoice component and InvoiceHistory page.
  const handleDeleteInvoice = (invoice) => {
    setAllInvoiceData((prevItems) =>
      prevItems.filter((item) => item.id !== invoice)
    );
    handleUpdateDataInFirebase();
    fetchInvoiceData();
    // await deleteDoc(doc(db, "invoiceData", invoice.id));
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
        handleNavigateUser,
        handleCreateUserWithEmailAndPassword,
        handleUserLogInWithEmailAndPassword,
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
