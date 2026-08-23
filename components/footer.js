import { React } from "react";
import NextLink from "next/link";

import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { ChevronDownIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { BiMailSend } from "react-icons/bi";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function FooterPage() {
  return (
    <Box
      bg={useColorModeValue("ink.900", "gray.900")}
      color={useColorModeValue("gray.200", "gray.300")}
      justify={"space-between"}
      mt={12}
    >
      <Container as={Stack} justify={"space-between"} maxW={"9xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "4fr 2fr 2fr" }}>
          <Stack align={"flex-start"}>
            <Heading color={useColorModeValue("white", "white")}>
              Address
            </Heading>
            <ListHeader>Flat no.103,Gauri Apartment</ListHeader>
            <ListHeader>Lane no.8, Kamal Park, Dhanori,</ListHeader>
            <ListHeader>Pune-411015</ListHeader>
            <ListHeader>Maharastra</ListHeader>
            <Link
              href="tel:+91 8605575578"
              _hover={{
                textDecoration: "none",
              }}
            >
              <ListHeader>
                {" "}
                <PhoneIcon w={6} h={6} /> +91 860 557 5578
              </ListHeader>
            </Link>
            <Link
              href="mailto:anupdas@bizportsolutions.com"
              _hover={{
                textDecoration: "none",
              }}
            >
              <ListHeader>
                <EmailIcon w={6} h={6} /> anupdas@bizportsolutions.com
              </ListHeader>{" "}
            </Link>
          </Stack>
          <Stack align={"flex-start"} fontWeight="black">
            <Heading color={useColorModeValue("white", "white")}>
              Services
            </Heading>
            <Link href="/#CustomizedPage">Customized Development</Link>
            <Link href="/#mobileAppDevelopment">Mobile App Development</Link>
            <Link href="/#webpageDevelopment">Webpage Development</Link>
          </Stack>
          <Stack align={"flex-start"} fontWeight="black">
            <Heading color={useColorModeValue("white", "white")}>
              Follow Us
            </Heading>
            <Link
              href={
                "https://www.facebook.com/Bizport-Solutions-101544978766504"
              }
            >
              <FaFacebook size="25" />
            </Link>
            <Link href={"https://twitter.com/BizportS"}>
              <FaTwitter size="25" />
            </Link>
            <Link href={"https://www.instagram.com/bizportsolutions/"}>
              <FaInstagram size="25" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/bizport-solutions-573228211/"}
            >
              <FaLinkedin size="25" />
            </Link>
            <Link href="https://wa.me/918605575578">
              <FaWhatsapp size="25" />
            </Link>
            <Link href="mailto:anupdas@bizportsolutions.com">
              <BiMailSend size="25" />
            </Link>
          </Stack>
        </SimpleGrid>
        <Stack align={"flex-end"}>
          <Stack spacing={6}>
            <Text fontSize={"sm"}>© {new Date().getFullYear()} Bizport Solutions All rights reserved</Text>
            <NextLink href="/privacy-policy" passHref legacyBehavior>
              <Link
                fontSize={"sm"}
                color={useColorModeValue("gray.300", "gray.300")}
                _hover={{ textDecoration: "underline" }}
              >
                Privacy Policy
              </Link>
            </NextLink>
          </Stack>
          <Link href="/#homepage">
            <Button>Top</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
