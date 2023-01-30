import "./App.css";
import { useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Box, Flex, Tabs, TabList, Tab, useDisclosure } from "@chakra-ui/react";
import { useGlobalContext } from "./context";
import DrawerComponent from "./components/homepageComponents/DrawerComponent";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";
import InvoiceHistory from "./pages/InvoiceHistory";
import Error from "./components/Error";
import AlertComponent from "./components/AlertComponent";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { logOutUser } from "./firebase-config";
import Nav from "./components/homepageComponents/Nav";

function App() {
  const smallScreenWidth = window.innerWidth < 700;
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // For form preview
  const { showPreviewComponent, showAllInvoice, currentUser } =
    useGlobalContext();

  const navigateUser = useNavigate();
  const loggingOutUser = () => {
    logOutUser();
    navigateUser("/signin");
  };

  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} />
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
              <Link to="create-invoice">Create Invoice</Link>
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
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />

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
