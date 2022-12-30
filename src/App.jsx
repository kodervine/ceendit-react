import { useState, useRef } from "react";
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

function App() {
  const { showPreviewComponent, FormPreviewRef } = useGlobalContext();
  return (
    <BrowserRouter>
      <InvoiceApp />
      {/* renders the FormPreview page ref to be downloaded from InvoiceToPdf button  */}
      <Box ref={FormPreviewRef}>{showPreviewComponent && <FormPreview />}</Box>
      {showPreviewComponent && <InvoiceToPdf />}
    </BrowserRouter>
  );
}

export default App;
