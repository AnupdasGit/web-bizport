import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import NavBar from "../components/navBar";
import FooterPage from "../components/footer";
import DarkMode from "@components/ToggleDarkmode";
function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Container boxShadow="dark-lg" maxW="container.lg">
        <DarkMode/>
        <NavBar />
        <Component {...pageProps} />
        <FooterPage />
      </Container>
    </ChakraProvider>
  );
}

export default App;
