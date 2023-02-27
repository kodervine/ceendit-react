import React from "react";
import { Box, keyframes } from "@chakra-ui/react";
import "@/App.css";

const spin = keyframes`from {transform: rotate(0deg) to {transform: rotate(360deg)}`;

const Loading = () => {
  const spinAnimation = `${spin} infinite 2s linear`;

  return <section className="loader"></section>;
};

export default Loading;
