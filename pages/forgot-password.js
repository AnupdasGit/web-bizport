import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  Link,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import { whatsappApi, extractErrorMessage } from "../lib/apiClient";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const bodyText = useColorModeValue("ink.600", "gray.300");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const linkColor = useColorModeValue("primary.600", "primary.200");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setServerError("");
    try {
      await whatsappApi.forgotPassword({
        emailId: values.emailId.trim().toLowerCase(),
      });
      setRequestSubmitted(true);
    } catch (err) {
      setServerError(extractErrorMessage(err, "Could not process your request."));
    }
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your account email and we'll generate a reset link for you."
    >
      <Head>
        <title>Forgot Password | BIZPORT SOLUTIONS</title>
      </Head>
      {serverError ? (
        <Alert status="error" borderRadius="md" mb={4}>
          <AlertIcon />
          {serverError}
        </Alert>
      ) : null}

      {requestSubmitted ? (
        <Stack spacing={4}>
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            If an account exists for that email address, a password reset link
            has been sent.
          </Alert>
          <Text fontSize="sm" color={bodyText}>
            Check your inbox and spam folder. The link expires shortly and can
            only be used once.
          </Text>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.emailId}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="you@company.com"
                {...register("emailId", { required: "Email is required" })}
              />
              <FormErrorMessage>{errors.emailId?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" size="lg" isLoading={isSubmitting}>
              Send Reset Link
            </Button>
          </Stack>
        </form>
      )}

      <Text mt={6} textAlign="center" fontSize="sm" color={mutedText}>
        Remembered your password?{" "}
        <NextLink href="/login" passHref legacyBehavior>
          <Link color={linkColor} fontWeight="600">
            Back to login
          </Link>
        </NextLink>
      </Text>
    </AuthLayout>
  );
}
