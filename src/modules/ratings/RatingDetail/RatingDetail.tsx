import { Box, Heading } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { RatingLocalized } from "../../../types";

interface Props {
  data: RatingLocalized;
}

function RatingDetail({ data }: Props): ReactElement {
  return (
    <Box>
      <Heading>{data.name}</Heading>
      <div className="markdown">
        <ReactMarkdown renderers={ChakraUIRenderer()}>
          {data.rating.overall.description}
        </ReactMarkdown>
      </div>
    </Box>
  );
}

export default RatingDetail;
