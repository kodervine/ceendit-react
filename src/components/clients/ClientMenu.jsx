import React from "react";
import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaEllipsisV } from "react-icons/fa";

const ClientMenu = () => {
  return (
    <Menu>
      <MenuButton as={Button}>
        <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
      </MenuButton>
      <MenuList>
        <MenuItem>View Invoices</MenuItem>
        <MenuItem>More details</MenuItem>
        <MenuItem>Delete Client</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ClientMenu;
