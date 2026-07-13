import React from "react";
import Link from "next/link";

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Image,
  useColorModeValue,
  PopoverContent,
  Icon,
  Popover,
  PopoverTrigger,
  Menu,
  useMenuButton,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";

import Logo from "./Logo";
import { ChevronDownIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { FaWhatsapp } from "react-icons/fa";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeToggle = () => setIsOpen(false);
  return (
    <NavBarContainer>
      <Logo w="150px" justify={{ base: "center", md: "start" }} />
      <MenuToggle toggle={toggle} closeToggle={closeToggle} isOpen={isOpen} />
      <MenuLinks  toggle={toggle} closeToggle={closeToggle}  isOpen={isOpen} />
    </NavBarContainer>
  );
};
const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="black"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);
const MenuToggle = ({ toggle, closeToggle, isOpen }) => {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      onMouseOut={closeToggle}
      onClose={closeToggle}
      onClick={toggle}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};
const MenuItem = ({ children, toggle, closeToggle,  isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Button
        boxShadow="0 0 40px 40px #FFFF00 inset, 0 0 0 0 #FFFF00"
        //WebkitTransition="all 150ms ease-in-out"
        transition="all 150ms ease-in-out"
        _hover={{
          boxShadow: "0 0 10px 0 #FFFF00 inset, 0 0 10px 4px #FFFF00",
        }}
        _active={{
          bg: "#dddfe2",
          transform: "scale(0.98)",
          borderColor: "#bec3c9",
        }}
        _focus={{
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
        {...rest}
      >
        {children}
      </Button>
    </Link>
  );
};

const MenuLinks = ({ isOpen , closeToggle }) => {
  return (
    <Box
      // border="solid red 2px"
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={4}
        align="center"
        direction={["column", "row", "row", "row"]}
      >
        <MenuItem to="#homepage" onClick={closeToggle}>HOME</MenuItem>
        <MenuItem to="#aboutpage" onClick={closeToggle}>ABOUT</MenuItem>
        <MenuItem to="#contactus" onClick={closeToggle}>CONTACT US</MenuItem>

        <Box   p="2">
          <Link
            href="tel:+91 8605575578"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              <PhoneIcon w={6} h={6} />
              +91 860 557 5578
            </Text>
          </Link>
          <Link
            href="mailto:anupdas@bizportsolutions.com"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              <EmailIcon w={6} h={6} />
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
      shadow="base"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg={["primary.500", "primary.500"]}
      color={"black "}
      {...props}
    >
      {children}
    </Flex>
  );
};
export default NavBar;
