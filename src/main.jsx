import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "@/App";
import { AppProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";
import { AppThemeProvider } from "@/context/ThemeContext";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <AppThemeProvider>
          <UserProvider>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </UserProvider>
        </AppThemeProvider>
      </AppProvider>
    </Router>
  </React.StrictMode>
);
