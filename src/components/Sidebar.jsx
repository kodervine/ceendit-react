import React from "react";
import { sidebarData } from "../data";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const Sidebar = () => {
  return (
    <Flex direction="column" boxShadow="2xl" paddingLeft="10px">
      {sidebarData.map((menuItems) => {
        const { title, links } = menuItems;
        return (
          <Box key={nanoid()} width="283px">
            <Heading
              as="h3"
              fontSize="12px"
              textTransform="uppercase"
              fontWeight="bold"
              padding="10px 0"
            >
              {title}
            </Heading>
            {links.map((item) => {
              const { name, icon, link } = item;
              return (
                <Flex
                  key={nanoid()}
                  gap="10px"
                  alignItems="center"
                  paddingBottom="5px"
                >
                  {icon}
                  <Text cursor="pointer">
                    {" "}
                    <Link to={link}>{name}</Link>
                  </Text>
                </Flex>
              );
            })}
          </Box>
        );
      })}
    </Flex>
  );
};

export default Sidebar;
