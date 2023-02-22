import { Route, Routes } from "react-router-dom";

import AlertComponent from "@/components/AlertComponent";
import Error from "@/components/Error";

import AllClientsPage from "@/components/clientsComponents/AllClientsPage";
import ClientPage from "@/pages/ClientPage";
import Dashboard from "@/pages/Dashboard";
import FormPreview from "@/pages/FormPreview";
import HomePage from "@/pages/HomePage";
import InvoiceApp from "@/pages/InvoiceApp";
import InvoiceHistory from "@/pages/InvoiceHistory";
import ShareInvoicePage from "@/pages/ShareInvoicePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import ProtectedRoutes from "@/utils/ProtectedRoutes";

import { useGlobalContext } from "@/context/AppContext";

export default () => {
  // For form preview
  const { showPreviewComponent, showAllInvoice, userInitState } =
    useGlobalContext();

  return (
    <>
      {/* Display when invoice is saved successfully */}
      {showAllInvoice && <AlertComponent />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create-account" element={<SignUpPage />} />
        <Route path="/my-clients" element={<AllClientsPage />} />
        <Route path="/client" element={<ClientPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-invoice" element={<InvoiceApp />} />
          <Route
            path="/form-preview"
            element={showPreviewComponent ? <FormPreview /> : <Error />}
          />
          <Route path="/invoice-history" element={<InvoiceHistory />} />
          {userInitState.currentUser && (
            <Route
              path={`/invoices/${userInitState.currentUser.displayName}`}
              element={<ShareInvoicePage />}
            >
              <Route
                path={`/invoices/${userInitState.currentUser.displayName}/:id`}
              />
            </Route>
          )}
        </Route>
        {/* <Route path="/invoices/:id" component={ShareInvoicePage} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
