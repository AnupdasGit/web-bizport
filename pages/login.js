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
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Text,
  Link,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuth, extractErrorMessage } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
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
      await login(values);
      router.push("/dashboard");
    } catch (err) {
      setServerError(extractErrorMessage(err, "Could not log in. Please check your details."));
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your account and WhatsApp messaging."
    >
      <Head>
        <title>Log In | BIZPORT SOLUTIONS</title>
      </Head>
      {serverError ? (
        <Alert status="error" borderRadius="md" mb={4}>
          <AlertIcon />
          {serverError}
        </Alert>
      ) : null}
      {router.query.emailChanged === "1" ? (
        <Alert status="success" borderRadius="md" mb={4}>
          <AlertIcon />
          Your email address has been verified. Log in again with your new email.
        </Alert>
      ) : null}
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

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword((v) => !v)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Stack direction="row" justify="flex-end">
            <NextLink href="/forgot-password" passHref legacyBehavior>
              <Link fontSize="sm" color={linkColor}>
                Forgot password?
              </Link>
            </NextLink>
          </Stack>

          <Button type="submit" size="lg" isLoading={isSubmitting}>
            Log In
          </Button>
        </Stack>
      </form>

      <Text mt={6} textAlign="center" fontSize="sm" color={mutedText}>
        New to Bizport Solutions?{" "}
        <NextLink href="/register" passHref legacyBehavior>
          <Link color={linkColor} fontWeight="600">
            Create an account
          </Link>
        </NextLink>
      </Text>
    </AuthLayout>
  );
}
