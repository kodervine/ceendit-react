import { useState, createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

const AppThemeProvider = ({ children }) => {
  const [isEvening, setIsEvening] = useState(false);

  useEffect(() => {
    const now = new Date();
    const eveningStart = new Date().setHours(18, 0, 0); // set evening start time to 6:00 PM

    if (now.getTime() >= eveningStart) {
      setIsEvening(true);
    } else {
      setIsEvening(false);
    }
  }, []);

  console.log(isEvening);
  return (
    <ThemeContext.Provider value={{ isEvening }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export { ThemeContext, AppThemeProvider };
