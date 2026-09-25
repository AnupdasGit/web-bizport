import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  HStack,
  Spinner,
  SimpleGrid,
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiFileText, FiInbox, FiKey, FiSend } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import AccountDetailsCard from "../components/dashboard/AccountDetailsCard";
import WhatsAppConnectCard from "../components/dashboard/WhatsAppConnectCard";

const DASHBOARD_LINKS = [
  {
    href: "/messages",
    label: "Outgoing messages",
    description: "Track delivery and export logs",
    icon: FiSend,
  },
  {
    href: "/inbound-messages",
    label: "Incoming messages",
    description: "View messages sent to your number",
    icon: FiInbox,
  },
  {
    href: "/message-templates",
    label: "Message templates",
    description: "Review and sync Meta templates",
    icon: FiFileText,
  },
  {
    href: "/whatsapp-api-key",
    label: "API key",
    description: "Manage desktop app access",
    icon: FiKey,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, account, company, logout, refreshMe } =
    useAuth();
  const pageBackground = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const panelBackground = useColorModeValue("white", "gray.800");
  const panelBorder = useColorModeValue("gray.100", "whiteAlpha.200");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <Container maxW="container.lg" py={20} centerContent>
        <Spinner color="primary.500" size="lg" />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box bg={pageBackground} minH="60vh" py={{ base: 8, md: 12 }}>
      <Head>
        <title>Dashboard | BIZPORT SOLUTIONS</title>
      </Head>
      <Container maxW="container.lg">
        <HStack
          justify="space-between"
          align="flex-start"
          mb={8}
          flexWrap="wrap"
          spacing={4}
        >
          <Stack spacing={1}>
            <Heading size="lg" color={headingColor}>
              Welcome{account?.name ? `, ${account.name}` : ""}
            </Heading>
            <Text color={mutedText}>
              Here&apos;s an overview of your account and WhatsApp messaging.
            </Text>
          </Stack>
          <HStack spacing={3}>
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          </HStack>
        </HStack>

        <Stack spacing={6}>
          <AccountDetailsCard account={account} company={company} />
          <WhatsAppConnectCard
            account={account}
            onAccountChanged={() => refreshMe()}
          />
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
            {DASHBOARD_LINKS.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                passHref
                legacyBehavior
              >
                <Link
                  bg={panelBackground}
                  border="1px solid"
                  borderColor={panelBorder}
                  borderRadius="lg"
                  p={5}
                  _hover={{
                    borderColor: "primary.400",
                    textDecoration: "none",
                    boxShadow: "sm",
                  }}
                >
                  <HStack align="flex-start" spacing={4}>
                    <Icon
                      as={item.icon}
                      color="primary.500"
                      boxSize={5}
                      mt={1}
                    />
                    <Box>
                      <Text fontWeight="700" color={headingColor}>
                        {item.label}
                      </Text>
                      <Text color={mutedText} fontSize="sm" mt={1}>
                        {item.description}
                      </Text>
                    </Box>
                  </HStack>
                </Link>
              </NextLink>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
