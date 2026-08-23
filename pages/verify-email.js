import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Alert, AlertIcon, Button, Spinner, Stack, Text } from "@chakra-ui/react";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { extractErrorMessage, whatsappApi } from "../lib/apiClient";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { clearSession } = useAuth();
  const submittedToken = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const token = Array.isArray(router.query.token)
      ? router.query.token[0]
      : router.query.token;

    if (!token) {
      setError("This verification link is missing its token.");
      return;
    }
    if (submittedToken.current === token) return;
    submittedToken.current = token;

    whatsappApi
      .confirmEmailChange({ token })
      .then(() => {
        clearSession();
        router.replace("/login?emailChanged=1");
      })
      .catch((requestError) => {
        setError(extractErrorMessage(requestError, "This verification link is invalid or has expired."));
      });
  }, [clearSession, router]);

  return (
    <AuthLayout
      title={error ? "Email not verified" : "Verifying your email"}
      subtitle={error ? "We could not complete this email change." : "Please wait while we verify your new address."}
    >
      <Head>
        <title>Verify Email | BIZPORT SOLUTIONS</title>
      </Head>
      {error ? (
        <Stack spacing={5}>
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
          <Text fontSize="sm">The link may have expired or already been used. Request a new link from account settings.</Text>
          <NextLink href="/login" passHref legacyBehavior>
            <Button as="a">Go to login</Button>
          </NextLink>
        </Stack>
      ) : (
        <Stack align="center" py={4} spacing={4}>
          <Spinner color="primary.500" size="lg" />
          <Text fontSize="sm">Confirming your one-time verification link...</Text>
        </Stack>
      )}
    </AuthLayout>
  );
}