import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceToPdf from "./components/InvoiceToPdf";
import InvoiceHistory from "./pages/InvoiceHistory";
import Error from "./components/Error";
import AlertComponent from "./components/AlertComponent";

function App() {
  const { showPreviewComponent, showAllInvoice } = useGlobalContext();

  return (
    <Router>
      <Tabs
        variant="soft-rounded"
        colorScheme="blue"
        ml={{ base: "0", md: "60", lg: "96" }}
      >
        <TabList mt="4" mb="4">
          <Tab>
            <Link to="/">Home</Link>
          </Tab>
          <Tab>
            <Link to="/form-preview">Form Preview</Link>
          </Tab>
          <Tab>
            <Link to="/invoice-history">See all Invoice</Link>
          </Tab>
        </TabList>
      </Tabs>

      {showAllInvoice && <AlertComponent />}
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

      {/* {showPreviewComponent && <InvoiceToPdf />} */}
    </Router>
  );
}

export default App;
