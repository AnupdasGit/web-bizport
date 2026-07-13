import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { StarIcon, SunIcon } from "@chakra-ui/icons";

export default function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        {colorMode == "dark" ? <StarIcon /> : <SunIcon />}
      </Button>
    </header>
  );
}
