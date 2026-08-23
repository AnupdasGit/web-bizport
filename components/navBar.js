import React from "react";
import NextLink from "next/link";

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

import Logo from "./Logo";
import DarkMode from "./ToggleDarkmode";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeToggle = () => setIsOpen(false);
  return (
    <NavBarContainer>
      <Logo w="150px" justify={{ base: "center", md: "start" }} />
      <MenuLinks toggle={toggle} closeToggle={closeToggle} isOpen={isOpen} />
      <Flex order={{ base: 2, md: 3 }} align="center" gap={2}>
        <DarkMode />
        <MenuToggle toggle={toggle} closeToggle={closeToggle} isOpen={isOpen} />
      </Flex>
    </NavBarContainer>
  );
};
const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="currentColor"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);
const MenuToggle = ({ toggle, closeToggle, isOpen }) => {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      color="white"
      onMouseOut={closeToggle}
      onClose={closeToggle}
      onClick={toggle}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};
const MenuItem = ({ children, closeToggle, to = "/", ...rest }) => {
  return (
    <NextLink href={to} passHref legacyBehavior>
      <Link
        onClick={closeToggle}
        px={4}
        py={2}
        borderRadius="lg"
        fontWeight="600"
        fontSize="sm"
        color="white"
        _hover={{ bg: "whiteAlpha.300", textDecoration: "none" }}
        {...rest}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const MenuLinks = ({ isOpen, closeToggle }) => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      flexBasis={{ base: "100%", md: "auto" }}
      order={{ base: 3, md: 2 }}
      ml={{ md: "auto" }}
    >
      <Stack
        spacing={2}
        align="center"
        py={{ base: 4, md: 0 }}
        direction={["column", "row", "row", "row"]}
      >
        <MenuItem to="/#homepage" closeToggle={closeToggle}>
          HOME
        </MenuItem>
        <MenuItem to="/#aboutpage" closeToggle={closeToggle}>
          ABOUT
        </MenuItem>
        <MenuItem to="/#contactus" closeToggle={closeToggle}>
          CONTACT US
        </MenuItem>

        {isAuthenticated ? (
          <>
            <MenuItem to="/dashboard" closeToggle={closeToggle}>
              DASHBOARD
            </MenuItem>
            <Button
              size="sm"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.600"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={() => {
                closeToggle?.();
                logout();
              }}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <MenuItem to="/login" closeToggle={closeToggle}>
              LOGIN
            </MenuItem>
            <NextLink href="/register" passHref legacyBehavior>
              <Button
                as="a"
                size="sm"
                bg="accent.500"
                color="white"
                _hover={{ bg: "accent.600" }}
                onClick={closeToggle}
              >
                Sign Up
              </Button>
            </NextLink>
          </>
        )}

        <Box p="2" display={{ base: "block", md: "none", xl: "block" }}>
          <Link
            href="tel:+91 8605575578"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontWeight="bold" fontSize="sm" color="white">
              <Icon as={PhoneIcon} mr={1} />
              +91 860 557 5578
            </Text>
          </Link>
          <Link
            href="mailto:anupdas@bizportsolutions.com"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontWeight="bold" fontSize="sm" color="white">
              <Icon as={EmailIcon} mr={1} />
              anupdas@bizportsolutions.com
            </Text>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};
const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      position="sticky"
      zIndex="999"
      overflow="auto"
      top="0"
      shadow="md"
      align="center"
      justify="space-between"
      wrap="wrap"
      gap={3}
      px={{ base: 4, md: 8 }}
      py={3}
      bgGradient="linear(to-r, primary.600, primary.500)"
      color="white"
      {...props}
    >
      {children}
    </Flex>
  );
};
export default NavBar;
