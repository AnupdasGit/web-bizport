import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider, Container, useColorModeValue } from "@chakra-ui/react";
import NavBar from "../components/navBar";
import FooterPage from "../components/footer";
import theme from "../styles/theme";
import { AuthProvider } from "../context/AuthContext";

function AppContent({ Component, pageProps }) {
  const appBackground = useColorModeValue("white", "gray.800");
  const appColor = useColorModeValue("ink.800", "gray.100");

  return (
    <AuthProvider>
      <Container
        maxW="full"
        bg={appBackground}
        color={appColor}
        p={0}
      >
        <NavBar />
        <Component {...pageProps} />
        <FooterPage />
      </Container>
    </AuthProvider>
  );
}

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppContent Component={Component} pageProps={pageProps} />
    </ChakraProvider>
  );
}

export default App;
