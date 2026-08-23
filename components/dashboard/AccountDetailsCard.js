import NextLink from "next/link";
import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

function isExpired(validTill) {
  if (!validTill) return false;
  const date = new Date(validTill);
  if (Number.isNaN(date.getTime())) return false;
  return date < new Date(new Date().toDateString());
}

export default function AccountDetailsCard({ account, company }) {
  const expired = isExpired(account?.validTill);
  const cardBackground = useColorModeValue("white", "gray.800");
  const cardText = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const subtleText = useColorModeValue("ink.400", "gray.400");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.200");

  return (
    <Box bg={cardBackground} color={cardText} borderRadius="2xl" boxShadow="md" border="1px solid" borderColor={cardBorder} p={{ base: 5, md: 7 }}>
      <HStack justify="space-between" align="center" mb={5} spacing={4}>
        <Heading size="md" color={cardText}>
          Account Details
        </Heading>
        <NextLink href="/account" passHref legacyBehavior>
          <Button as="a" size="sm" variant="outline" flexShrink={0}>
            Edit account
          </Button>
        </NextLink>
      </HStack>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
        <Stat>
          <StatLabel color={mutedText}>Company</StatLabel>
          <StatNumber fontSize="lg">{company?.dbcompanyname || "—"}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel color={mutedText}>Contact name</StatLabel>
          <StatNumber fontSize="lg">{account?.name || "—"}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel color={mutedText}>Email</StatLabel>
          <StatNumber fontSize="lg" wordBreak="break-word">
            {account?.emailId || "—"}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel color={mutedText}>Valid Till</StatLabel>
          <StatNumber fontSize="lg">
            {formatDate(account?.validTill)}{" "}
            {account?.validTill ? (
              <Badge ml={2} colorScheme={expired ? "red" : "green"}>
                {expired ? "Expired" : "Active"}
              </Badge>
            ) : (
              <Badge ml={2} colorScheme="green">
                Active
              </Badge>
            )}
          </StatNumber>
        </Stat>
      </SimpleGrid>
      {company?.companyurl ? (
        <Text mt={5} fontSize="xs" color={subtleText}>
          Company ID: {company.cId} &middot; {company.companyurl}
        </Text>
      ) : null}
    </Box>
  );
}
