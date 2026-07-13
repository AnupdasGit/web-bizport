import {
  Box,
  Text,
  Stack,
  Container,
  Heading,
  Image, 
  Center,
} from "@chakra-ui/react";

function CustomizedPage() {
  return (
    <Container maxW="container.xl" centerContent>
      <Center align="center" h="100px" justify="space-between" p={1}>
        <Heading>CUSTOMIZED DEVELOPMENT</Heading>
      </Center>
      <Center>
        <Image
          transform="scale(1.0)"
          src="Customized.jpg"
          alt="some text"
          objectFit="contain"
          width="400px"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Center>
      <Stack align="center" justify="space-between" h="100px" >
        <Heading>WHAT IS CUSTOMIZED DEVELOPMENT ?</Heading>
      </Stack>
      <Box p={6} id="CustomizedPage">
         <Text>
          Customized software development is the designing of software
          applications for a specific user or group of users within an
          organization. Such software is designed to address their needs
          precisely as opposed to the more traditional and widespread
          off-the-shelf software.
        </Text>
        <Text>
          The benefit to custom software is the simple fact it provides features
          off-the-shelf software doesn’t. Designing an application with your
          organization’s needs in consideration implies an increased level of
          productivity. If you have a software application designed to increase
          productivity or address an internal need, the cost of it is offset by
          the promise of increased efficiency.
        </Text>
      </Box>
    </Container>
  );
}
export default CustomizedPage;
