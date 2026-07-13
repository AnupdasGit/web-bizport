import Head from "next/head";
import {
  Box,
  Container,
  Flex,
  Link,
  UnorderedList,
  VStack,
} from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";

function HomePageComponent() {
  return (
    <Container maxW="container.xl" centerContent>
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
        <meta name="theme-color" content="#ffffff"></meta>
        <title>BIZPORT SOLUTIONS </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        id="homepage"
        pt="300px"
        w={"full"}
        h="full"
        backgroundImage="url('/BackgroundHome.jpg')"
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Box h="75px"> </Box>
            <Stack
              direction={useBreakpointValue({
                base: "column",
                md: "row",
                lg: "row",
              })}
            >
              <Link href="#Feature" _hover={{ textDecoration: "none" }}>
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  textDecoration={"none"}
                  _hover={{ bg: "whiteAlpha.500", textDecoration: "none" }}
                >
                  Feature
                </Button>
              </Link>
              <Link href="#aboutpage" _hover={{ textDecoration: "none" }}>
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  textDecoration={"none"}
                  _hover={{ bg: "whiteAlpha.500", textDecoration: "none" }}
                >
                  About Our Work
                </Button>
              </Link>{" "}
              <Link
                href="#mobileAppDevelopment"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  textDecoration={"none"}
                  _hover={{ bg: "whiteAlpha.500", textDecoration: "none" }}
                >
                  Mobile App
                </Button>
              </Link>{" "}
              <Link
                href="#IndustryExpertise"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  textDecoration={"none"}
                  _hover={{ bg: "whiteAlpha.500", textDecoration: "none" }}
                >
                  Industry Expertise
                </Button>
              </Link>{" "}
              <Link href="#ERetail" _hover={{ textDecoration: "none" }}>
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  textDecoration={"none"}
                  _hover={{ bg: "whiteAlpha.500", textDecoration: "none" }}
                >
                  ERetail
                </Button>
              </Link>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Text
        color={useColorModeValue("black", "white")}
        fontWeight={700}
        lineHeight={1.2}
        fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
      >
        WELCOME TO BIZPORT SOLUTIONS
      </Text>
      <Text
        color={useColorModeValue("black", "white")}
        pt={"2.5"}
        fontWeight={20}
        align={"center"}
        lineHeight={1.2}
        fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
      >
        With over {new Date().getFullYear() - 2008} years of experience, we are
        one of the leading solution providers for retail stores
      </Text>
    </Container>
  );
}

export default HomePageComponent;
