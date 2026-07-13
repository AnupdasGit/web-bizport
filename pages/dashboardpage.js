import Head from "next/head";
import {
  Text,
  Button,
  Stack,
  Flex,
  VStack,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Flex
        w={"full"}
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
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              WELCOME TO BIZPORT SOLUTIONS
            </Text>
            <Text
              color={"yellow"}
              fontWeight={20}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
             
              WITH OVER 10 YEARS OF EXPERIENCE, WE ARE ONE OF THE LEADING
              SOLUTION PROVIDERS FOR RETAIL SOLUTIONS.
            </Text>
            <Stack
              direction={useBreakpointValue({
                base: "column",
                md: "row",
                lg: "row",
              })}
            >
              <Link href="#homepage" _hover={{ textDecoration: "none" }}>
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  textDecoration={"none"}
                  _hover={{ bg: "whiteAlpha.500", textDecoration: "none" }}
                >
                  Our Products
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
    </>
  );
}
