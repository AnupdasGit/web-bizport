import {
  Box,
  Text,
  Stack,
  Flex,
  Container,
  Heading,
  Divider,
  Center,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

function MobileAppDevelopment() {
  return (
    <Container maxW="container.xl" centerContent>
      <Box p={4} id="mobileAppDevelopment">
        <Center h="100px" p={5}>
          <Heading>MOBILE APP DEVELOPMENT </Heading>
        </Center>
        <Center>
          <Image
            transform="scale(1.0)"
            src="MobileApp.jpg"
            alt="MobileApp"
            objectFit="contain"
            width="400px"
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Center>
        <Box   p={4}>
          <Heading fontSize="small">WHAT IS MOBILE APP DEVELOPMENT ?</Heading>
          <Divider />
          <Text>
            <text fontSize="50px">Mobile Apps</text> are revolutionary changing
            in the tech world today, as people are getting engaged with each
            other through Mobile phones. An organization must have a website and
            mobile application in order to evolve their business. Benefits of
            Mobile App Development on Business Aspects:
          </Text>
          <Text fontWeight={600} color={useColorModeValue("red.800", "red")} >1. On-The-Go Marketing-: </Text>
          <Text>
            Mobile Application Offer On-The-Go marketing, customers can access
            your business anywhere and at any time.
          </Text>
          <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>2. Increase More Sales-: </Text>
          <Text>
            Business means for generating sales and revenue. Apart from sales,
            Mobile application also assists to enhance brand awareness.
          </Text>
          <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>3. Future Marketing Trend-: </Text>
          <Text>
            Mobile app will become a marketing trend soon, which means soon
            search engine queries will come from smart devices as opposed to a
            personal computer.
          </Text>

          <Text fontWeight={600} color={useColorModeValue("red.800", "red")}> 4. Act As Social Platform-: </Text>
          <Text>
            Business becomes social with social networking sites and people are
            gripped with social media. So we must use these platforms as
            business strategies in order to improve the connectivity with users.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
export default MobileAppDevelopment;
