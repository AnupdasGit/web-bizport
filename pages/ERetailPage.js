import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";

 
const ERetail = () => {
  return (
    <Container id="ERetail" maxW={"7xl"} p="12"> 
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", lg:"row", sm: "column" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src="RetailPoints.jpg"
                alt="RetailPoints"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box 
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
           <Heading marginTop="1"> 
              What Is Retail Click? 
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          > 
            Retailing has now become a science of selling smartly. To make this
            science happen in your shop, adapt to new challenges of fashion,
            control overstocking, satisfy customers by giving complete range of
            stock with good schemes and value added service, use RETAIL-CLICK!
           <br/> "RETAIL-CLICK"’ is a software for Retail Management. This software
            takes complete care of inventory system of Retail shops where every
            item can be barcoded piece to piece. It is being used by more than
            500 retail outlets across India.
          </Text>
         </Box>
      </Box>
      <Divider marginTop="5" />
    </Container>
  );
};

export default ERetail;
