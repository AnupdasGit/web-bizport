import {
  Box,
  Text, 
  Container,
  Heading,
  Image, 
  Divider, 
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

function Centralized() {
  return (
    <Container maxW="container.xl" centerContent>
      <Center h="120px" p={5}>
        <Heading>Centralised Distribution System</Heading>
      </Center>
      <Center  >
        <Image
          transform="scale(1.0)"
          src="Centralizepage.png"
          alt="some text"
          objectFit="contain"
          width="400px"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Center>
      <Box p={4} id="Centralised"> 
        <Divider pt={9} />
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>1. Better control :</Text>
        <Text>
          One of the advantages of having a centralized distribution is to have
          better control. Organizations setup central stores which are
          responsible for all activities and transport their inventory as and
          when required to other stores which are usually attached to the
          production capacities located in different locations.
        </Text>
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>2. Inventory management : </Text>
        <Text>
          Inventory can be as minimum as material ordered based on the
          requirement of all other attached parties. The material can also be
          ruled out to and from the attached central stores. This is especially
          so in the case of tools, fixtures, equipment and spares.
        </Text>
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>3. Reduced cost : </Text>
        <Text>
          By choosing to centralize warehousing and distribution, the need to
          pay rent or utility and incidental expenditures for different
          warehouses is reduced. The need to spend more on new equipment and
          technologies for each warehouse is also eliminated.
          <br />
          Centralized warehouses also makes room to reduce the shipping costs.
          That may seem strange but the reason for that is because it makes room
          for shipping in bulk size wich will makes the costs lower.  
          <br/> With these reductions in costs, retailers can now set pricing
          strategies with more ease due to the more stable nature of its
          inventory management. This will allow for higher margins or lower
          prices for customers.
        </Text>
        <Text fontWeight={600} color={useColorModeValue("red.800", "white")}> 4. Requirement of fewer personnel : </Text>
        <Text>
          Unnecessary duplication of records takes place in decentralized
          Stores. centralized stores will require less personnel for management.
          For smaller business this can be one of the most important reasons for
          having decentralized distrubution systems. With not having as big
          financial pressure on you, you can be able to have better focus which
          will improve all parts of you life.
        </Text>
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")} > 5. Economy in storage :</Text>
        <Text>
          Is possible in a centralized distribution system as goods in bulk will
          occupy less space. That will offer you even lower renting costs, which
          will make you able to spend invest more into the other thing like
          marketing.
        </Text>
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>6. Accessibility : </Text>
        <Text>
          One of the biggest advantages of having all the products in one
          central location means getting easy access whenever needed. That also
          makes it easier for you to handle some kinds crises. The reason for
          that is you know something is missing for example you can check it
          instantly.
        </Text>
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>7. Reporting : </Text>
        <Text>
          Depending on the kind of business or the kinds of products you offer
          to your customers, you need to keep a close eye on what you have in
          stock. With a central distribution center, creating these types of
          reports becomes incredibly easy. You only have to go to one source
          rather than track down multiple reports from multiple distribution
          centers.
        </Text>{" "}
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>8. Standardization : </Text>
        <Text>
          Implementing centralization would result in standardization of the
          processes. This guarantees lesser variations and better performance.
          It will asave from a lot of petential headache and make it easier for
          you to make decisions.
          <br /> 
          Because of that will you not only save money on having a centralized
          distrubution system. You will save something way more precious namely
          your time. That will give you more time to do the things that will
          make you able to really grow your business like strateigizing,
          developing new leader etc.
          <br /> 
          Besides that can it help you establish yourself as more reliable. The
          reason fot that is that the shipping will always be the same and that
          will offer you an competetive advantage against competitiors. Look at
          Mr Bezos he had as his corneratone to have a fast and relieable
          delevery system and he is pretty succesful from what i know.
        </Text>{" "}
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}> 9. Flexibility :</Text>
        <Text>
          In a crisis or an emergency, standardization of work takes just one
          step to revise all the activities at once. This guarantees a greater
          degree of flexibility in an organization than in a company with no
          centralized warehousing.
        </Text>{" "}
        <Text fontWeight={600} color={useColorModeValue("red.800", "red")}>10. Better customer service : </Text>
        <Text>
          By choosing to limit the number of warehouses or distributors, a
          company can focus its resources on fewer facilities. This means the
          facility will have highly skilled workers, the latest technology and
          the best equipment. With all of this in one facility, the highest
          quality of service can be offered to customers
        </Text>
      </Box>
    </Container>
  );
}
export default Centralized;
