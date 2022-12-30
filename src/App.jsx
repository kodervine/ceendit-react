import { useState, useRef, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceToPdf from "./components/InvoiceToPdf";
import InvoiceHistory from "./pages/InvoiceHistory";

function App() {
  const {
    showPreviewComponent,
    FormPreviewRef,
    invoiceHistoryRef,
    allInvoiceData,
    setAllInvoiceData,
  } = useGlobalContext();

  // useEffect(() => {
  //   const dataFromStorage = JSON.parse(localStorage.getItem("invoiceData"));
  //   if (dataFromStorage) {
  //     setAllInvoiceData(dataFromStorage);
  //   }
  // }, []);
  return (
    <BrowserRouter>
      <InvoiceApp />
      {/* renders the FormPreview page ref to be downloaded from InvoiceToPdf button  */}
      <Box ref={FormPreviewRef}>{showPreviewComponent && <FormPreview />}</Box>
      {showPreviewComponent && <InvoiceToPdf />}
      <Box ref={invoiceHistoryRef}>
        <InvoiceHistory />
      </Box>
    </BrowserRouter>
  );
}

export default App;
