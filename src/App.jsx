import { useState } from "react";
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

function App() {
  const { showPreviewComponent, handlePreviewData } = useGlobalContext();
  return (
    <BrowserRouter>
      <InvoiceApp />
      <FormPreview />
      {/* {showPreviewComponent && <FormPreview />} */}
    </BrowserRouter>

    // <div className="App">
    //
    // </div>
  );
}

export default App;
