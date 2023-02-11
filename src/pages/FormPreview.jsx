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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import DrawerComponent from "../components/homepageComponents/DrawerComponent";
import Nav from "../components/homepageComponents/Nav";
import InvoiceToPdf from "../components/InvoiceToPdf";
import { useGlobalContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";

const FormPreview = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    invoiceFormData,
    FormPreviewRef,
    handleInvoiceSubmit,
    showPreviewComponent,
  } = useGlobalContext();

  return (
    <Box id="form-input">
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {!smallScreenWidth && <Sidebar />}

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
                <Tr bg={colorMode === "light" ? "gray.100" : "blue.100"}>
                  <Th color={colorMode === "light" ? "auto" : "blue.900"}>
                    Bank Name
                  </Th>
                  <Th color={colorMode === "light" ? "auto" : "blue.900"}>
                    Account Name
                  </Th>
                  <Th
                    color={colorMode === "light" ? "auto" : "blue.900"}
                    isNumeric
                  >
                    Account Number
                  </Th>
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
                <Tr bg={colorMode === "light" ? "gray.100" : "blue.100"}>
                  <Th color={colorMode === "light" ? "auto" : "blue.900"}>
                    Item Name
                  </Th>
                  <Th
                    color={colorMode === "light" ? "auto" : "blue.900"}
                    isNumeric
                  >
                    Qty
                  </Th>
                  <Th
                    color={colorMode === "light" ? "auto" : "blue.900"}
                    isNumeric
                  >
                    Price
                  </Th>

                  <Th
                    color={colorMode === "light" ? "auto" : "blue.900"}
                    isNumeric
                  >
                    Total Amount
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoiceFormData.itemContainer.map((item, index) => {
                  return (
                    <Tr>
                      <Td>{item.itemContent}</Td>
                      <Td isNumeric>{item.itemQty}</Td>
                      <Td>{item.itemPrice}</Td>
                      <Td isNumeric>
                        #{parseInt(item.itemQty * item.itemPrice)}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Flex>
      {/* Buttons */}
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
          width={smallScreenWidth ? "100%" : "100%"}
        >
          Save to Invoice History
        </Button>
      </Box>
    </Box>
  );
};

export default FormPreview;
