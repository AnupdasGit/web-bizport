import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CheckCircleIcon } from "@chakra-ui/icons";

function HomePageComponent() {
  const experienceYears = new Date().getFullYear() - 2008;
  const introBackground = useColorModeValue("ink.50", "gray.900");
  const mutedText = useColorModeValue("ink.600", "gray.300");

  return (
    <Box>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#0c6a3f" />
        <title>Bizport Solutions | Retail Software and Development</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        as="section"
        id="homepage"
        position="relative"
        minH={{ base: "620px", md: "680px" }}
        overflow="hidden"
        backgroundImage="url('/BackgroundHome.jpg')"
        backgroundSize="cover"
        backgroundPosition={{ base: "60% center", md: "center center" }}
      >
        <Box
          position="absolute"
          inset={0}
          bgGradient={{
            base: "linear(to-r, blackAlpha.900, blackAlpha.700)",
            md: "linear(to-r, blackAlpha.900 0%, blackAlpha.700 52%, blackAlpha.200 100%)",
          }}
        />
        <Container
          maxW="container.xl"
          position="relative"
          minH={{ base: "620px", md: "680px" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={{ base: 6, md: 10 }}
          py={{ base: 16, md: 20 }}
        >
          <Stack maxW="720px" spacing={7} color="white" mt={{ md: 8 }}>
            <Text fontSize="sm" fontWeight="700" textTransform="uppercase">
              Enterprise-grade retail technology made simple.
            </Text>
            <Heading
              as="h1"
              fontSize={useBreakpointValue({ base: "5xl", md: "7xl" })}
              lineHeight="1.05"
              fontWeight="800"
            >
              Bizport Solutions
            </Heading>
            <Text fontSize={{ base: "lg", md: "2xl" }} lineHeight="1.6" maxW="2xl">
              Practical software, mobile experiences, and retail systems shaped
              around the way your business actually works.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={4} align="stretch">
              <Button
                as="a"
                href="#WhatWeOffer"
                size="lg"
                rightIcon={<ArrowForwardIcon />}
                bg="accent.500"
                color="white"
                _hover={{ bg: "accent.600" }}
              >
                Explore our solutions
              </Button>
              <Button
                as="a"
                href="#contactus"
                size="lg"
                variant="outline"
                color="white"
                borderColor="whiteAlpha.700"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Talk to our team
              </Button>
            </Stack>
            <HStack spacing={6} flexWrap="wrap">
              {["Retail domain expertise", "Custom implementation", "Ongoing support"].map(
                (item) => (
                  <HStack key={item} spacing={2}>
                    <Icon as={CheckCircleIcon} color="primary.200" />
                    <Text fontSize="sm" fontWeight="600">
                      {item}
                    </Text>
                  </HStack>
                )
              )}
            </HStack>
          </Stack>

          <SimpleGrid
            columns={{ base: 3 }}
            maxW="680px"
            mt={10}
            pt={6}
            borderTop="1px solid"
            borderColor="whiteAlpha.400"
            color="white"
          >
            <Box>
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800">
                {experienceYears}+
              </Text>
              <Text fontSize="sm" color="whiteAlpha.800">Years of experience</Text>
            </Box>
            <Box px={{ base: 3, md: 6 }} borderLeft="1px solid" borderColor="whiteAlpha.400">
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800">99%</Text>
              <Text fontSize="sm" color="whiteAlpha.800">Customer retention</Text>
            </Box>
            <Box pl={{ base: 3, md: 6 }} borderLeft="1px solid" borderColor="whiteAlpha.400">
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800">360°</Text>
              <Text fontSize="sm" color="whiteAlpha.800">Implementation support</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg={introBackground}>
        <Container maxW="container.xl" py={{ base: 12, md: 16 }} px={{ base: 6, md: 10 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ md: "flex-end" }}
            gap={6}
          >
            <Heading as="h2" size="xl" maxW="620px" color={useColorModeValue("ink.900", "white")}>
              Technology that fits your operation, not the other way around.
            </Heading>
            <Text maxW="460px" color={mutedText} fontSize="lg" lineHeight="1.7">
              From billing and inventory to tailored web and mobile products,
              we connect the tools your team needs into one dependable workflow.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePageComponent;
