import { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  Alert,
  AlertIcon,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappApi, extractErrorMessage } from "../../lib/apiClient";

const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID;
const META_CONFIG_ID = process.env.NEXT_PUBLIC_META_CONFIG_ID;
const GRAPH_VERSION = process.env.NEXT_PUBLIC_META_GRAPH_API_VERSION || "v22.0";

function isValidMetaId(value) {
  return Boolean(
    value &&
      !/[<>]/.test(value) &&
      !/(change_me|your real|example)/i.test(value)
  );
}

function loadFacebookSdk() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if (window.FB) return resolve(window.FB);

    window.fbAsyncInit = function fbAsyncInit() {
      window.FB.init({
        appId: META_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: GRAPH_VERSION,
      });
      resolve(window.FB);
    };

    const existing = document.getElementById("facebook-jssdk");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onerror = () => reject(new Error("Failed to load the Facebook SDK"));
    document.body.appendChild(script);
  });
}

export default function WhatsAppConnectCard({ account, onConnected }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const signupDataRef = useRef({ wabaId: null, phoneNumberId: null });
  const cardBackground = useColorModeValue("white", "gray.800");
  const cardText = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.200");

  const isConnected = Boolean(account?.wabaId);
  const isConfigured = isValidMetaId(META_APP_ID) && isValidMetaId(META_CONFIG_ID);

  useEffect(() => {
    function handleMessage(event) {
      if (!event.origin.endsWith("facebook.com")) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === "WA_EMBEDDED_SIGNUP" && data.event === "FINISH") {
          signupDataRef.current = {
            wabaId: data.data?.waba_id || null,
            phoneNumberId: data.data?.phone_number_id || null,
          };
        }
      } catch (_err) {
        // Non-JSON postMessage events from Facebook - ignore.
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleConnect = async () => {
    setError("");
    if (window.location.protocol !== "https:") {
      setError(
        "Meta requires HTTPS for WhatsApp signup. Run npm run dev:https and open https://localhost:3000/dashboard."
      );
      return;
    }
    if (!isConfigured) {
      setError(
        "WhatsApp Embedded Signup isn't configured yet. Add your real Meta App ID and Configuration ID to .env.local, then restart the server."
      );
      return;
    }
    setIsConnecting(true);
    try {
      const FB = await loadFacebookSdk();
      FB.login(
        async (response) => {
          try {
            const code = response?.authResponse?.code;
            if (!code) {
              setError("WhatsApp connection was cancelled or did not complete.");
              setIsConnecting(false);
              return;
            }
            const { wabaId, phoneNumberId } = signupDataRef.current;
            if (!wabaId || !phoneNumberId) {
              setError("Could not read the WhatsApp Business Account details from Meta. Please try again.");
              setIsConnecting(false);
              return;
            }
            const { data } = await whatsappApi.exchangeEmbeddedSignupCode({
              code,
              wabaId,
              phoneNumberId,
            });
            onConnected?.(data.account);
          } catch (err) {
            setError(extractErrorMessage(err, "Could not complete the WhatsApp connection."));
          } finally {
            setIsConnecting(false);
          }
        },
        {
          config_id: META_CONFIG_ID,
          response_type: "code",
          override_default_response_type: true,
          extras: { setup: {}, featureType: "" },
        }
      );
    } catch (err) {
      setError(extractErrorMessage(err, "Could not start the WhatsApp connection."));
      setIsConnecting(false);
    }
  };

  return (
    <Box bg={cardBackground} color={cardText} borderRadius="2xl" boxShadow="md" border="1px solid" borderColor={cardBorder} p={{ base: 5, md: 7 }}>
      <HStack mb={5} spacing={3}>
        <Icon as={FaWhatsapp} color="green.500" boxSize={6} />
        <Heading size="md" color={cardText}>
          WhatsApp Business
        </Heading>
      </HStack>

      {error ? (
        <Alert status="warning" borderRadius="md" mb={4} fontSize="sm">
          <AlertIcon />
          {error}
        </Alert>
      ) : null}

      {isConnected ? (
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
          <Stat>
            <StatLabel color={mutedText}>Status</StatLabel>
            <StatNumber fontSize="lg">
              <Badge colorScheme="green">Connected</Badge>
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={mutedText}>Phone Number</StatLabel>
            <StatNumber fontSize="lg">{account?.displayPhoneNumber || "—"}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={mutedText}>WABA ID</StatLabel>
            <StatNumber fontSize="md" wordBreak="break-all">
              {account?.wabaId}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={mutedText}>Phone Number ID</StatLabel>
            <StatNumber fontSize="md" wordBreak="break-all">
              {account?.phoneNumberId}
            </StatNumber>
          </Stat>
        </SimpleGrid>
      ) : (
        <>
          <Text color={mutedText} mb={5} fontSize="sm">
            Connect your WhatsApp Business Account to start sending automated
            invoices and messages straight from your ERP.
          </Text>
          <Button
            leftIcon={<FaWhatsapp />}
            colorScheme="green"
            size="lg"
            onClick={handleConnect}
            isLoading={isConnecting}
          >
            Connect to WhatsApp
          </Button>
        </>
      )}
    </Box>
  );
}
