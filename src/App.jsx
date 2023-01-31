import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceHistory from "./pages/InvoiceHistory";
import Error from "./components/Error";
import AlertComponent from "./components/AlertComponent";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  // For form preview
  const { showPreviewComponent, showAllInvoice } = useGlobalContext();

  return (
    <Box>
      {/* Display when invoice is saved successfully */}
      {showAllInvoice && <AlertComponent />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-invoice" element={<InvoiceApp />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create-account" element={<SignUpPage />} />
        {/* <Route path="/form-preview" element={<FormPreview />} /> */}
        <Route
          path="/form-preview"
          element={showPreviewComponent ? <FormPreview /> : <Error />}
        />
        <Route path="/invoice-history" element={<InvoiceHistory />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Box>
  );
}

export default App;
