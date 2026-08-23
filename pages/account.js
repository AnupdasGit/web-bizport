import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth, extractErrorMessage } from "../context/AuthContext";
import { whatsappApi } from "../lib/apiClient";

export default function AccountPage() {
  const router = useRouter();
  const { account, company, isAuthenticated, isLoading, updateProfile } = useAuth();
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const pageBackground = useColorModeValue("gray.50", "gray.900");
  const panelBackground = useColorModeValue("white", "gray.800");
  const panelBorder = useColorModeValue("gray.100", "whiteAlpha.200");
  const headingColor = useColorModeValue("ink.800", "gray.100");
  const mutedText = useColorModeValue("ink.500", "gray.300");
  const linkColor = useColorModeValue("primary.600", "primary.200");

  const profileForm = useForm({
    defaultValues: { name: "", companyName: "" },
  });
  const emailForm = useForm({ defaultValues: { emailId: "" } });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    profileForm.reset({
      name: account?.name || "",
      companyName: company?.dbcompanyname || "",
    });
  }, [account?.name, company?.dbcompanyname, profileForm.reset]);

  const saveProfile = async (values) => {
    setProfileError("");
    setProfileMessage("");
    try {
      await updateProfile({
        name: values.name.trim(),
        companyName: values.companyName.trim(),
      });
      setProfileMessage("Your account details have been updated.");
    } catch (error) {
      setProfileError(extractErrorMessage(error, "Could not update your account details."));
    }
  };

  const requestEmailChange = async (values) => {
    setEmailError("");
    setEmailMessage("");
    try {
      await whatsappApi.requestEmailChange({
        emailId: values.emailId.trim().toLowerCase(),
      });
      setEmailMessage("Check the new email address for a verification link. The link expires in 15 minutes.");
      emailForm.reset();
    } catch (error) {
      setEmailError(extractErrorMessage(error, "Could not send the verification email."));
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.md" py={20} centerContent>
        <Spinner color="primary.500" size="lg" />
      </Container>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Box bg={pageBackground} minH="60vh" py={{ base: 8, md: 12 }}>
      <Head>
        <title>Account Settings | BIZPORT SOLUTIONS</title>
      </Head>
      <Container maxW="container.md">
        <HStack justify="space-between" align="flex-start" mb={8} spacing={4}>
          <Stack spacing={1}>
            <Heading size="lg" color={headingColor}>Account settings</Heading>
            <Text color={mutedText}>Manage your contact and company details.</Text>
          </Stack>
          <NextLink href="/dashboard" passHref legacyBehavior>
            <Button as={Link} variant="outline" flexShrink={0}>Back</Button>
          </NextLink>
        </HStack>

        <Stack spacing={6}>
          <Box bg={panelBackground} border="1px solid" borderColor={panelBorder} borderRadius="lg" boxShadow="sm" p={{ base: 5, md: 7 }}>
            <Heading size="md" color={headingColor} mb={1}>Profile</Heading>
            <Text color={mutedText} fontSize="sm" mb={6}>These details appear across your Bizport account.</Text>
            {profileError ? <Alert status="error" borderRadius="md" mb={5}><AlertIcon />{profileError}</Alert> : null}
            {profileMessage ? <Alert status="success" borderRadius="md" mb={5}><AlertIcon />{profileMessage}</Alert> : null}
            <form onSubmit={profileForm.handleSubmit(saveProfile)} noValidate>
              <Stack spacing={5}>
                <FormControl isInvalid={!!profileForm.formState.errors.name}>
                  <FormLabel>Contact name</FormLabel>
                  <Input {...profileForm.register("name", {
                    required: "Contact name is required",
                    validate: (value) => value.trim().length > 1 || "Enter at least 2 characters",
                  })} />
                  <FormErrorMessage>{profileForm.formState.errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!profileForm.formState.errors.companyName}>
                  <FormLabel>Company name</FormLabel>
                  <Input {...profileForm.register("companyName", {
                    required: "Company name is required",
                    validate: (value) => value.trim().length > 1 || "Enter at least 2 characters",
                  })} />
                  <FormErrorMessage>{profileForm.formState.errors.companyName?.message}</FormErrorMessage>
                </FormControl>
                <Button type="submit" alignSelf="flex-start" isLoading={profileForm.formState.isSubmitting}>Save changes</Button>
              </Stack>
            </form>

            <Divider my={8} />

            <Heading size="md" color={headingColor} mb={1}>Email address</Heading>
            <Text color={mutedText} fontSize="sm" mb={6}>Current email: <Text as="span" color={headingColor} fontWeight="600">{account?.emailId || "—"}</Text></Text>
            {emailError ? <Alert status="error" borderRadius="md" mb={5}><AlertIcon />{emailError}</Alert> : null}
            {emailMessage ? <Alert status="success" borderRadius="md" mb={5}><AlertIcon />{emailMessage}</Alert> : null}
            <form onSubmit={emailForm.handleSubmit(requestEmailChange)} noValidate>
              <Stack spacing={5}>
                <FormControl isInvalid={!!emailForm.formState.errors.emailId}>
                  <FormLabel>New email address</FormLabel>
                  <Input type="email" placeholder="you@company.com" {...emailForm.register("emailId", {
                    required: "New email address is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
                    validate: (value) => value.trim().toLowerCase() !== account?.emailId?.toLowerCase() || "Enter a different email address",
                  })} />
                  <FormErrorMessage>{emailForm.formState.errors.emailId?.message}</FormErrorMessage>
                  <FormHelperText color={mutedText}>We will only update your login after you verify the new address.</FormHelperText>
                </FormControl>
                <Button type="submit" variant="outline" alignSelf="flex-start" isLoading={emailForm.formState.isSubmitting}>Send verification link</Button>
              </Stack>
            </form>
          </Box>
          <Text textAlign="center" fontSize="sm" color={mutedText}>
            WhatsApp Business assets are managed separately from your profile. {" "}
            <NextLink href="/dashboard" passHref legacyBehavior><Link color={linkColor}>View dashboard</Link></NextLink>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}