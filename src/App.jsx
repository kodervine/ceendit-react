import { useState, useRef } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceToPdf from "./components/InvoiceToPdf";

function App() {
  const { showPreviewComponent, handlePreviewData, handleGenerateInvoicePdf } =
    useGlobalContext();
  return (
    <BrowserRouter>
      <InvoiceApp />
      {showPreviewComponent && <FormPreview />}
      <InvoiceToPdf />
    </BrowserRouter>

    // <div className="App">
    //
    // </div>
  );
}

export default App;
