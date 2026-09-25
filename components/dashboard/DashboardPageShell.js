import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPageShell({ title, description, children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const pageBackground = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Container maxW="container.lg" py={20} centerContent>
        <Spinner color="primary.500" size="lg" />
      </Container>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Box bg={pageBackground} minH="60vh" py={{ base: 8, md: 12 }}>
      <Head>
        <title>{title} | BIZPORT SOLUTIONS</title>
      </Head>
      <Container maxW="container.xl">
        <HStack justify="space-between" align="flex-start" mb={8} spacing={4}>
          <Stack spacing={1}>
            <Heading size="lg" color={headingColor}>
              {title}
            </Heading>
            <Text color={mutedText}>{description}</Text>
          </Stack>
          <NextLink href="/dashboard" passHref legacyBehavior>
            <Button
              as={Link}
              leftIcon={<FiArrowLeft />}
              variant="outline"
              flexShrink={0}
            >
              Dashboard
            </Button>
          </NextLink>
        </HStack>
        {children}
      </Container>
    </Box>
  );
}
