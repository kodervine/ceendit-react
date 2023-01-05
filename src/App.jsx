import { useState, useRef, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceToPdf from "./components/InvoiceToPdf";
import InvoiceHistory from "./pages/InvoiceHistory";

function App() {
  const {
    showPreviewComponent,
    showAllInvoice,
    FormPreviewRef,
    invoiceHistoryRef,
    allInvoiceData,
    setAllInvoiceData,
  } = useGlobalContext();

  return (
    <BrowserRouter>
      <InvoiceApp />
      {/* renders the FormPreview page ref to be downloaded from InvoiceToPdf button  */}
      <Box ref={FormPreviewRef}>{showPreviewComponent && <FormPreview />}</Box>

      {showPreviewComponent && <InvoiceToPdf />}

      <Box>
        {/* {showAllInvoice && <InvoiceHistory />} */}
        <InvoiceHistory />
      </Box>
    </BrowserRouter>
  );
}

export default App;
