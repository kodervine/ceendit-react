import { useState, createContext, useContext, useEffect } from "react";
import { extendTheme } from "@chakra-ui/react";

const ThemeContext = createContext();

const AppThemeProvider = ({ children }) => {
  const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };

  // https://chakra-ui.com/docs/styled-system/color-mode
  const chakraTheme = extendTheme({ config });
  const [isEvening, setIsEvening] = useState(false);
  useEffect(() => {
    const now = new Date();
    const eveningStart = new Date().setHours(18, 0, 0);
    // set evening start time to 6:00 PM

    if (now.getTime() >= eveningStart) {
      setIsEvening(true);
    } else {
      setIsEvening(false);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ chakraTheme, isEvening }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export { ThemeContext, AppThemeProvider };
