import { Box } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  children: string;
}

function MDRenderer({ children }: Props): ReactElement {
  return (
    <Box className="markdown" overflow="hidden" maxW="860px">
      <ReactMarkdown renderers={ChakraUIRenderer()}>{children}</ReactMarkdown>
    </Box>
  );
}

export default React.memo(MDRenderer);
