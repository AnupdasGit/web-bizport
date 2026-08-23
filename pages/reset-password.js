import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
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

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token: tokenFromUrl } = router.query;
  const resetToken = typeof tokenFromUrl === "string" ? tokenFromUrl : "";
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const linkColor = useColorModeValue("primary.600", "primary.200");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    setServerError("");
    if (!resetToken) {
      setServerError("This password reset link is invalid or incomplete.");
      return;
    }
    try {
      await whatsappApi.resetPassword({
        resetToken,
        newPassword: values.password,
      });
      setSuccess(true);
    } catch (err) {
      setServerError(extractErrorMessage(err, "Could not reset your password."));
    }
  };

  return (
    <AuthLayout title="Set a new password" subtitle="Choose a new password for your account.">
      <Head>
        <title>Reset Password | BIZPORT SOLUTIONS</title>
      </Head>
      {serverError ? (
        <Alert status="error" borderRadius="md" mb={4}>
          <AlertIcon />
          {serverError}
        </Alert>
      ) : null}

      {router.isReady && !resetToken ? (
        <Stack spacing={4}>
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            This password reset link is invalid or incomplete.
          </Alert>
          <NextLink href="/forgot-password" passHref legacyBehavior>
            <Button as="a" size="lg">
              Request a new link
            </Button>
          </NextLink>
        </Stack>
      ) : success ? (
        <Stack spacing={4}>
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            Your password has been reset. You can now log in.
          </Alert>
          <NextLink href="/login" passHref legacyBehavior>
            <Button as="a" size="lg">
              Go to login
            </Button>
          </NextLink>
        </Stack>
      ) : resetToken ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.password} isRequired>
              <FormLabel>New password</FormLabel>
              <Input
                type="password"
                placeholder="At least 8 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Use at least 8 characters" },
                })}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword} isRequired>
              <FormLabel>Confirm new password</FormLabel>
              <Input
                type="password"
                placeholder="Re-enter your new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" size="lg" isLoading={isSubmitting}>
              Reset Password
            </Button>
          </Stack>
        </form>
      ) : null}

      <Text mt={6} textAlign="center" fontSize="sm" color={mutedText}>
        <NextLink href="/login" passHref legacyBehavior>
          <Link color={linkColor} fontWeight="600">
            Back to login
          </Link>
        </NextLink>
      </Text>
    </AuthLayout>
  );
}
