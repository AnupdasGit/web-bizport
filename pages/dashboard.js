import { useEffect, useState } from "react";
import Head from "next/head";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import AccountDetailsCard from "../components/dashboard/AccountDetailsCard";
import WhatsAppConnectCard from "../components/dashboard/WhatsAppConnectCard";
import MessagesLogCard from "../components/dashboard/MessagesLogCard";
import WhatsAppApiKeyPage from "./whatsapp-api-key";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, account, company, logout, refreshMe } =
    useAuth();
  const [reportOutput, setReportOutput] = useState(null);
  const [isTestingReport, setIsTestingReport] = useState(false);
  const pageBackground = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const outputBackground = useColorModeValue("gray.900", "blackAlpha.500");

  const testOnlineReport = async () => {
    setIsTestingReport(true);
    setReportOutput(null);
    try {
      const response = await fetch("/api/test-online-report");
      const body = await response.json();
      setReportOutput({ status: response.status, ok: response.ok, body });
    } catch (error) {
      setReportOutput({
        status: null,
        ok: false,
        body: { message: error.message },
      });
    } finally {
      setIsTestingReport(false);
    }
  };

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
            {/* <Button size="sm" colorScheme="orange" onClick={testOnlineReport} isLoading={isTestingReport}>
              Test report API
            </Button> */}
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          </HStack>
        </HStack>

        <Stack spacing={6}>
          {reportOutput ? (
            <Box>
              <Text
                mb={2}
                fontWeight="600"
                color={reportOutput.ok ? "green.500" : "red.500"}
              >
                Report response
                {reportOutput.status ? ` (HTTP ${reportOutput.status})` : ""}
              </Text>
              <Box
                as="pre"
                bg={outputBackground}
                color="gray.100"
                borderRadius="md"
                p={4}
                overflowX="auto"
                maxH="360px"
                fontSize="sm"
                whiteSpace="pre-wrap"
              >
                {JSON.stringify(reportOutput.body, null, 2)}
              </Box>
            </Box>
          ) : null}
          <AccountDetailsCard account={account} company={company} />
          <WhatsAppConnectCard
            account={account}
            onConnected={() => refreshMe()}
          />
          <WhatsAppApiKeyPage
            companyCId={account?.companyCId ?? company?.cId}
            confirmWord={account?.companyName || company?.dbcompanyname}
            apiKeyHash={account?.apiKeyHash}
            apiKeyRotatedAt={account?.apiKeyRotatedAt}
            embedded
          />
          <MessagesLogCard />
        </Stack>
      </Container>
    </Box>
  );
}
