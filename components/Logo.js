import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box  bgColor="white" {...props}>
      <Image
         objectFit="contain"
        src="BizportSolutions.png"
        alt="BizportSolutions"
      /> 
    </Box>
  );
}
