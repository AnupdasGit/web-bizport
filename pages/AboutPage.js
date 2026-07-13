 import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Heading,
  Container,
} from "@chakra-ui/react";
 import { FaHandshake, FaRegComments, FaShippingFast } from "react-icons/fa";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align="center" justify="flex-start">
      <Flex
        w={16}
        h={16}
        justifyContent="center"
        align={"center"}
        justify={"center"}
        rounded={"full"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"white.600"}>{text}</Text>
    </Stack>
  );
};

export default function AboutPage() {
  return (
    <Container maxW="container.xl" centerContent>
      <Box p={6} id="aboutpage">
        <Box w="100%" height="50px" p={6} color="white"></Box>
        <Stack align="center" justify="space-between" h="50px">
          <Heading>About</Heading>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
          <Feature
            icon={<Icon as={FaRegComments} w={10} h={10} />}
            title={"Tell Us What You Need"}
            text={
              "Our engineers develop new features using the latest technology to deliver a user-friendly, robust product."
            }
          />
          <Feature
            icon={<Icon as={FaHandshake} w={10} h={10} />}
            title={"Our Moto"}
            text={
              "The purpose of a business is to create a customer who creates customers."
            }
          />
          <Feature
            icon={<Icon as={FaShippingFast} w={10} h={10} />}
            title={"Reach Out Anytime"}
            text={
              "We provide both online and telephonic assistance.Thanks to our dedicated support, we have 99% customer retention and 100% satisfaction. Our account managers and competent support team promptly respond to requests and make sure your work never stops."
            }
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
