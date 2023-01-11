import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceToPdf from "./components/InvoiceToPdf";
import InvoiceHistory from "./pages/InvoiceHistory";
import Error from "./components/Error";
import Alert from "./components/Alert";

function App() {
  const { showPreviewComponent, showAllInvoice } = useGlobalContext();

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/form-preview">Form Preview</Link>
        <Link to="/invoice-history">See all Invoice</Link>
      </nav>
      {showAllInvoice && <Alert />}
      <Routes>
        <Route exact path="/" element={<InvoiceApp />} />

        {/* <Route path="/form-preview" element={<FormPreview />} /> */}
        <Route
          path="/form-preview"
          element={showPreviewComponent ? <FormPreview /> : <Error />}
        />
        <Route path="/invoice-history" element={<InvoiceHistory />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* renders the FormPreview page ref to be downloaded from InvoiceToPdf button  */}
      {/* <Box ref={FormPreviewRef}>{showPreviewComponent && <FormPreview />}</Box> */}

      {/* {showPreviewComponent && <InvoiceToPdf />} */}
    </Router>
  );
}

export default App;
