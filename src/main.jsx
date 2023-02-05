import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <UserProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </UserProvider>
      </AppProvider>
    </Router>
  </React.StrictMode>
);
