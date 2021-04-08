import { Box, Center, Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Pagination, UrlParamSearchbar } from "../../components";
import { ApiUrl, PAGE_SIZE } from "../../constants";
import { useGet, useLocale, useUrlParam } from "../../hooks";
import { BlogpostsListData } from "../../types";
import { parseInteger, parseString } from "../../utils";
import BlogItem from "./BlogItem";

interface Props {
  initialBlogposts: BlogpostsListData;
}

function Blog({ initialBlogposts }: Props): ReactElement {
  const { Message } = useLocale();

  const [page, setPage] = useUrlParam("page");

  const { data, loading } = useGet<BlogpostsListData>(ApiUrl.BLOGPOSTS, {
    includeQueryString: true,
    initialValue: initialBlogposts,
  });
  return (
    <Box layerStyle="layout">
      <Center>
        <UrlParamSearchbar placeholder={Message.SEARCH} />
      </Center>
      <Flex align="center" justify="center" spacing="8" wrap="wrap">
        {data?.items.map((item) => (
          <BlogItem data={item} key={item._id} loading={loading} />
        ))}
      </Flex>
      <Center>
        <Pagination
          mt="2"
          totalPages={Math.ceil((data?.count || 0) / PAGE_SIZE)}
          selectedPage={parseInteger(parseString(page)) || 1}
          onPageChange={(newPage: number) => setPage(newPage.toString())}
        />
      </Center>
    </Box>
  );
}

export default Blog;
