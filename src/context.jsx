import { useContext, useState } from "react";
import App from "./App";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [invoiceFormData, setInvoiceFormData] = useState({
    dateCreated: "",
    dateDue: "",
    billFromEmail: "",
    billFromName: "",
    billFromNumber: "",
    billToEmail: "",
    billToName: "",
    billToNumber: "",
    itemName: "",
    itemDescription: "",
    itemQty: "",
    totalPrice: "",
  });
  return (
    <AppContext.Provider value={invoiceFormData}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(App);
};

export { AppContext, AppProvider };
