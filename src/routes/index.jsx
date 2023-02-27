import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AlertComponent from "@/components/AlertComponent";
// import Error from "@/components/Error";
import DashboardPage from "@/pages/DashboardPage";
import FormPreviewPage from "@/pages/FormPreviewPage";
import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import AllClientsPage from "@/pages/clients/AllClientsPage";
import ClientPage from "@/pages/clients/ClientPage";
import InvoiceHistoryPage from "@/pages/invoice/InvoiceHistoryPage";
import InvoicePage from "@/pages/invoice/InvoicePage";
import ShareInvoicePage from "@/pages/invoice/ShareInvoicePage";

import ProtectedRoutes from "@/routes/ProtectedRoutes";

import { useGlobalContext } from "@/context/AppContext";

const Error = lazy(() => import("@/components/Error"));

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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-invoice" element={<InvoicePage />} />
          <Route
            path="/form-preview"
            element={showPreviewComponent ? <FormPreviewPage /> : <Error />}
          />
          <Route path="/invoice-history" element={<InvoiceHistoryPage />} />
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
