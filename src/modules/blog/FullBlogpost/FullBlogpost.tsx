import { Box, Center, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Head, MDRenderer } from "../../../components";
import { useLocale } from "../../../hooks";
import { Blogpost } from "../../../types";
import { formatDateLong } from "../../../utils";

interface Props {
  data: Blogpost;
}

function FullBlogpost({ data }: Props): ReactElement {
  const { locale } = useLocale();
  return (
    <Center>
      <Head title={data.name} metaDescription={data.subTitle} />
      <Box
        m={[2, 4]}
        w="full"
        maxW="840px"
        sx={{
          "*": {
            fontFamily: "Cardo",
          },
          p: {
            fontSize: "1.15rem",
          },
        }}
      >
        <Flex mb="2" justify="flex-start" wrap="wrap">
          {formatDateLong(data.date, locale)}
          <Box ml="1" opacity="0.8">
            {" "}
            —{data.author}
          </Box>
        </Flex>
        <Heading textStyle="serif" size="2xl">
          {data.name}
        </Heading>
        <Divider my="2" />

        <Text opacity="0.8" my="4" fontWeight="600">
          {data.subTitle}
        </Text>
        <MDRenderer>{data.content}</MDRenderer>
      </Box>
    </Center>
  );
}

export default FullBlogpost;
