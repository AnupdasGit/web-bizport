import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Wrap } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";

function Feature({ title, img, desc, ...rest }) {
  return (
    <Box>
      <Box
        p={25}
        justify="center"
        shadow="md"
        borderWidth="1px"
        _hover={{
          justify: "center",
          borderWidth: "1px",
          transform: ("scale(2)", "scale(1.2)"),
          boxShadow: "lg",
        }}
        {...rest}
      >
        <Image
          rounded={"lg"}
          height={220}
          width={250}
          objectFit={"fill"}
          src={img}
        />
        <Heading fontSize="xl" opacity="1" paddingInlineStart="58">
          {title}
        </Heading>
      </Box>
    </Box>
  );
}

function IndustryExpertise() {
  return (
    <Container maxW="container.lg">
      <Box id="IndustryExpertise">
        <Stack align="center" justify="space-between" >
          <Heading>Our Industry Expertise</Heading>
        </Stack> 
        <Divider />
        <Wrap spacing={6}>
          <Feature img="IndustryExpertiseMenCap.jpg" title="Mens Wear" />
          <Feature img="IndustryExpertiseFamilyCap.jpg" title="Family Showroom " />{" "}
          <Feature img="IndustryExpertiseKidCap.jpg" title="Kids Wear" />{" "}
          <Feature img="IndustryExpertiseLadiesCap.jpg" title="Ladies Wear" />{" "}
          <Feature img="IndustryExpertiseBabytoyCap.jpg" title="Baby Toy " />
          <Feature img="IndustryExpertiseShoeCap1.jpg" title="Footwear Outlet " />
          <Feature img="IndustryExpertiseLuggagesCap.jpg" title="Luggage " />
          <Feature img="IndustryExpertiseEthinicCap.jpg" title="Ethnic Wear " />
          <Feature img="IndustryExpertiseMobileCap.jpg" title="Mobile Store" />
          <Feature
            img="IndustryExpertiseStationeryBooks.jpg"
            title="Stationery & Books"
          />
          <Feature img="IndustryExpertiseSportCap.jpg" title="Sports Shop" />
          <Feature img="IndustryExpertiseHomeCap.jpg" title="Home Appiliances " />
        </Wrap>
      </Box>
    </Container>
  );
}
export default IndustryExpertise;
