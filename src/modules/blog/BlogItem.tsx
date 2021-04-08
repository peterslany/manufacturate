import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { Link } from "../../components";
import { Path } from "../../constants";
import { useLocale } from "../../hooks";
import { BlogpostBase } from "../../types";
import { formatDateLong } from "../../utils";

interface BlogItemProps {
  data: BlogpostBase;
  loading?: boolean;
}

function BlogItem({ data, loading = true }: BlogItemProps): ReactElement {
  const { locale, Message } = useLocale();
  return (
    <Link
      m="4"
      _focus={{ boxShadow: "none" }}
      href={loading ? Path.BLOG : `${Path.BLOG}/${data.urlPathSegment}`}
      _hover={{ textDecoration: "none" }}
      cursor={loading ? "wait" : "pointer"}
    >
      <Flex
        layerStyle="outline"
        _groupFocus={{ layerStyle: "outlineFocused" }}
        w={["320px", "320px", "832px"]}
        h={["500px", "500px", "300px"]}
        direction={["column", "column", "row"]}
        position="relative"
      >
        <Box
          overflow="hidden"
          borderTopLeftRadius="24px"
          borderBottomLeftRadius={["initial", "initial", "24px"]}
          borderTopRightRadius={["24px", "24px", "initial  "]}
        >
          <Skeleton isLoaded={!loading}>
            <Image
              w={["320px", "320px", "400px"]}
              h={["240px", "240px", "300px"]}
              objectFit="cover"
              src={data.thumbnailUrl}
              alt={data.name}
              fallbackSrc="/default-blog-thumbnail.jpg"
              _groupHover={{ transform: "scale(1.1)" }}
              transition="transform 500ms ease-in-out"
            />
          </Skeleton>
        </Box>
        <Box
          w="full"
          p="4"
          maxW={["320px", "320px", "432px"]}
          overflow="hidden"
        >
          <Skeleton isLoaded={!loading}>
            <Heading textStyle="serif" noOfLines={2}>
              {data.name}
            </Heading>
          </Skeleton>
          <Divider my="1" />

          <Flex
            direction={["column-reverse", "column-reverse", "row"]}
            py="2"
            justify="space-between"
            opacity="0.6"
            whiteSpace={["normal", "normal", "nowrap"]}
          >
            <Skeleton isLoaded={!loading}>
              <Text fontWeight="600" mr="2">
                {data.author}
              </Text>
            </Skeleton>

            <Skeleton isLoaded={!loading}>
              {formatDateLong(data.date, locale)}
            </Skeleton>
          </Flex>
          <Skeleton mt="2" h="4" isLoaded={!loading}>
            <Text noOfLines={[2, 2, 3]}>{data.subTitle}</Text>
          </Skeleton>
          <Skeleton my="2" h="4" isLoaded={!loading} />
          <Skeleton my="2" h="4" w="80%" isLoaded={!loading} />

          <Flex
            fontStyle="italic"
            bottom="0"
            right="4px"
            position="absolute"
            p="4"
            align="center"
          >
            {Message.READ_MORE.toUpperCase()}
            <ArrowForwardIcon
              ml="2"
              _groupHover={{ transform: "translate(7px)" }}
              transition="transform 500ms ease-in-out"
            />
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
}

export default BlogItem;
