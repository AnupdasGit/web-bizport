import React from "react";
import { Box, Image } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box
      bgColor="white"
      borderRadius="md"
      px={3}
      py={2}
      display="inline-flex"
      alignItems="center"
      {...props}
    >
      <Image objectFit="contain" src="/BizportSolutions.png" alt="BizportSolutions" />
    </Box>
  );
}
