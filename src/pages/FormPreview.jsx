import React, { useRef } from "react";
import logo from "../assets/logo.png";
import {
  Flex,
  Image,
  Spacer,
  Box,
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import DrawerComponent from "../components/homepageComponents/DrawerComponent";
import InvoiceToPdf from "../components/InvoiceToPdf";
import { useGlobalContext } from "../context";

const FormPreview = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  const {
    invoiceFormData,
    setInvoiceFormData,
    FormPreviewRef,
    handleInvoiceSubmit,
    showPreviewComponent,
  } = useGlobalContext();

  return (
    <Box id="form-input">
      <Nav ref={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />

      <Stack
        ref={FormPreviewRef}
        width={{ base: "100%", md: "90%", lg: "70%" }}
        maxW="960px"
        m="auto"
        mb="6"
        mt="6"
        p="6"
        boxShadow="dark-lg"
        rounded="md"
        bg="white"
      >
        {/* Logo header */}
        <Flex alignItems="center" justifyContent="space-between">
          <Image src={logo} />
          <Box>
            <Text fontWeight="bold">
              Invoice No {invoiceFormData.dateCreated}
            </Text>
          </Box>
        </Flex>

        {/* Date */}
        <Box>
          <Heading size="md">{invoiceFormData.billFromName}</Heading>
          <Text>{invoiceFormData.billFromPhoneNumber}</Text>
          <Text>{invoiceFormData.billFromEmail}</Text>
        </Box>

        {/* Invoice date and due date */}
        <Flex>
          <Box>
            <Heading size="sm">Invoice date</Heading>
            <Text>{invoiceFormData.dateCreated}</Text>
          </Box>
          <Spacer />
          <Box>
            <Heading size="sm">Due date</Heading>
            <Text>{invoiceFormData.dateDue}</Text>
          </Box>
        </Flex>

        {/* Billed to */}
        <Box>
          <Heading size="sm">Billed to</Heading>
          <Text>{invoiceFormData.billToName}</Text>
          <Text>{invoiceFormData.billToPhoneNumber}</Text>
          <Text>{invoiceFormData.billToEmail}</Text>
        </Box>

        {/* Bank details */}
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.100">
                <Th>Bank Name</Th>
                <Th>Account Name</Th>
                <Th isNumeric>Account Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{invoiceFormData.bankName}</Td>
                <Td>{invoiceFormData.accountName}</Td>
                <Td isNumeric>{invoiceFormData.bankAccount}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        {/* Invoice Items */}
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.100">
                <Th>Item Name</Th>
                <Th isNumeric>Qty</Th>
                <Th isNumeric>Price</Th>

                <Th isNumeric>Total Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{invoiceFormData.itemContent}</Td>
                <Td isNumeric>{invoiceFormData.itemQty}</Td>
                <Td>{invoiceFormData.itemPrice}</Td>
                <Td isNumeric>
                  #
                  {parseInt(
                    invoiceFormData.itemQty * invoiceFormData.itemPrice
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>

      {showPreviewComponent && <InvoiceToPdf />}
      <Box
        width={{ base: "100%", md: "90%", lg: "70%" }}
        maxW="960px"
        margin="auto"
        mt="10px"
        mb="10px"
      >
        {/* Eventually this should show only the submit */}
        <Button
          onClick={handleInvoiceSubmit}
          colorScheme="blue"
          width={smallScreenWidth ? "100%" : "auto"}
        >
          Save to Invoice History
        </Button>
      </Box>
    </Box>
  );
};

export default FormPreview;
