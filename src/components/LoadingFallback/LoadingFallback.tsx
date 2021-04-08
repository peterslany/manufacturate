import { Center, Spinner } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useLocale } from "../../hooks";

function LoadingFallback(): ReactElement {
  const { Message } = useLocale();

  return (
    <Center p={[8, 12, 16]} direction="column">
      <Spinner /> {Message.LOADING}
    </Center>
  );
}

export default LoadingFallback;
