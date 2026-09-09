import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  FaCheck,
  FaCopy,
  FaExclamationTriangle,
  FaKey,
  FaRedo,
  FaTrashAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { extractErrorMessage, whatsappApi } from "../lib/apiClient";

function formatGeneratedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  return `Generated on ${datePart} at ${timePart}`;
}

export default function WhatsAppApiKeyPage({
  companyCId,
  confirmWord,
  apiKeyHash,
  apiKeyRotatedAt,
  embedded = false,
}) {
  const { company } = useAuth();
  const toast = useToast();
  const confirmationModal = useDisclosure();
  const revealModal = useDisclosure();
  const revokeModal = useDisclosure();
  const discardWarningModal = useDisclosure();
  const [hasKey, setHasKey] = useState(Boolean(apiKeyHash));
  const [rotatedAt, setRotatedAt] = useState(apiKeyRotatedAt || null);
  const [pendingAction, setPendingAction] = useState("generate");
  const [loadingAction, setLoadingAction] = useState(null);
  const [revealedKey, setRevealedKey] = useState("");
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revokeConfirmed, setRevokeConfirmed] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [acknowledgesInvalidation, setAcknowledgesInvalidation] =
    useState(false);
  const [confirmationWord, setConfirmationWord] = useState("");
  const pageBackground = useColorModeValue("gray.50", "gray.900");
  const cardBackground = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const mutedText = useColorModeValue("ink.500", "gray.300");

  const effectiveCompanyId = companyCId ?? company?.cId;
  const expectedConfirmWord =
    confirmWord || company?.dbcompanyname || "CONFIRM";
  const isConfirmationValid =
    acknowledgesInvalidation && confirmationWord === expectedConfirmWord;

  useEffect(() => {
    setHasKey(Boolean(apiKeyHash));
    setRotatedAt(apiKeyRotatedAt || null);
  }, [apiKeyHash, apiKeyRotatedAt]);

  useEffect(() => {
    if (!cooldownActive) return undefined;

    const intervalId = window.setInterval(() => {
      setCooldownSeconds((current) => {
        if (current <= 1) {
          setCooldownActive(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [cooldownActive]);

  useEffect(() => {
    if (!copied) return undefined;
    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const startCooldown = () => {
    setCooldownSeconds(30);
    setCooldownActive(true);
  };

  const openConfirmation = (action) => {
    setPendingAction(action);
    setAcknowledgesInvalidation(false);
    setConfirmationWord("");
    confirmationModal.onOpen();
  };

  const showErrorToast = (action, error) => {
    toast({
      title: `Failed to ${action} key`,
      description: extractErrorMessage(error),
      status: "error",
      duration: 6000,
      isClosable: true,
    });
  };

  const submitGenerateOrRotate = async () => {
    setLoadingAction(pendingAction);
    try {
      const request =
        pendingAction === "generate"
          ? whatsappApi.generateApiKey
          : whatsappApi.rotateApiKey;
      const { data } = await request({ companyCId: effectiveCompanyId });

      setHasKey(true);
      setRotatedAt(data.rotatedAt);
      setRevealedKey(data.apiKey);
      setHasSavedKey(false);
      setCopied(false);
      startCooldown();
      confirmationModal.onClose();
      revealModal.onOpen();
      toast({
        title:
          pendingAction === "generate"
            ? "API key generated"
            : "API key rotated",
        description:
          pendingAction === "generate"
            ? "Copy it now — it won't be shown again."
            : "The old key no longer works.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      showErrorToast(pendingAction, error);
    } finally {
      setLoadingAction(null);
    }
  };

  const submitRevoke = async () => {
    setLoadingAction("revoke");
    try {
      await whatsappApi.revokeApiKey({ companyCId: effectiveCompanyId });
      setHasKey(false);
      setRotatedAt(null);
      setRevokeConfirmed(false);
      revokeModal.onClose();
      toast({
        title: "API key revoked",
        description: "All clients are disconnected.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      showErrorToast("revoke", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(revealedKey);
      setCopied(true);
    } catch (error) {
      toast({
        title: "Failed to copy key",
        description: extractErrorMessage(error),
        status: "error",
        isClosable: true,
      });
    }
  };

  const requestRevealClose = () => {
    if (hasSavedKey) {
      revealModal.onClose();
      setRevealedKey("");
      return;
    }
    discardWarningModal.onOpen();
  };

  const closeRevealAnyway = () => {
    discardWarningModal.onClose();
    revealModal.onClose();
    setRevealedKey("");
  };

  const isCompanyAvailable = typeof effectiveCompanyId === "number";

  return (
    <Box
      bg={embedded ? "transparent" : pageBackground}
      minH={embedded ? "auto" : "60vh"}
      py={embedded ? 0 : { base: 8, md: 12 }}
    >
      {!embedded ? (
        <Head>
          <title>WhatsApp API Key | BIZPORT SOLUTIONS</title>
        </Head>
      ) : null}
      <Container
        maxW={embedded ? "full" : "container.md"}
        p={embedded ? 0 : undefined}
      >
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="lg">WhatsApp API Key</Heading>
            <Text mt={2} color={mutedText}>
              Manage the key used by your desktop applications.
            </Text>
          </Box>

          <Box
            bg={cardBackground}
            border="1px solid"
            borderColor={cardBorder}
            borderRadius="lg"
            p={{ base: 5, md: 7 }}
          >
            <VStack align="stretch" spacing={5}>
              <HStack justify="space-between" align="flex-start" spacing={4}>
                <Box>
                  <Heading size="md">API Key Status</Heading>
                  <Badge mt={3} colorScheme={hasKey ? "green" : "gray"}>
                    {hasKey ? "Active" : "No API key"}
                  </Badge>
                  {hasKey && rotatedAt ? (
                    <Text mt={2} color={mutedText} fontSize="sm">
                      {formatGeneratedAt(rotatedAt)}
                    </Text>
                  ) : null}
                </Box>
                {!hasKey ? (
                  <Button
                    leftIcon={<FaKey />}
                    onClick={() => openConfirmation("generate")}
                    isDisabled={!isCompanyAvailable}
                  >
                    Generate API Key
                  </Button>
                ) : null}
              </HStack>

              {hasKey ? (
                <>
                  <Divider />
                  <Box>
                    <HStack mb={3} color="red.500">
                      <Icon as={FaExclamationTriangle} />
                      <Text fontWeight="700">Danger Zone</Text>
                    </HStack>
                    <HStack spacing={3} flexWrap="wrap">
                      <Button
                        colorScheme="orange"
                        leftIcon={<FaRedo />}
                        onClick={() => openConfirmation("rotate")}
                        isDisabled={cooldownActive}
                      >
                        {cooldownActive
                          ? `Wait ${cooldownSeconds}s...`
                          : "Rotate Key"}
                      </Button>
                      <Button
                        colorScheme="red"
                        leftIcon={<FaTrashAlt />}
                        onClick={() => {
                          setRevokeConfirmed(false);
                          revokeModal.onOpen();
                        }}
                      >
                        Revoke Key
                      </Button>
                    </HStack>
                  </Box>
                </>
              ) : null}
            </VStack>
          </Box>
        </VStack>
      </Container>

      <Modal
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {pendingAction === "generate"
              ? "Generate New API Key"
              : "Rotate API Key"}
          </ModalHeader>
          <ModalCloseButton isDisabled={loadingAction !== null} />
          <ModalBody>
            <VStack align="stretch" spacing={5}>
              <Alert status="warning" alignItems="flex-start">
                <AlertIcon mt={1} />
                <AlertDescription>
                  This will create a new API key and immediately invalidate the
                  old one. Any desktop application using the old key will stop
                  working and will need the new key. This action cannot be
                  undone.
                </AlertDescription>
              </Alert>
              <Checkbox
                isChecked={acknowledgesInvalidation}
                onChange={(event) =>
                  setAcknowledgesInvalidation(event.target.checked)
                }
              >
                I understand the old key will stop working immediately
              </Checkbox>
              <Box>
                <Text mb={2} fontSize="sm" fontWeight="600">
                  Type{" "}
                  <Text as="span" fontFamily="monospace">
                    {expectedConfirmWord}
                  </Text>{" "}
                  to confirm
                </Text>
                <Input
                  autoComplete="off"
                  value={confirmationWord}
                  onChange={(event) => setConfirmationWord(event.target.value)}
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              variant="ghost"
              onClick={confirmationModal.onClose}
              isDisabled={loadingAction !== null}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={submitGenerateOrRotate}
              isDisabled={!isConfirmationValid || loadingAction !== null}
              leftIcon={loadingAction ? <Spinner size="sm" /> : undefined}
            >
              {loadingAction
                ? pendingAction === "generate"
                  ? "Generating..."
                  : "Rotating..."
                : pendingAction === "generate"
                  ? "Generate Key"
                  : "Rotate Key"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={revealModal.isOpen}
        onClose={requestRevealClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" pt={8}>
            <Icon as={FaKey} boxSize={8} color="primary.500" mb={3} />
            <Heading size="md">Your API Key</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={5}>
              <Text color="red.500" fontWeight="600" textAlign="center">
                This key will not be shown again. Copy and store it securely
                now.
              </Text>
              <InputGroup size="md">
                <Input
                  value={revealedKey}
                  isReadOnly
                  fontFamily="monospace"
                  pr="7rem"
                />
                <InputRightElement width="7rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    variant="ghost"
                    colorScheme={copied ? "green" : "primary"}
                    leftIcon={copied ? <FaCheck /> : <FaCopy />}
                    onClick={copyApiKey}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Checkbox
                isChecked={hasSavedKey}
                onChange={(event) => setHasSavedKey(event.target.checked)}
              >
                I have saved this key securely
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={requestRevealClose} isDisabled={!hasSavedKey}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={discardWarningModal.isOpen}
        onClose={discardWarningModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You will not be able to see this key again.</Text>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={discardWarningModal.onClose}>
              Go back
            </Button>
            <Button colorScheme="red" onClick={closeRevealAnyway}>
              Close anyway
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={revokeModal.isOpen}
        onClose={revokeModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Revoke API Key</ModalHeader>
          <ModalCloseButton isDisabled={loadingAction !== null} />
          <ModalBody>
            <VStack align="stretch" spacing={5}>
              <Alert status="error" alignItems="flex-start">
                <AlertIcon mt={1} />
                <AlertDescription>
                  All desktop applications using this key will immediately stop
                  working. You will need to generate a new key and distribute
                  it.
                </AlertDescription>
              </Alert>
              <Checkbox
                isChecked={revokeConfirmed}
                onChange={(event) => setRevokeConfirmed(event.target.checked)}
              >
                I understand all clients will be disconnected
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              variant="ghost"
              onClick={revokeModal.onClose}
              isDisabled={loadingAction !== null}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={submitRevoke}
              isDisabled={!revokeConfirmed || loadingAction !== null}
              leftIcon={
                loadingAction === "revoke" ? (
                  <Spinner size="sm" />
                ) : (
                  <FaTrashAlt />
                )
              }
            >
              {loadingAction === "revoke" ? "Revoking..." : "Revoke Key"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
