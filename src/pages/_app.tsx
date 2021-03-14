import { Box } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import { ReactElement, useEffect, useState } from "react";
import { Footer, Header } from "../components";
import { HEADER_HEIGHT } from "../constants";
import { ChakraWrapper } from "../theme/ChakraWrapper";

function App({ Component, pageProps }: AppProps): ReactElement {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => setOpacity(1));
  }, []);

  return (
    <Box opacity={opacity} transition="opacity 500ms ease-out">
      <Provider session={pageProps.session}>
        <ChakraWrapper cookies={pageProps.cookies}>
          <Header />
          <Box pt={HEADER_HEIGHT}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </ChakraWrapper>
      </Provider>
    </Box>
  );
}

export default App;
