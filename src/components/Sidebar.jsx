import React from "react";
import { sidebarData } from "../data";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { nanoid } from "nanoid";

const Sidebar = () => {
  return (
    <aside className="aside-container">
      {sidebarData.map((menuItems) => {
        const { title, links } = menuItems;
        return (
          <Box key={nanoid()} width="283px" background="blue.50">
            <Heading
              as="h3"
              fontSize="12px"
              textTransform="uppercase"
              fontWeight="bold"
              padding="10px 30px"
            >
              {title}
            </Heading>
            {links.map((item) => {
              const { name, icon, arrow } = item;
              return (
                <Flex
                  key={nanoid}
                  gap="10px"
                  alignItems="center"
                  paddingBottom="5px"
                >
                  {icon}
                  <Text cursor="pointer">{name}</Text>
                  <Text>{arrow}</Text>
                </Flex>
              );
            })}
          </Box>
        );
      })}
    </aside>
  );
};

export default Sidebar;
