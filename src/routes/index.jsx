import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useGlobalContext } from "@/context/AppContext";
import AlertComponent from "@/components/AlertComponent";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

// Lazy loading import
const Error = lazy(() => import("@/components/Error"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const FormPreviewPage = lazy(() => import("@/pages/FormPreviewPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const SignInPage = lazy(() => import("@/pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/auth/SignUpPage"));
const AllClientsPage = lazy(() => import("@/pages/clients/AllClientsPage"));
const ClientPage = lazy(() => import("@/pages/clients/ClientPage"));
const InvoiceHistoryPage = lazy(() =>
  import("@/pages/invoice/InvoiceHistoryPage")
);
const InvoicePage = lazy(() => import("@/pages/invoice/InvoicePage"));
const ShareInvoicePage = lazy(() => import("@/pages/invoice/ShareInvoicePage"));

export default () => {
  // For form preview
  const { showPreviewComponent, showAllInvoice, userInitState } =
    useGlobalContext();

  return (
    <>
      {/* Display when invoice is saved successfully */}
      {showAllInvoice && <AlertComponent />}
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  );
};
