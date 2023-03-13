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
        {props.download && (
          <MenuItem onClick={props.handleDownload}>{props.download}</MenuItem>
        )}
        <MenuItem onClick={() => handleNavigateUser(props.navigate)}>
          {props.moreDetails}
        </MenuItem>
        <MenuItem>{props.delete}</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ClientMenu;
