import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { nanoid } from "nanoid";
import { useRef } from "react";

import logo from "@/assets/logo.png";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import Nav from "@/components/homepage/Nav";
import Sidebar from "@/components/homepage/Sidebar";
import { useGlobalContext } from "@/context/AppContext";

const FormPreviewPage = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  const { colorMode } = useColorMode();

  const {
    invoiceFormState,
    FormPreviewRef,
    handleInvoiceSubmit,
    handlePreviewInvoicePdf,
  } = useGlobalContext();

  return (
    <Box id="form-input">
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex direction={smallScreenWidth ? "column" : "row"}>
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
                Invoice No {invoiceFormState.invoiceFormData.dateCreated}
              </Text>
            </Box>
          </Flex>

          {/* Date */}
          <Box>
            <Heading size="md">
              {invoiceFormState.invoiceFormData.billFromName}
            </Heading>
            <Text>{invoiceFormState.invoiceFormData.billFromPhoneNumber}</Text>
            <Text>{invoiceFormState.invoiceFormData.billFromEmail}</Text>
          </Box>

          {/* Invoice date and due date */}
          <Flex>
            <Box>
              <Heading size="sm">Invoice date</Heading>
              <Text>{invoiceFormState.invoiceFormData.dateCreated}</Text>
            </Box>
            <Spacer />
            <Box>
              <Heading size="sm">Due date</Heading>
              <Text>{invoiceFormState.invoiceFormData.dateDue}</Text>
            </Box>
          </Flex>

          {/* Billed to */}
          <Box>
            <Heading size="sm">Billed to</Heading>
            <Text>{invoiceFormState.invoiceFormData.billToName}</Text>
            <Text>{invoiceFormState.invoiceFormData.billToPhoneNumber}</Text>
            <Text>{invoiceFormState.invoiceFormData.billToEmail}</Text>
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
                  <Td>{invoiceFormState.invoiceFormData.bankName}</Td>
                  <Td>{invoiceFormState.invoiceFormData.accountName}</Td>
                  <Td isNumeric>
                    {invoiceFormState.invoiceFormData.bankAccount}
                  </Td>
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
                    textAlign="center"
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
                {invoiceFormState.invoiceFormData.itemContainer.map((item) => {
                  return (
                    <Tr key={nanoid()}>
                      <Td>{item.itemContent}</Td>
                      <Td isNumeric>{item.itemQty}</Td>
                      <Td textAlign="center">N {item.itemPrice}</Td>
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
        {/* buttons */}
        <Menu colorScheme="blue">
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handlePreviewInvoicePdf}>Download</MenuItem>

            <MenuItem onClick={handleInvoiceSubmit}>
              Save to invoice history
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default FormPreviewPage;
