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
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import Nav from "@/components/homepage/Nav";
import Sidebar from "@/components/homepage/Sidebar";
import { useGlobalContext } from "@/context/AppContext";

const InvoiceHistoryPage = () => {
  // For drawer component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const smallScreenWidth = window.innerWidth < 700;
  const { colorMode } = useColorMode();

  // from AppContext
  const { invoiceFormState, userInitState, handlePrint, handleDeleteInvoice } =
    useGlobalContext();

  return (
    <Box>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />

      <Flex>
        {!smallScreenWidth && <Sidebar />}
        {/* Data from context.jsx. Basically, array of the invoiceData field in firebase */}
        <Box width="100%">
          {invoiceFormState.allInvoiceData.map((invoiceFirestore, index) => {
            return (
              <Stack
                key={nanoid()}
                width={{ base: "100%", md: "90%", lg: "90%" }}
                maxW="960px"
                m="auto"
                mb="6"
                p="6"
                boxShadow="dark-lg"
                rounded="md"
                ref={handlePrint}
                // ref={EachDownloadRef.current[index]}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Image src={logo} />
                  <Box>
                    <Text fontWeight="bold">Invoice No 0000{index}</Text>
                  </Box>
                </Flex>

                {/* Date */}
                <Box>
                  <Heading size="md">{invoiceFirestore.billFromName}</Heading>
                  <Text>{invoiceFirestore.billFromPhoneNumber}</Text>
                  <Text>{invoiceFirestore.billFromEmail}</Text>
                </Box>

                {/* Invoice date and due date */}
                <Flex>
                  <Box>
                    <Heading size="sm">Invoice date</Heading>
                    <Text>{invoiceFirestore.dateCreated}</Text>
                  </Box>
                  <Spacer />
                  <Box>
                    <Heading size="sm">Due date</Heading>
                    <Text>{invoiceFirestore.dateDue}</Text>
                  </Box>
                </Flex>

                {/* Billed to */}
                <Box>
                  <Heading size="sm">Billed to</Heading>
                  <Text>{invoiceFirestore.billToName}</Text>
                  <Text>{invoiceFirestore.billToPhoneNumber}</Text>
                  <Text>{invoiceFirestore.billToEmail}</Text>
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
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                        >
                          Account Number
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>{invoiceFirestore.bankName}</Td>
                        <Td>{invoiceFirestore.accountName}</Td>
                        <Td isNumeric>{invoiceFirestore.bankAccount}</Td>
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
                          Item Details
                        </Th>
                        <Th
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                        >
                          Qty
                        </Th>
                        <Th
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                          textAlign="center"
                        >
                          Item Price
                        </Th>
                        <Th
                          isNumeric
                          color={colorMode === "light" ? "auto" : "blue.900"}
                        >
                          Items Total
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {invoiceFirestore.itemContainer.map((item, index) => {
                        return (
                          <Tr key={nanoid()}>
                            <Td>{item.itemContent}</Td>
                            <Td isNumeric textAlign="center">
                              {item.itemQty}
                            </Td>
                            <Td textAlign="center">{item.itemPrice}</Td>
                            <Td isNumeric>
                              #
                              {parseInt(item.itemQty * item.itemPrice)
                                .toLocaleString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>

                {/* Invoice actions */}
                <Flex direction={smallScreenWidth ? "column" : "row"}>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => handlePrint(invoiceFirestore, index)}
                      >
                        Download
                      </MenuItem>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>
                        {" "}
                        <Link
                          to={`/invoices/${userInitState.currentUser.displayName}/${index}`}
                        >
                          Share invoice
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDeleteInvoice(index);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Stack>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default InvoiceHistoryPage;
