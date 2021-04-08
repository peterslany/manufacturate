import { Box } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import { Footer, Header } from "../components";
import { HEADER_HEIGHT } from "../constants";
import { ChakraWrapper } from "../theme/ChakraWrapper";

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider session={pageProps.session}>
      <ChakraWrapper cookies={pageProps.cookies}>
        <Header />
        <Box pt={HEADER_HEIGHT}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ChakraWrapper>
    </Provider>
  );
}

export default App;
