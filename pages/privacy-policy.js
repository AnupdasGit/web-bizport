import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PrivacyPolicyPage() {
  const headingColor = useColorModeValue("gray.800", "white.200");
  const textColor = useColorModeValue("gray.700", "white.300");

  return (
    <Container maxW="container.xl" centerContent>
      <Head>
        <title>Privacy Policy | BIZPORT SOLUTIONS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box w="full" p={4}>
        <Box h="50px" />
        <Heading color={headingColor} mb={2}>
          Privacy Policy
        </Heading>
        <Text color={textColor} fontWeight="bold" mb={6}>
          Effective Date: April 01, 2026
        </Text>

        <Text color={textColor} mb={5}>
          <b>BIZPORT SOLUTIONS</b> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed
          to protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our ERP software
          platform, including our integration with the Meta WhatsApp Business API
          for automated invoice delivery.
        </Text>

        <Text color={textColor} mb={7}>
          Please read this privacy policy carefully. If you do not agree with the
          terms of this privacy policy, please do not access the application.
        </Text>

        <OrderedList spacing={6} color={textColor}>
          <ListItem>
            <Text as="b">Information We Collect</Text>
            <Text mt={2} mb={2}>
              To provide automated invoice and document delivery services via WhatsApp,
              we collect and process the following information:
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>
                <b>Account Information:</b> Your business name, contact name, email
                address, and billing information.
              </ListItem>
              <ListItem>
                <b>Client Data (On-Behalf-Of Data):</b> Your WhatsApp Business Account
                (WABA) credentials, Phone Number IDs, and system access tokens generated
                via the Meta Embedded Signup flow.
              </ListItem>
              <ListItem>
                <b>Transactional Data:</b> Customer phone numbers, invoice metadata,
                and document payloads (such as PDF invoices) that you explicitly trigger
                our system to transmit.
              </ListItem>
            </UnorderedList>
          </ListItem>

          <ListItem>
            <Text as="b">How We Use Your Information</Text>
            <Text mt={2} mb={2}>
              We use the collected data strictly to execute core ERP and communication
              functions, including:
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>
                Provisioning and maintaining your WhatsApp Embedded Signup integration.
              </ListItem>
              <ListItem>
                Transmitting system-generated PDF invoices to your end-customers via
                the WhatsApp Business Platform.
              </ListItem>
              <ListItem>
                Tracking message delivery statuses (Sent, Delivered, Read) and displaying
                logs inside your ERP dashboard.
              </ListItem>
              <ListItem>
                Complying with Meta Tech Provider terms and legal obligations.
              </ListItem>
            </UnorderedList>
          </ListItem>

          <ListItem>
            <Text as="b">Data Sharing and Meta API Integration</Text>
            <Text mt={2} mb={2}>
              Our software connects directly with Meta Platforms, Inc. via their official
              Cloud APIs.
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>
                <b>Third-Party Processing:</b> To transmit invoices, your end-customers&apos;
                phone numbers and PDF documents are securely passed to Meta/WhatsApp
                servers. This data handling is subject to the Meta Business Tools Terms.
              </ListItem>
              <ListItem>
                <b>No Data Selling:</b> We do not sell, rent, or trade your business
                data or your customers&apos; contact information to third-party advertisers
                or data brokers.
              </ListItem>
            </UnorderedList>
          </ListItem>

          <ListItem>
            <Text as="b">Data Security</Text>
            <Text mt={2}>
              We implement industry-standard administrative, technical, and physical
              security measures to protect your personal and transactional information.
              This includes HTTPS encryption for data in transit and secure database
              hashing for Meta API access tokens.
            </Text>
          </ListItem>

          <ListItem>
            <Text as="b">Data Retention and Deletion (Meta Compliance)</Text>
            <Text mt={2} mb={2}>
              We retain transactional data only as long as necessary to fulfill ERP
              logging features or as required by financial compliance laws.
            </Text>
            <Text>
              <b>User Data Deletion Requests:</b> You have the right to request the
              absolute deletion of your account data and disconnected WhatsApp tokens
              at any time. To request data erasure, please contact us at{" "}
              <b>anupdas@bizportsolutions.com</b>. We will process and confirm your
              data deletion request within 30 days.
            </Text>
          </ListItem>

          <ListItem>
            <Text as="b">Updates to This Policy</Text>
            <Text mt={2}>
              We may update this Privacy Policy from time to time to reflect changes
              in our software or evolving Meta platform requirements. The
              &quot;Effective Date&quot; at the top will be updated accordingly.
            </Text>
          </ListItem>

          <ListItem>
            <Text as="b">Contact Us</Text>
            <Text mt={2} mb={2}>
              If you have any questions or concerns about this Privacy Policy, please
              contact us at:
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>
                <b>Company Name:</b> BIZPORT SOLUTIONS
              </ListItem>
              <ListItem>
                <b>Address:</b> Flat No 103, Gauri Apartment, Lane No 8, Kamal Park,
                Dhanori, Pune, Maharashtra, India. PIN 411015
              </ListItem>
              <ListItem>
                <b>Email:</b> anupdas@bizportsolutions.com
              </ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </Box>
    </Container>
  );
}
