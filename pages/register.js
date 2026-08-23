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
import { useAuth, extractErrorMessage } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerAccount } = useAuth();
  const [serverError, setServerError] = useState("");
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
    try {
      await registerAccount({
        companyName: values.companyName,
        name: values.name,
        emailId: values.emailId,
        password: values.password,
      });
      router.push("/login?registered=1");
    } catch (err) {
      setServerError(extractErrorMessage(err, "Could not create your account."));
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up your Bizport Solutions company portal in a minute."
    >
      <Head>
        <title>Register | BIZPORT SOLUTIONS</title>
      </Head>
      {serverError ? (
        <Alert status="error" borderRadius="md" mb={4}>
          <AlertIcon />
          {serverError}
        </Alert>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors.companyName} isRequired>
            <FormLabel>Company name</FormLabel>
            <Input
              placeholder="Acme Retail Pvt Ltd"
              {...register("companyName", { required: "Company name is required" })}
            />
            <FormErrorMessage>{errors.companyName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Your name</FormLabel>
            <Input placeholder="Full name" {...register("name")} />
          </FormControl>

          <FormControl isInvalid={!!errors.emailId} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="you@company.com"
              {...register("emailId", { required: "Email is required" })}
            />
            <FormErrorMessage>{errors.emailId?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password} isRequired>
            <FormLabel>Password</FormLabel>
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
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" size="lg" isLoading={isSubmitting}>
            Create Account
          </Button>
        </Stack>
      </form>

      <Text mt={6} textAlign="center" fontSize="sm" color={mutedText}>
        Already have an account?{" "}
        <NextLink href="/login" passHref legacyBehavior>
          <Link color={linkColor} fontWeight="600">
            Log in
          </Link>
        </NextLink>
      </Text>
    </AuthLayout>
  );
}
