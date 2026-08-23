import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "../Logo";

/**
 * Shared shell for the login / register / forgot-password / reset-password
 * pages: a centered card on a soft brand-tinted background, with the logo
 * and a title/subtitle above the form.
 */
export default function AuthLayout({ title, subtitle, children }) {
  const pageGradient = useColorModeValue(
    "linear(to-br, primary.50, white, accent.50)",
    "linear(to-br, gray.900, ink.900, gray.900)"
  );
  const panelBackground = useColorModeValue("white", "gray.800");
  const panelText = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const panelBorder = useColorModeValue("gray.100", "whiteAlpha.200");
  const inputBackground = useColorModeValue("white", "gray.900");
  const inputBorder = useColorModeValue("gray.300", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      minH="70vh"
      w="full"
      bgGradient={pageGradient}
      py={{ base: 10, md: 16 }}
      px={4}
    >
      <Container maxW="md">
        <VStack spacing={6} mb={8} textAlign="center">
          <Box w="180px">
            <Logo w="full" />
          </Box>
          <VStack spacing={1}>
            <Heading as="h1" size="lg" color={panelText}>
              {title}
            </Heading>
            {subtitle ? (
              <Text color={mutedText} fontSize="sm" maxW="sm">
                {subtitle}
              </Text>
            ) : null}
          </VStack>
        </VStack>
        <Box
          bg={panelBackground}
          color={panelText}
          borderRadius="2xl"
          boxShadow="xl"
          border="1px solid"
          borderColor={panelBorder}
          p={{ base: 6, md: 8 }}
          sx={{
            "& label": { color: panelText },
            "& input, & select, & textarea": {
              color: panelText,
              backgroundColor: inputBackground,
              borderColor: inputBorder,
            },
            "& input::placeholder, & textarea::placeholder": {
              color: placeholderColor,
              opacity: 1,
            },
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
