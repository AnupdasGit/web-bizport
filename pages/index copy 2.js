import { useState } from "react";
import emailjs from "emailjs-com";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

const fields = [
  { id: "from_name", name: "from_name", label: "Name", type: "text" },
  {
    id: "from_nameofcompany",
    name: "from_nameofcompany",
    label: "Company name",
    type: "text",
  },
  { id: "from_email", name: "from_email", label: "Email", type: "email" },
  {
    id: "from_phoneno",
    name: "from_phoneno",
    label: "Mobile number",
    type: "tel",
  },
  { id: "from_address", name: "from_address", label: "Address", type: "text" },
];

export default function IndexPage() {
  const [result, setResult] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const panelBackground = useColorModeValue("white", "gray.800");
  const panelText = useColorModeValue("ink.800", "gray.100");
  const panelBorder = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputBackground = useColorModeValue("white", "gray.900");
  const inputBorder = useColorModeValue("gray.300", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  async function sendEmail(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSending(true);
    setResult(null);

    try {
      await emailjs.sendForm(
        "service_thc7ljo",
        "template_je6ta2h",
        form,
        "user_9oKOxPKSJxeofT9BLB48N"
      );
      form.reset();
      setResult({ status: "success", message: "Your message has been sent." });
    } catch (error) {
      setResult({
        status: "error",
        message: error?.text || "We could not send your message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Box className="col-md-6" py={{ base: 8, md: 10 }} px={{ base: 4, md: 8 }}>
      <Box
        as="form"
        onSubmit={sendEmail}
        bg={panelBackground}
        color={panelText}
        border="1px solid"
        borderColor={panelBorder}
        borderRadius="md"
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
        sx={{
          "& input, & textarea": {
            color: panelText,
            backgroundColor: inputBackground,
            borderColor: inputBorder,
          },
          "& input::placeholder, & textarea::placeholder": {
            color: placeholderColor,
            opacity: 1,
          },
        }}
      >
        <Stack spacing={5}>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
            {fields.map((field) => (
              <FormControl key={field.id} isRequired>
                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                <Input id={field.id} name={field.name} type={field.type} />
              </FormControl>
            ))}
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea id="message" name="message" minH="140px" resize="vertical" />
          </FormControl>

          {result ? (
            <Alert status={result.status} borderRadius="md">
              <AlertIcon />
              {result.message}
            </Alert>
          ) : null}

          <Button type="submit" size="lg" isLoading={isSending} alignSelf="flex-start">
            Send message
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}