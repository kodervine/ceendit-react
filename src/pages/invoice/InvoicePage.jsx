import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Spacer,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import DateInput from "@/components/DateInput";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import Nav from "@/components/homepage/Nav";
import Sidebar from "@/components/homepage/Sidebar";
import InvoiceBankDetails from "@/components/invoice/InvoiceBankDetails";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceItems from "@/components/invoice/InvoiceItems";
import { useGlobalContext } from "@/context/AppContext";

const InvoicePage = () => {
  const {
    invoiceFormState,
    handleInputChange,
    addNewInvoiceItems,
    handleInvoiceSubmit,
    showPreviewComponent,
    handlePreviewData,
  } = useGlobalContext();

  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const smallScreenWidth = window.innerWidth < 700;

  // Const total from items price and quantity
  const invoiceItemsTotal =
    invoiceFormState.invoiceFormData.itemContainer.reduce(
      (acc, item) =>
        acc + parseFloat(item.itemQty || 0) * parseFloat(item.itemPrice || 0),
      0
    );

  return (
    <>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex>
        {!smallScreenWidth && <Sidebar />}
        <FormControl
          onSubmit={handleInvoiceSubmit}
          width={{ base: "100%", md: "90%", lg: "70%" }}
          maxW="960px"
          margin="auto"
          border="1px"
          borderColor="gray.200"
          boxShadow="md"
          p="6"
          rounded="md"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Image src={logo} />
            <Box>
              <Text fontWeight="bold">Invoice No ---</Text>
            </Box>
          </Flex>
          {/* Input -  Sending and receiving dateInput rendering with data gotten from useContext - invoiceFormData variable. Plus passing the data via to the dateInput component */}
          <Flex direction={smallScreenWidth ? "column" : "row"}>
            <DateInput
              text="Date Created"
              nameOfDateInput="dateCreated"
              onHandleChange={handleInputChange}
              valueofDateInput={invoiceFormState.invoiceFormData.dateCreated}
            />
            <Spacer />
            <DateInput
              text="Date due"
              nameOfDateInput="dateDue"
              onHandleChange={handleInputChange}
              valueOfDateInput={invoiceFormState.invoiceFormData.dateDue}
            />
          </Flex>

          {/* InvoiceForm Bill from and to input rendering with name, phone number and email with data gotten from the useGlobalContext from useContext. 
      
      Also passing the data via props to InvoiceForm component*/}
          <Box>
            <InvoiceForm
              recipient="Bill from"
              placeholder="who is this invoice from"
              formNameOfInvoiceFormEmail="billFromEmail"
              formNameOfInvoiceFormText="billFromName"
              formNameOfInvoiceFormNumber="billFromPhoneNumber"
              valueOfInvoiceFormEmail={
                invoiceFormState.invoiceFormData.billFromEmail
              }
              valueOfInvoiceFormText={
                invoiceFormState.invoiceFormData.billFromName
              }
              valueOfInvoiceFormPhoneNumber={
                invoiceFormState.invoiceFormData.billFromPhoneNumber
              }
              onHandleChange={handleInputChange}
            />
            <Spacer />
            {/* BillTo InvoiceForm rendering */}
            <InvoiceForm
              recipient="Bill to"
              placeholder="who is this email to"
              formNameOfInvoiceFormEmail="billToEmail"
              formNameOfInvoiceFormText="billToName"
              formNameOfInvoiceFormNumber="billToPhoneNumber"
              valueOfInvoiceFormEmail={
                invoiceFormState.invoiceFormData.billToEmail
              }
              valueOfInvoiceFormText={
                invoiceFormState.invoiceFormData.billToName
              }
              valueOfInvoiceFormPhoneNumber={
                invoiceFormState.invoiceFormData.billToPhoneNumber
              }
              onHandleChange={handleInputChange}
            />
          </Box>

          {/* Data gotten from the useGlobalContext from useContext. Also passing the data via props to InvoiceForm component*/}
          <Box>
            <InvoiceBankDetails
              formNameOfInvoiceFormBankName="bankName"
              formNameOfInvoiceFormBankAccount="bankAccount"
              formNameOfInvoiceFormAccountName="accountName"
              valueOfInvoiceFormBankName={
                invoiceFormState.invoiceFormData.bankName
              }
              valueOfInvoiceFormAccountName={
                invoiceFormState.invoiceFormData.accountName
              }
              valueOfInvoiceFormBankAccount={
                invoiceFormState.invoiceFormData.bankAccount
              }
              onHandleChange={handleInputChange}
            />
          </Box>

          {/* InvoiceItems rendering with data gotten from useContext - invoiceFormState.invoiceFormData variable. Plus passing the data via to the InvoiceItems component*/}
          <section>
            {invoiceFormState.invoiceFormData.itemContainer.map(
              (item, index) => {
                return (
                  <InvoiceItems
                    key={index}
                    nameOfInvoiceItemPrice={`itemContainer.${index}.itemPrice`}
                    nameOfInvoiceItemContent={`itemContainer.${index}.itemContent`}
                    nameOfInvoiceItemQty={`itemContainer.${index}.itemQty`}
                    nameOfInvoiceItemTotal="itemTotal"
                    valueOfInvoiceItemPrice={item.itemPrice}
                    valueOfInvoiceItemContent={item.itemContent}
                    valueOfInvoiceItemQty={item.itemQty}
                    onHandleChange={handleInputChange}
                  />
                );
              }
            )}

            {/* Add more invoice items */}
            <Button
              colorScheme="blue"
              onClick={addNewInvoiceItems}
              width="100%"
              marginTop="3"
              marginBottom="3"
            >
              Add more items
            </Button>
            {/* Invoice Total */}

            <Box>
              <Heading as="h4" size="lg">
                Total
              </Heading>
              <Text>{invoiceItemsTotal}</Text>
            </Box>
          </section>
          <Flex pt="6" gap="2" width="100vw">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
              </MenuButton>
              <MenuList>
                {!showPreviewComponent ? (
                  <MenuItem onClick={handlePreviewData}>
                    <Link disabled> Preview Invoice</Link>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handlePreviewData}>
                    {showPreviewComponent && (
                      <Link to="/form-preview"> Preview Invoice</Link>
                    )}
                  </MenuItem>
                )}

                <MenuItem onClick={handleInvoiceSubmit}>
                  Save to invoice history
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/invoice-history">View all Invoice</Link>
                </MenuItem>
              </MenuList>
            </Menu>
            {/* Disable preview invoice button if the forms haven't been filled */}
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
};

export default InvoicePage;
