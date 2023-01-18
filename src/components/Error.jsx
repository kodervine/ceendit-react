import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Error = () => {
  return (
    <section className="mainbox">
      <Flex>
        <Text class="err" coli>
          4
        </Text>
        <FontAwesomeIcon icon="fa fa-question-circle fa-spin" />
        {/* <FontAwesomeIcon icon="fa-regular fa-circle-question" /> */}
        <Text class="err2">4</Text>
      </Flex>

      <Box>
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <Text>
          Let's go <Link to="/">home</Link> and try from there.
        </Text>
      </Box>
    </section>
  );
};

export default Error;
