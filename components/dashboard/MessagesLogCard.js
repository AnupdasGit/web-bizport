import { useEffect, useState, useCallback } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Text,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { whatsappApi, extractErrorMessage } from "../../lib/apiClient";
import ExportExcelButton from "./ExportExcelButton";

const STATUS_COLORS = {
  Queued: "gray",
  MediaUploaded: "gray",
  Submitted: "blue",
  Sent: "blue",
  Delivered: "cyan",
  Read: "green",
  Failed: "red",
  RetryPending: "orange",
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoIso(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function getMessageRows(payload) {
  const rows = payload?.messages || payload?.rows || payload?.data || payload;
  return Array.isArray(rows) ? rows : [];
}

function getPagination(payload, page, pageSize, rowCount) {
  const pagination = payload?.pagination || payload?.meta || {};
  const total = Number(
    payload?.total ?? payload?.totalCount ?? payload?.count ?? pagination.total,
  );
  const totalPages = Number(
    payload?.totalPages ?? pagination.totalPages ?? pagination.pages,
  );

  if (Number.isFinite(totalPages) && totalPages > 0) {
    return { total: Number.isFinite(total) ? total : null, totalPages };
  }
  if (Number.isFinite(total)) {
    return { total, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
  }
  return {
    total: null,
    totalPages: rowCount < pageSize ? page : page + 1,
  };
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-IN");
}

function parseRawPayload(rawPayload) {
  if (!rawPayload) return null;
  if (typeof rawPayload !== "string") return rawPayload;

  try {
    const parsedPayload = JSON.parse(rawPayload);
    return typeof parsedPayload === "string"
      ? parseRawPayload(parsedPayload)
      : parsedPayload;
  } catch (_error) {
    return rawPayload;
  }
}

function getRawPayloadFrom(message) {
  const payload = parseRawPayload(message.rawPayload);
  if (!payload || typeof payload === "string") return message.senderWaId || "";

  return (
    payload.from ||
    payload.message?.from ||
    payload.messages?.[0]?.from ||
    payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from ||
    message.senderWaId ||
    ""
  );
}

function formatRawPayload(rawPayload) {
  const payload = parseRawPayload(rawPayload);
  if (!payload) return "—";
  if (payload.type === "text") return payload.text?.body || "—";
  if (typeof payload === "string") return payload;
  return JSON.stringify(payload, null, 2);
}

export default function MessagesLogCard({ direction = "outbound" }) {
  const isInbound = direction === "inbound";
  const [from, setFrom] = useState(daysAgoIso(7));
  const [till, setTill] = useState(todayIso());
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const cardBackground = useColorModeValue("white", "gray.800");
  const cardText = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.400", "gray.400");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.200");
  const inputBackground = useColorModeValue("white", "gray.900");
  const inputBorder = useColorModeValue("gray.300", "gray.600");

  const columns = isInbound
    ? [
        {
          key: "senderName",
          label: "Sender Name",
        },
        {
          key: "from",
          label: "From",
          exportValue: getRawPayloadFrom,
        },
        {
          key: "messageText",
          label: "Message Text",
        },
        {
          key: "receivedOn",
          label: "Received On",
          exportValue: (message) => formatDate(message.receivedOn),
        },
        {
          key: "rawPayload",
          label: "Raw Payload",
          exportValue: (message) => formatRawPayload(message.rawPayload),
        },
      ]
    : [
        {
          key: "createdAt",
          label: "Date",
          exportValue: (message) => formatDate(message.createdAt),
        },
        { key: "mobile", label: "Mobile" },
        { key: "billNo", label: "Bill No" },
        {
          key: "template",
          label: "Template",
          exportValue: (message) =>
            message.templateCode || message.templateName || "",
        },
        { key: "status", label: "Status" },
      ];

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = { from, till, page, pageSize };
      if (!isInbound && status) params.status = status;
      const request = isInbound
        ? whatsappApi.inboundMessages(params)
        : whatsappApi.messages(params);
      const { data } = await request;
      const rows = getMessageRows(data);
      const pagination = getPagination(data, page, pageSize, rows.length);
      setMessages(rows);
      setTotal(pagination.total);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError(extractErrorMessage(err, "Could not load the messages log."));
    } finally {
      setIsLoading(false);
    }
  }, [from, isInbound, page, pageSize, status, till]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const applyFilters = () => {
    if (page === 1) {
      fetchMessages();
    } else {
      setPage(1);
    }
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
      sx={{
        "& input, & select": {
          color: cardText,
          backgroundColor: inputBackground,
          borderColor: inputBorder,
        },
      }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        mb={6}
        align={{ md: "flex-end" }}
      >
        <FormControl maxW={{ md: "180px" }}>
          <FormLabel fontSize="sm">From</FormLabel>
          <Input
            type="date"
            value={from}
            max={till}
            onChange={(e) => setFrom(e.target.value)}
          />
        </FormControl>
        <FormControl maxW={{ md: "180px" }}>
          <FormLabel fontSize="sm">To</FormLabel>
          <Input
            type="date"
            value={till}
            min={from}
            onChange={(e) => setTill(e.target.value)}
          />
        </FormControl>
        {!isInbound ? (
          <FormControl maxW={{ md: "180px" }}>
            <FormLabel fontSize="sm">Status</FormLabel>
            <Select
              placeholder="All statuses"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {Object.keys(STATUS_COLORS).map((statusName) => (
                <option key={statusName} value={statusName}>
                  {statusName}
                </option>
              ))}
            </Select>
          </FormControl>
        ) : null}
        <Button
          onClick={applyFilters}
          isLoading={isLoading}
          alignSelf={{ base: "stretch", md: "flex-end" }}
        >
          Filter
        </Button>
        <ExportExcelButton
          rows={messages}
          columns={columns}
          fileName={`${direction}-messages-page-${page}`}
        />
      </Stack>

      {error ? (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      ) : null}

      {isLoading ? (
        <HStack justify="center" py={10}>
          <Spinner color="primary.500" />
        </HStack>
      ) : messages.length === 0 ? (
        <Text color={mutedText} fontSize="sm" py={6} textAlign="center">
          No {isInbound ? "incoming" : "outgoing"} messages found for the
          selected date range.
        </Text>
      ) : (
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                {isInbound ? (
                  <>
                    <Th>Sender Name</Th>
                    <Th>From</Th>
                    <Th>Message Text</Th>
                    <Th>Received On</Th>
                    <Th>Raw Payload</Th>
                  </>
                ) : (
                  <>
                    <Th>Date</Th>
                    <Th>Mobile</Th>
                    <Th>Bill No</Th>
                    <Th>Template</Th>
                    <Th>Status</Th>
                  </>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {messages.map((msg, rowIndex) => (
                <Tr
                  key={msg.logId || msg.clientRequestId || msg.id || rowIndex}
                >
                  {isInbound ? (
                    <>
                      <Td>{msg.senderName || "—"}</Td>
                      <Td>{getRawPayloadFrom(msg) || "—"}</Td>
                      <Td maxW="360px" whiteSpace="normal">
                        {msg.messageText || "—"}
                      </Td>
                      <Td whiteSpace="nowrap">{formatDate(msg.receivedOn)}</Td>
                      <Td
                        maxW="420px"
                        whiteSpace="pre-wrap"
                        fontFamily="mono"
                        fontSize="xs"
                      >
                        {formatRawPayload(msg.rawPayload)}
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td whiteSpace="nowrap">{formatDate(msg.createdAt)}</Td>
                      <Td>{msg.mobile || "—"}</Td>
                      <Td>{msg.billNo || "—"}</Td>
                      <Td>{msg.templateCode || msg.templateName || "—"}</Td>
                      <Td>
                        <Badge
                          colorScheme={STATUS_COLORS[msg.status] || "gray"}
                        >
                          {msg.status || "Unknown"}
                        </Badge>
                      </Td>
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <HStack justify="space-between" mt={5} flexWrap="wrap" spacing={4}>
        <Text color={mutedText} fontSize="sm">
          Page {page} of {totalPages}
          {total !== null ? ` · ${total} messages` : ""}
        </Text>
        <HStack>
          <Select
            aria-label="Rows per page"
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
            width="100px"
            size="sm"
          >
            {[25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
          <Button
            leftIcon={<FiChevronLeft />}
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => current - 1)}
            isDisabled={page <= 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            rightIcon={<FiChevronRight />}
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => current + 1)}
            isDisabled={page >= totalPages || isLoading}
          >
            Next
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
