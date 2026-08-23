import { Box, Heading, Stack } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import React from "react";

const IndexPage = dynamic(() => import("./index copy 2"), { ssr: false });

export default function ContactForm() {
  return (
    <div id="contactus">
      <Box w="100%" height="30px" p={4} color="white"></Box>
      <Stack align="center" justify="space-between">
        <Heading>Contact Us</Heading>
      </Stack>
      <div className="row">
      <Box className="col-md-6  " pt="10">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1oryS2JEslZ2ByybZzh31Q81tVPSZcUaO"
          style={{
            border: "0",
            width: "100%",
            height: "500px",
            frameborder: "0",
          }}
          allowFullScreen
        />
      </Box>
      <IndexPage /></div>
    </div>
  );
}
