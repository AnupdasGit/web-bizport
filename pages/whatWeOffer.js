import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaBriefcase,
  FaCheckSquare,
  FaLaptop,
  FaPhoneAlt,
  FaRegLightbulb,
} from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

const offerings = [
  {
    title: "Domain expertise",
    text: "Deep retail experience helps us understand operational problems quickly and design practical solutions.",
    icon: FaCheckSquare,
    color: "primary.500",
  },
  {
    title: "Value creation",
    text: "Every feature is tied to a measurable improvement for your team, customers, or daily workflow.",
    icon: FaRegLightbulb,
    color: "accent.500",
  },
  {
    title: "Continuous training",
    text: "We train your team through implementation and stay involved until the software feels familiar.",
    icon: BiRefresh,
    color: "blue.500",
  },
  {
    title: "Responsive support",
    text: "Telephonic and online assistance keeps questions from becoming interruptions to your business.",
    icon: FaPhoneAlt,
    color: "red.500",
  },
  {
    title: "Implementation focused",
    text: "We plan adoption as carefully as development, helping your team reach useful outcomes sooner.",
    icon: FaLaptop,
    color: "cyan.500",
  },
  {
    title: "Solutions built around you",
    text: "We shape each system around your processes instead of forcing your business into a generic template.",
    icon: FaBriefcase,
    color: "primary.600",
  },
];

function Offering({ title, text, icon, color }) {
  const cardBackground = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const mutedText = useColorModeValue("ink.600", "gray.300");
  const iconBackground = useColorModeValue("gray.50", "whiteAlpha.100");

  return (
    <Stack
      minH="250px"
      spacing={6}
      p={{ base: 6, md: 7 }}
      bg={cardBackground}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      transition="transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
        borderColor: color,
      }}
    >
      <Flex
        align="center"
        justify="center"
        w={12}
        h={12}
        bg={iconBackground}
        borderRadius="md"
      >
        <Icon as={icon} boxSize={6} color={color} />
      </Flex>
      <Box>
        <Heading as="h3" size="md" mb={3}>
          {title}
        </Heading>
        <Text color={mutedText} lineHeight="1.75">
          {text}
        </Text>
      </Box>
    </Stack>
  );
}

export default function WhatWeOffer() {
  const sectionBackground = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("ink.600", "gray.300");

  return (
    <Box as="section" id="WhatWeOffer" bg={sectionBackground}>
      <Container maxW="container.xl" py={{ base: 14, md: 20 }} px={{ base: 6, md: 10 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ md: "flex-end" }}
          gap={5}
          mb={{ base: 9, md: 12 }}
        >
          <Box>
            <Text color="primary.500" fontWeight="700" fontSize="sm" textTransform="uppercase" mb={3}>
              What we bring
            </Text>
            <Heading as="h2" size="xl" maxW="560px">
              More than software delivery.
            </Heading>
          </Box>
          <Text maxW="440px" color={mutedText} fontSize="lg" lineHeight="1.7">
            A hands-on partnership spanning discovery, implementation, training,
            and dependable support after launch.
          </Text>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {offerings.map((offering) => (
            <Offering key={offering.title} {...offering} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}