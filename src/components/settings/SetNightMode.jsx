import React from "react";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useThemeContext } from "@/context/ThemeContext";

const SetNightMode = () => {
  const { isEvening } = useThemeContext();
  return (
    <div>
      SetNightMode
      {isEvening ? <BsToggle2Off /> : <BsToggle2On />}
    </div>
  );
};

export default SetNightMode;
