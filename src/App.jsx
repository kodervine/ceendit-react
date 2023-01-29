import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Box, Flex, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceHistory from "./pages/InvoiceHistory";
import Error from "./components/Error";
import AlertComponent from "./components/AlertComponent";
import SignInPage from "./pages/SignInPage";
import { logOutUser } from "./firebase-config";

function App() {
  const smallScreenWidth = window.innerWidth < 700;
  const { showPreviewComponent, showAllInvoice, currentUser } =
    useGlobalContext();

  const navigateUser = useNavigate();
  const loggingOutUser = () => {
    logOutUser();
    navigateUser("/signin");
  };

  return (
    <Box>
      {currentUser && (
        <Tabs
          variant="soft-rounded"
          colorScheme="blue"
          ml={{ base: "0", md: "60", lg: "15%" }}
        >
          <TabList
            mt="4"
            mb="4"
            flexDirection={smallScreenWidth ? "column" : "row"}
          >
            <Tab>
              <Link to="/">Home</Link>
            </Tab>

            <Tab>
              <Link to="/form-preview">Form Preview</Link>
            </Tab>
            <Tab>
              <Link to="/invoice-history">See all Invoice</Link>
            </Tab>
            <Tab onClick={loggingOutUser}>Log out</Tab>
          </TabList>
        </Tabs>
      )}

      {/* Display when invoice is saved successfully */}
      {showAllInvoice && <AlertComponent />}

      <Routes>
        <Route exact path="/" element={<InvoiceApp />} />
        <Route path="/signin" element={<SignInPage />} />
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
