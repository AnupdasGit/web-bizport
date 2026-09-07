import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCloud, FiRefreshCw } from "react-icons/fi";
import { extractErrorMessage, whatsappApi } from "../../lib/apiClient";

const STATUS_COLORS = {
  APPROVED: "green",
  PENDING: "orange",
  REJECTED: "red",
};

function normalizeTemplates(payload) {
  if (Array.isArray(payload)) return payload;

  const rows = payload?.templates || payload?.rows || payload?.data;
  if (Array.isArray(rows)) return rows;
  if (rows && rows !== payload) return normalizeTemplates(rows);

  throw new Error("The templates response was not in the expected format.");
}

function getBodyPreview(components) {
  let parsedComponents = components;

  if (typeof components === "string") {
    try {
      parsedComponents = JSON.parse(components);
    } catch (_error) {
      return "—";
    }
  }

  if (!Array.isArray(parsedComponents)) return "—";

  const body = parsedComponents.find(
    (component) => component?.type?.toUpperCase() === "BODY",
  );
  return body?.text || "—";
}

export default function MessageTemplatesCard() {
  const [templates, setTemplates] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState("");
  const cardBackground = useColorModeValue("white", "gray.800");
  const cardText = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.400", "gray.400");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.200");

  const fetchTemplates = useCallback(async (showRefreshState = false) => {
    if (showRefreshState) setIsRefreshing(true);
    setError("");

    try {
      const { data } = await whatsappApi.listWhatsAppTemplates();
      setTemplates(normalizeTemplates(data));
    } catch (requestError) {
      setError(
        extractErrorMessage(
          requestError,
          "Could not load the WhatsApp templates.",
        ),
      );
    } finally {
      setIsInitialLoading(false);
      if (showRefreshState) setIsRefreshing(false);
    }
  }, []);

  const syncTemplates = async () => {
    setIsSyncing(true);
    setError("");

    try {
      await whatsappApi.syncMetaWhatsAppTemplates();
      const { data } = await whatsappApi.listWhatsAppTemplates();
      setTemplates(normalizeTemplates(data));
    } catch (requestError) {
      setError(
        extractErrorMessage(
          requestError,
          "Could not synchronize the WhatsApp templates.",
        ),
      );
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const actionsDisabled = isInitialLoading || isRefreshing || isSyncing;

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
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        spacing={4}
        mb={5}
      >
        <Box>
          <Heading size="md" color={cardText}>
            Message Templates
          </Heading>
          <Text color={mutedText} fontSize="sm" mt={1}>
            WhatsApp templates available for this company.
          </Text>
        </Box>
        <HStack spacing={3}>
          <Button
            leftIcon={<FiRefreshCw />}
            variant="outline"
            onClick={() => fetchTemplates(true)}
            isLoading={isRefreshing}
            isDisabled={actionsDisabled && !isRefreshing}
            flex={{ base: 1, md: "initial" }}
          >
            Refresh
          </Button>
          <Button
            leftIcon={<FiCloud />}
            onClick={syncTemplates}
            isLoading={isSyncing}
            loadingText="Synchronizing"
            isDisabled={actionsDisabled && !isSyncing}
            flex={{ base: 1, md: "initial" }}
          >
            Synchronize
          </Button>
        </HStack>
      </Stack>

      {error ? (
        <Alert status="warning" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      ) : null}

      {isInitialLoading ? (
        <HStack justify="center" py={10}>
          <Spinner color="primary.500" />
        </HStack>
      ) : templates.length === 0 ? (
        <Text color={mutedText} fontSize="sm" py={6} textAlign="center">
          No WhatsApp templates found. Synchronize to import templates from
          Meta.
        </Text>
      ) : (
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Template</Th>
                <Th>Status</Th>
                <Th>Language</Th>
                <Th>Category</Th>
                <Th>Body Preview</Th>
              </Tr>
            </Thead>
            <Tbody>
              {templates.map((template) => {
                const status = template.metaStatus?.toUpperCase();
                return (
                  <Tr
                    key={
                      template.metaTemplateId ||
                      `${template.templateCode}-${template.languageCode}`
                    }
                  >
                    <Td>
                      <Text fontWeight="600">
                        {template.metaTemplateName || "—"}
                      </Text>
                      <Text color={mutedText} fontSize="xs">
                        {template.templateCode || "—"}
                      </Text>
                    </Td>
                    <Td>
                      <Badge colorScheme={STATUS_COLORS[status] || "gray"}>
                        {status || "Unknown"}
                      </Badge>
                    </Td>
                    <Td>{template.languageCode || "—"}</Td>
                    <Td>{template.category || "—"}</Td>
                    <Td maxW="360px" whiteSpace="normal">
                      <Text
                        noOfLines={3}
                        title={getBodyPreview(template.components)}
                      >
                        {getBodyPreview(template.components)}
                      </Text>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
