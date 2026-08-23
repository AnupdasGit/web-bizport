import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Stack,
  Container,
  Heading,
  Image,
  Link,
  Wrap,
  Divider,
  WrapItem,
  Center,
  SimpleGrid,
  VStack,
  Icon,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

function Feature({ title, text, ...rest }) {
  return (
    <HStack align={"top"}>
      <Box color={"green.400"} px={2}>
        <Icon as={CheckIcon} />
      </Box>
      <VStack align={"start"}>
        <Text fontWeight={600}>{title}</Text>
        <Text color={useColorModeValue("gray.600", "gray.300")}>{text}</Text>
      </VStack>
    </HStack>
  );
}
function WebpageDevelopment() {
  return (
    <Container maxW="container.xl" p={5} id="webpageDevelopment" centerContent>
      <Center h="100px" p={5}>
        <Heading>E-Retail Development</Heading>
      </Center>
      <Center>
        <Image
          transform="scale(1.0)"
          src="ERetail.jpg"
          alt="some text"
          objectFit="contain"
          width="400px"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Center>
      <Box p={4}>
        <Divider pt={9} />
        <Text>
          E-Retail has completely revolutionized the process of online shopping
          and has transformed the way consumers purchase their goods and
          services online. It helps buyers, sellers and end users to connect to
          each other irrespective of their geographical presence and offers the
          right platform to endorse your goods and services online.
        </Text>
        <Text>
          Bizport Solutions provides e-retail web development services to the
          clients with the best software and development plans for their unique
          requirements. We have a dedicated team of expert consultants,
          developers and project managers to ensure that our customers not only
          receive a successful development process but also a collaborative
          strategic partner.
        </Text>
        <Stack align="center" justify="space-between"   p={2}>
          <Text fontWeight={800}>
            Our E-Retail Development Portfolio and Capability includes :
          </Text>
        </Stack>
        <Box>
          <Container maxW={"6xl"} mt={5} p={2}>
            <Feature title="Maintenance and Support" />
            <Feature title="Configuration and Installation of Shopping Cart Software E-Retail Shopping Cart Development" />
            <Feature title="E-Retail Shopping Cart Development Adding Functionality or Extending the Capability of an Existing Online Store" />
            <Feature title="Adding Functionality or Extending the Capability of an Existing Online Store Custom E-Retail Website Development" />
            <Feature title="Custom E-Retail Website Development" />
          </Container>
        </Box>
      </Box>
    </Container>
  );
}
export default WebpageDevelopment;
