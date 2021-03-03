import { Box } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Footer, Header } from "../components";
import { HEADER_HEIGHT } from "../constants";
import { ChakraWrapper } from "../theme/ChakraWrapper";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraWrapper cookies={pageProps.cookiesz}>
      <Header />
      <Box pt={HEADER_HEIGHT}>
        <Component {...pageProps} />
      </Box>
      <Footer />
    </ChakraWrapper>
  );
}

export default App;
