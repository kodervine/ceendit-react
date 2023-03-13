import React from "react";
import { useGlobalContext } from "@/context/AppContext";
import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";

const ClientMenu = (props) => {
  const { handleNavigateUser } = useGlobalContext();
  return (
    <Menu>
      <MenuButton as={Button}>
        <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
      </MenuButton>
      <MenuList>
        <MenuItem>{props.view}</MenuItem>
        <MenuItem onClick={() => handleNavigateUser("client")}>
          {props.moreDetails}
        </MenuItem>
        <MenuItem>{props.delete}</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ClientMenu;
