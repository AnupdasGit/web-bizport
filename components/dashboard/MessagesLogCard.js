import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Heading,
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
import { whatsappApi, extractErrorMessage } from "../../lib/apiClient";

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

export default function MessagesLogCard() {
  const [from, setFrom] = useState(daysAgoIso(7));
  const [till, setTill] = useState(todayIso());
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const cardBackground = useColorModeValue("white", "gray.800");
  const cardText = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.400", "gray.400");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.200");
  const inputBackground = useColorModeValue("white", "gray.900");
  const inputBorder = useColorModeValue("gray.300", "gray.600");

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = { from, till, page: 1, pageSize: 100 };
      if (status) params.status = status;
      const { data } = await whatsappApi.messages(params);
      setMessages(data.messages || data.rows || data.data || []);
    } catch (err) {
      setError(extractErrorMessage(err, "Could not load the messages log."));
    } finally {
      setIsLoading(false);
    }
  }, [from, till, status]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

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
      <Heading size="md" mb={5} color={cardText}>
        Messages Log
      </Heading>

      <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6} align={{ md: "flex-end" }}>
        <FormControl maxW={{ md: "180px" }}>
          <FormLabel fontSize="sm">From</FormLabel>
          <Input type="date" value={from} max={till} onChange={(e) => setFrom(e.target.value)} />
        </FormControl>
        <FormControl maxW={{ md: "180px" }}>
          <FormLabel fontSize="sm">To</FormLabel>
          <Input type="date" value={till} min={from} onChange={(e) => setTill(e.target.value)} />
        </FormControl>
        <FormControl maxW={{ md: "180px" }}>
          <FormLabel fontSize="sm">Status</FormLabel>
          <Select placeholder="All statuses" value={status} onChange={(e) => setStatus(e.target.value)}>
            {Object.keys(STATUS_COLORS).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={fetchMessages} isLoading={isLoading} alignSelf={{ base: "stretch", md: "flex-end" }}>
          Filter
        </Button>
      </Stack>

      {error ? (
        <Text color="red.500" fontSize="sm" mb={4}>
          {error}
        </Text>
      ) : null}

      {isLoading ? (
        <HStack justify="center" py={10}>
          <Spinner color="primary.500" />
        </HStack>
      ) : messages.length === 0 ? (
        <Text color={mutedText} fontSize="sm" py={6} textAlign="center">
          No messages found for the selected date range.
        </Text>
      ) : (
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Mobile</Th>
                <Th>Bill No</Th>
                <Th>Template</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {messages.map((msg) => (
                <Tr key={msg.logId || msg.clientRequestId}>
                  <Td whiteSpace="nowrap">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString("en-IN") : "—"}
                  </Td>
                  <Td>{msg.mobile || "—"}</Td>
                  <Td>{msg.billNo || "—"}</Td>
                  <Td>{msg.templateCode || msg.templateName || "—"}</Td>
                  <Td>
                    <Badge colorScheme={STATUS_COLORS[msg.status] || "gray"}>
                      {msg.status || "Unknown"}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
