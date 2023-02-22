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
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import DateInput from "@/components/DateInput";
import InvoiceBankDetails from "@/components/InvoiceBankDetails";
import InvoiceForm from "@/components/InvoiceForm";
import InvoiceItems from "@/components/InvoiceItems";
import Sidebar from "@/components/Sidebar";
import DrawerComponent from "@/components/homepageComponents/DrawerComponent";
import Nav from "@/components/homepageComponents/Nav";
import { useGlobalContext } from "@/context/AppContext";

const InvoiceApp = () => {
  const {
    invoiceFormDataDirect,
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
  const invoiceItemsTotal = invoiceFormDataDirect.itemContainer.reduce(
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
              valueofDateInput={invoiceFormDataDirect.dateCreated}
            />
            <Spacer />
            <DateInput
              text="Date due"
              nameOfDateInput="dateDue"
              onHandleChange={handleInputChange}
              valueOfDateInput={invoiceFormDataDirect.dateDue}
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
              valueOfInvoiceFormEmail={invoiceFormDataDirect.billFromEmail}
              valueOfInvoiceFormText={invoiceFormDataDirect.billFromName}
              valueOfInvoiceFormPhoneNumber={
                invoiceFormDataDirect.billFromPhoneNumber
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
              valueOfInvoiceFormEmail={invoiceFormDataDirect.billToEmail}
              valueOfInvoiceFormText={invoiceFormDataDirect.billToName}
              valueOfInvoiceFormPhoneNumber={
                invoiceFormDataDirect.billToPhoneNumber
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
              valueOfInvoiceFormBankName={invoiceFormDataDirect.bankName}
              valueOfInvoiceFormAccountName={invoiceFormDataDirect.accountName}
              valueOfInvoiceFormBankAccount={invoiceFormDataDirect.bankAccount}
              onHandleChange={handleInputChange}
            />
          </Box>

          {/* InvoiceItems rendering with data gotten from useContext - invoiceFormDataDirect variable. Plus passing the data via to the InvoiceItems component*/}
          <section>
            {invoiceFormDataDirect.itemContainer.map((item, index) => {
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
            })}

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
          <Flex pt="6" gap="2" direction={smallScreenWidth ? "column" : "row"}>
            {/* Disable preview invoice button if the forms haven't been filled */}
            <Box>
              {!showPreviewComponent ? (
                <Button
                  onClick={handlePreviewData}
                  colorScheme="blue"
                  type="submit"
                  width={smallScreenWidth ? "100%" : "auto"}
                  disabled
                >
                  {" "}
                  <Link disabled> Preview Invoice</Link>
                </Button>
              ) : (
                <Button
                  onClick={handlePreviewData}
                  colorScheme="blue"
                  type="submit"
                  width={smallScreenWidth ? "100%" : "auto"}
                >
                  {" "}
                  {showPreviewComponent && (
                    <Link to="/form-preview"> Preview Invoice</Link>
                  )}
                </Button>
              )}
            </Box>
            <Box>
              {/* Eventually this should show only the submit */}
              <Button
                onClick={handleInvoiceSubmit}
                colorScheme="blue"
                width={smallScreenWidth ? "100%" : "auto"}
              >
                Save to Invoice History
              </Button>
            </Box>
            <Box>
              {/* View all invoice */}
              <Button
                colorScheme="blue"
                width={smallScreenWidth ? "100%" : "auto"}
              >
                <Link to="/invoice-history">View all Invoice</Link>
              </Button>
            </Box>
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
};

export default InvoiceApp;
