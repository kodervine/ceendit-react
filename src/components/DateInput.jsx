import { Heading, Input, Stack } from "@chakra-ui/react";

// Deconstructing data gotten from the Invoice App and context.jsx. Date on the invoice page
const DateInput = ({
  text,
  nameOfDateInput,
  onHandleChange,
  valueofDateInput,
}) => {
  return (
    <Stack>
      <Heading as="h3" size="sm" pt="10px" pb="10px">
        {text}
      </Heading>

      <Input
        placeholder="Select Date and Time"
        size="md"
        type="date"
        name={nameOfDateInput}
        id="date-input"
        onChange={onHandleChange}
        value={valueofDateInput}
      />
    </Stack>
  );
};

export default DateInput;
