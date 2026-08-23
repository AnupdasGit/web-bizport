import {
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip label={label} placement="bottom">
      <IconButton
        size="sm"
        aria-label={label}
        icon={isDark ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        bg={useColorModeValue("white", "gray.700")}
        color={useColorModeValue("ink.800", "yellow.300")}
        flexShrink={0}
        boxShadow="sm"
        _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
      />
    </Tooltip>
  );
}
