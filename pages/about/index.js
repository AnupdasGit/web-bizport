import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align={"center"}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={useColorModeValue("gray.100", "gray.700")}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text  >{text}</Text>
    </Stack>
  );
};

export default function AboutPage() {
  return (
    <Container maxW="container.xl" centerContent>
      <Box p={4} id="aboutpage">
        <Box w="100%" height="50px" p={4} color="white"></Box>
        <Stack align="center" justify="space-between" h="100px" p={4}>
          <Heading>Our Team</Heading>
        </Stack> 
        <Text>
            Assisted by a pool of experienced personnel, our performance is
            proved through the quality we deliver. A combination of contemporary
            technology and experienced personnel ensures unparalleled quality
            and value in our quality deliverance. Our team is the very backbone
            of our enterprise, which is why we are always in strong position to
            meet with all the demands of the clients and industry. We are backed
            by expert professionals, which are exceptionally knowledgeable and
            experts in there respective domains. All our professionals work in
            close co-ordination with one another, which helps us to grow &
            develop and at the same time and scale newer heights of success together.
          </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}> 
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Tell Us What You Need"}
            text={
              "Our engineers develop new features using the latest  technology to deliver a user-friendly, robust product."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Our Moto"}
            text={
              "The purpose of a business is to create a customer who creates customers"
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Reach Out Anytime"}
            text={
              "We provide both online and telephonic assistance.Thanks to our dedicated support, we have 99% customer retention   and 100% satisfaction. Our account managers and   competent support team promptly respond to requests and   make sure your work never stops"
            }
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
