import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import errorImg from "../assets/error-img.svg";

const Error = () => {
  const smallScreenWidth = window.innerWidth < 700;
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Image
        src={errorImg}
        width={smallScreenWidth ? "100%" : "80%"}
        height="400px"
      />

      <Box
        color="blue.900"
        fontWeight="bold"
        textAlign="center"
        display="flex"
        justifyContent="center"
      >
        <Text
          fontSize={smallScreenWidth ? "md" : "2xl"}
          width={smallScreenWidth ? "100%" : "50%"}
        >
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place? Let's go{" "}
          <Link to="/" className="error-link">
            home
          </Link>{" "}
          and try from there.
        </Text>
      </Box>
    </Flex>
  );
};

export default Error;
