import { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiCheckCircle,
  FiMessageSquare,
  FiPhoneCall,
  FiShield,
} from "react-icons/fi";
import { whatsappApi, extractErrorMessage } from "../../lib/apiClient";

const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID;
const META_CONFIG_ID = process.env.NEXT_PUBLIC_META_CONFIG_ID;
const GRAPH_VERSION = process.env.NEXT_PUBLIC_META_GRAPH_API_VERSION || "v22.0";

function isValidMetaId(value) {
  return Boolean(
    value &&
    !/[<>]/.test(value) &&
    !/(change_me|your real|example)/i.test(value),
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

export default function WhatsAppConnectCard({ account, onAccountChanged }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("SMS");
  const [verificationStep, setVerificationStep] = useState("method");
  const [code, setCode] = useState("");
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [verifiedLocally, setVerifiedLocally] = useState(false);
  const signupDataRef = useRef({ wabaId: null, phoneNumberId: null });
  const cardBackground = useColorModeValue("white", "gray.800");
  const cardText = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.200");
  const verificationBackground = useColorModeValue("gray.50", "whiteAlpha.50");
  const optionBackground = useColorModeValue("white", "gray.800");
  const selectedOptionBackground = useColorModeValue(
    "green.50",
    "whiteAlpha.100",
  );

  const isConnected = Boolean(account?.wabaId);
  const canVerifyPhone = isConnected && Boolean(account?.phoneNumberId);
  const isPhoneVerified =
    account?.phoneNumberVerified === true || verifiedLocally;
  const isConfigured =
    isValidMetaId(META_APP_ID) && isValidMetaId(META_CONFIG_ID);

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

  useEffect(() => {
    setVerifiedLocally(false);
    setVerificationStep("method");
    setVerificationError("");
    setCode("");
  }, [account?.phoneNumberId]);

  const handleEmbeddedSignupResponse = async (response) => {
    try {
      const code = response?.authResponse?.code;

      if (!code) {
        setError("WhatsApp connection was cancelled or did not complete.");
        return;
      }

      const { wabaId, phoneNumberId } = signupDataRef.current;

      if (!wabaId || !phoneNumberId) {
        setError(
          "Could not read the WhatsApp Business Account details from Meta. Please try again.",
        );
        return;
      }

      const { data } = await whatsappApi.exchangeEmbeddedSignupCode({
        code,
        wabaId,
        phoneNumberId,
      });

      onAccountChanged?.(data.account);
    } catch (err) {
      setError(
        extractErrorMessage(err, "Could not complete the WhatsApp connection."),
      );
    } finally {
      setIsConnecting(false);
    }
  };
  const handleConnect = async () => {
    setError("");

    if (window.location.protocol !== "https:") {
      setError(
        "Meta requires HTTPS for WhatsApp signup. Open the app using HTTPS and try again.",
      );
      return;
    }

    if (!isConfigured) {
      setError(
        "WhatsApp Embedded Signup is not configured. Set the Meta App ID and Configuration ID, then restart the frontend.",
      );
      return;
    }

    setIsConnecting(true);

    try {
      const FB = await loadFacebookSdk();

      FB.login(
        function onFacebookLogin(response) {
          void handleEmbeddedSignupResponse(response);
        },
        {
          config_id: META_CONFIG_ID,
          response_type: "code",
          override_default_response_type: true,
          extras: {
            setup: {},
            featureType: "",
            sessionInfoVersion: "3",
          },
        },
      );
    } catch (err) {
      setError(
        extractErrorMessage(err, "Could not start the WhatsApp connection."),
      );
      setIsConnecting(false);
    }
  };

  const requestVerificationCode = async () => {
    setVerificationError("");
    setIsRequestingCode(true);

    try {
      const { data } = await whatsappApi.requestPhoneVerificationCode({
        code_method: verificationMethod,
        language: "en",
      });
      setVerificationMethod(
        String(data?.codeMethod || verificationMethod).toUpperCase(),
      );
      setCode("");
      setVerificationStep("code");
    } catch (err) {
      setVerificationError(
        extractErrorMessage(err, "Unable to request a verification code."),
      );
    } finally {
      setIsRequestingCode(false);
    }
  };

  const verifyPhoneCode = async () => {
    if (code.length !== 6) return;

    setVerificationError("");
    setIsVerifyingCode(true);

    try {
      await whatsappApi.verifyPhoneVerificationCode({ code });
      setVerifiedLocally(true);
    } catch (err) {
      setVerificationError(
        extractErrorMessage(err, "The verification code was rejected."),
      );
      return;
    } finally {
      setIsVerifyingCode(false);
    }

    try {
      await onAccountChanged?.();
    } catch (_err) {
      // Verification succeeded; the persisted status will refresh on the next load.
    }
  };

  const changeVerificationMethod = () => {
    setVerificationError("");
    setCode("");
    setVerificationStep("method");
  };

  return (
    <Box
      bg={cardBackground}
      color={cardText}
      borderRadius="2xl"
      boxShadow="md"
      border="1px solid"
      borderColor={cardBorder}
      p={{ base: 5, md: 7 }}
    >
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
        <Stack spacing={6}>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
            <Stat>
              <StatLabel color={mutedText}>Status</StatLabel>
              <StatNumber fontSize="lg">
                <Badge colorScheme="green">Connected</Badge>
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel color={mutedText}>Phone Number</StatLabel>
              <StatNumber fontSize="lg">
                {account?.displayPhoneNumber || "—"}
              </StatNumber>
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
                {account?.phoneNumberId || "—"}
              </StatNumber>
            </Stat>
          </SimpleGrid>

          {canVerifyPhone ? (
            <>
              <Divider borderColor={cardBorder} />
              <Box
                bg={verificationBackground}
                border="1px solid"
                borderColor={isPhoneVerified ? "green.200" : cardBorder}
                borderRadius="lg"
                p={{ base: 4, md: 5 }}
              >
                {isPhoneVerified ? (
                  <HStack align="flex-start" spacing={3}>
                    <Icon
                      as={FiCheckCircle}
                      color="green.500"
                      boxSize={6}
                      mt={0.5}
                    />
                    <Box>
                      <HStack spacing={2} mb={1}>
                        <Heading size="sm">Phone number verified</Heading>
                        <Badge colorScheme="green">Verified</Badge>
                      </HStack>
                      <Text color={mutedText} fontSize="sm">
                        Your WhatsApp phone number is registered and ready to
                        use.
                      </Text>
                    </Box>
                  </HStack>
                ) : (
                  <Stack spacing={5}>
                    <HStack align="flex-start" spacing={3}>
                      <Icon
                        as={FiShield}
                        color="primary.500"
                        boxSize={6}
                        mt={0.5}
                      />
                      <Box>
                        <Heading size="sm" mb={1}>
                          Verify your phone number
                        </Heading>
                        <Text color={mutedText} fontSize="sm">
                          Meta will send a six-digit code to{" "}
                          {account?.displayPhoneNumber ||
                            "your connected number"}
                          .
                        </Text>
                      </Box>
                    </HStack>

                    {verificationError ? (
                      <Alert status="error" borderRadius="md" fontSize="sm">
                        <AlertIcon />
                        {verificationError}
                      </Alert>
                    ) : null}

                    {verificationStep === "method" ? (
                      <FormControl as="fieldset">
                        <FormLabel as="legend" fontSize="sm" fontWeight="600">
                          How should we send your code?
                        </FormLabel>
                        <RadioGroup
                          value={verificationMethod}
                          onChange={setVerificationMethod}
                        >
                          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                            {[
                              {
                                value: "SMS",
                                label: "Text message",
                                icon: FiMessageSquare,
                              },
                              {
                                value: "VOICE",
                                label: "Voice call",
                                icon: FiPhoneCall,
                              },
                            ].map((option) => {
                              const selected =
                                verificationMethod === option.value;
                              return (
                                <Box
                                  as="label"
                                  key={option.value}
                                  bg={
                                    selected
                                      ? selectedOptionBackground
                                      : optionBackground
                                  }
                                  border="1px solid"
                                  borderColor={
                                    selected ? "green.400" : cardBorder
                                  }
                                  borderRadius="md"
                                  cursor="pointer"
                                  p={3}
                                >
                                  <HStack spacing={3}>
                                    <Radio
                                      value={option.value}
                                      colorScheme="green"
                                    />
                                    <Icon
                                      as={option.icon}
                                      color={selected ? "green.500" : mutedText}
                                    />
                                    <Text fontWeight="600" fontSize="sm">
                                      {option.label}
                                    </Text>
                                  </HStack>
                                </Box>
                              );
                            })}
                          </SimpleGrid>
                        </RadioGroup>
                        <Button
                          mt={4}
                          colorScheme="green"
                          onClick={requestVerificationCode}
                          isLoading={isRequestingCode}
                          loadingText="Sending code"
                        >
                          Send verification code
                        </Button>
                      </FormControl>
                    ) : (
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="600">
                          Enter verification code
                        </FormLabel>
                        <Input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          value={code}
                          onChange={(event) =>
                            setCode(
                              event.target.value.replace(/\D/g, "").slice(0, 6),
                            )
                          }
                          placeholder="000000"
                          bg={optionBackground}
                          maxW="240px"
                          fontSize="xl"
                          letterSpacing="0"
                          textAlign="center"
                        />
                        <FormHelperText color={mutedText}>
                          Code sent by{" "}
                          {verificationMethod === "VOICE"
                            ? "voice call"
                            : "text message"}
                          .
                        </FormHelperText>
                        <HStack mt={4} spacing={3} flexWrap="wrap">
                          <Button
                            colorScheme="green"
                            onClick={verifyPhoneCode}
                            isLoading={isVerifyingCode}
                            loadingText="Verifying"
                            isDisabled={code.length !== 6 || isRequestingCode}
                          >
                            Verify phone number
                          </Button>
                          <Button
                            variant="outline"
                            onClick={requestVerificationCode}
                            isLoading={isRequestingCode}
                            isDisabled={isVerifyingCode}
                          >
                            Resend code
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={changeVerificationMethod}
                            isDisabled={isRequestingCode || isVerifyingCode}
                          >
                            Change method
                          </Button>
                        </HStack>
                      </FormControl>
                    )}
                  </Stack>
                )}
              </Box>
            </>
          ) : null}
        </Stack>
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
