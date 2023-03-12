import React from "react";
import { useGlobalContext } from "@/context/AppContext";
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
import { FaEllipsisV } from "react-icons/fa";

const ClientMenu = () => {
  const { handleNavigateUser } = useGlobalContext();
  return (
    <Menu>
      <MenuButton as={Button}>
        <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
      </MenuButton>
      <MenuList>
        <MenuItem>View Invoices</MenuItem>
        <MenuItem onClick={() => handleNavigateUser("client")}>
          More details
        </MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ClientMenu;
