import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceToPdf from "./components/InvoiceToPdf";
import InvoiceHistory from "./pages/InvoiceHistory";
import Error from "./components/Error";

function App() {
  const { showPreviewComponent } = useGlobalContext();

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/form-preview">Form Preview</Link>
        <Link to="/invoice-history">See all Invoice</Link>
      </nav>
      <Routes>
        <Route path="/" element={<InvoiceApp />} />
        <Route
          path="/form-preview"
          element={
            showPreviewComponent ? <FormPreview /> : "No preview available"
          }
        />
        <Route path="/invoice-history" element={<InvoiceHistory />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* renders the FormPreview page ref to be downloaded from InvoiceToPdf button  */}
      {/* <Box ref={FormPreviewRef}>{showPreviewComponent && <FormPreview />}</Box> */}

      {showPreviewComponent && <InvoiceToPdf />}
    </Router>
  );
}

export default App;
