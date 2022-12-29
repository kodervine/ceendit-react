import React from "react";
import { useGlobalContext } from "../context";
import { Input } from "@chakra-ui/react";

// Deconstructing data gotten from the Invoice App and context.jsx. Date on the invoice page
const DateInput = ({
  text,
  nameOfDateInput,
  onHandleChange,
  valueofDateInput,
}) => {
  const { invoiceFormData, handleInputChange } = useGlobalContext();
  return (
    <div>
      <p>{text}</p>
      <Input
        placeholder="Select Date and Time"
        size="md"
        type="datetime-local"
        name={nameOfDateInput}
        id="date-input"
        onChange={onHandleChange}
        value={valueofDateInput}
      />
    </div>
  );
};

export default DateInput;
