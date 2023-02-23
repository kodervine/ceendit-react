import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

import { linksData } from "@/data";

const Sidebar = () => {
  const midScreenWidth = window.innerWidth < 1000;
  return (
    <Flex direction="column" boxShadow="2xl" paddingLeft="10px" height="100vh">
      {linksData.map((menuItems) => {
        const { title, linkItems } = menuItems;
        return (
          <Box key={nanoid()} width={midScreenWidth ? "200px" : "283px"}>
            <Heading
              as="h3"
              fontSize="12px"
              textTransform="uppercase"
              fontWeight="bold"
              padding="10px 0"
            >
              {title}
            </Heading>
            {linkItems?.map((item) => {
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
