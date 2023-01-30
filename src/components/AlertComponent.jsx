import React, { useState, useEffect } from "react";
import { Stack, Alert, AlertIcon } from "@chakra-ui/react";
import { useGlobalContext } from "../context";

const AlertComponent = () => {
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

  return (
    <div>
      <Stack spacing={3} position="fixed" width="100%" zIndex="3">
        <Alert status="success" variant="top-accent">
          <AlertIcon />
          Invoice Saved successfully!
        </Alert>
      </Stack>
    </div>
  );
};

export default AlertComponent;
