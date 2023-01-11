import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const Alert = () => {
  const { showAllInvoice, setShowAllInvoice } = useGlobalContext();

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAllInvoice(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!showAllInvoice) {
    return null;
  }

  return <div>Saved</div>;
};

export default Alert;
