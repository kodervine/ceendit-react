import React from "react";
import { Box, keyframes } from "@chakra-ui/react";
import "@/App.css";

const spin = keyframes`from {transform: rotate(0deg) to {transform: rotate(360deg)}`;

const Loading = () => {
  const spinAnimation = `${spin} infinite 2s linear`;

  return (
    <section className="section">
      <Box className="loader">
        <span style={{ "--i": 1 }}></span>
        <span style={{ "--i": 2 }}></span>
        <span style={{ "--i": 3 }}></span>
        <span style={{ "--i": 4 }}></span>
        <span style={{ "--i": 5 }}></span>
        <span style={{ "--i": 6 }}></span>
        <span style={{ "--i": 7 }}></span>
        <span style={{ "--i": 8 }}></span>
        <span style={{ "--i": 9 }}></span>
        <span style={{ "--i": 10 }}></span>
        <span style={{ "--i": 11 }}></span>
        <span style={{ "--i": 12 }}></span>
        <span style={{ "--i": 13 }}></span>
        <span style={{ "--i": 14 }}></span>
        <span style={{ "--i": 15 }}></span>
        <span style={{ "--i": 16 }}></span>
        <span style={{ "--i": 17 }}></span>
        <span style={{ "--i": 18 }}></span>
        <span style={{ "--i": 19 }}></span>
        <span style={{ "--i": 20 }}></span>
      </Box>
    </section>
  );
};

export default Loading;
