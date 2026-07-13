import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    SimpleGrid,
    Heading,
    Container,
    Icon,
    Flex,
    Divider,
    Link,
    Image,
    HStack,
    VStack,
  } from "@chakra-ui/react";
  import { CheckIcon } from "@chakra-ui/icons";
  import {
    FaBarcode,
      FaBriefcase,
    FaCalculator,
    FaCheckSquare,
    FaCircle,
    FaDotCircle,
    FaHandshake,
    FaLaptop,
    FaPhoneAlt,
    FaRegComments,
    FaRegLightbulb,
    FaShippingFast,
  } from "react-icons/fa";
  import { BsFileEarmarkText } from "react-icons/bs";
  import { BiRefresh, BiShoppingBag } from "react-icons/bi";

function Feature({ text, title, icon, title1, ...rest }) {
    return (
      <Stack align="center" justify="flex-start">
        <Box
          maxW={"250"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          overflow={"hidden"}
        >
          <Stack
            textAlign={"center"}
            p={6}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("green.50", "green.900")}
              p={2}
              px={3}
              color={"green.500"}
              rounded={"full"}
            >
              {title}
            </Text>
            {icon}
            <Text>{text}</Text>
          </Stack>
        </Box>
      </Stack>
    );
  }

export default function WhatWeOffer() {
  return (
    <Container maxW="container.xl" centerContent>
      <Box p={6} id="WhatWeOffer">
        <Stack align="center" justify="space-between"   >
          <Heading>What We Offer</Heading>
        </Stack>
        <SimpleGrid columns={{ base: 1, sm: 1, lg: 2, xl: 3 }} spacing={5}>
          <Feature
            icon={<Icon as={FaCheckSquare} w={10} h={10} />}
            title={"Domain Expertise "}
            text={
              " 10+ years of experience has made us an expert in our domain, helping us serve our clients better."
            }
          />
         
          <Feature
            icon={<Icon as={FaRegLightbulb} w={10} h={10} />}
            title={"Value Creation"}
            text={
              "We believe in creating value with our solutions, in the lives of our clients and their customers."
            }
          />
          <Feature
            icon={<Icon as={BiRefresh} w={10} h={10} />}
            title={"Continuous Training"}
            text={
              "We provide constant training to our clients and their staff till they master the usage of our software."
            }
          /><Feature
          icon={<Icon as={FaPhoneAlt} w={10} h={10} />}
          title={"Telephonic & Online Support"}
          text={
            "We believe in providing flawless support to our clients."
          }
        /><Feature
          icon={<Icon as={FaLaptop} w={10} h={10} />}
          title={"Implementation Oriented"}
          text={
            "We focus heavily on implementing the software to help our clients grow as soon as possible."
          }
        />   <Feature
        icon={<Icon as={FaBriefcase} w={10} h={10} />}
        title={"Unique Business Solutions"}
        text={
          "We understand that building solutions is a big step for many of our clients and so we make every provision to ensure what we do for each client is entirely the best solution for them."
        }
      />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
